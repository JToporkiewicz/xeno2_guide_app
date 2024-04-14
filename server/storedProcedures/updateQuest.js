const updateQuest = {
  name: 'updateQuest',
  query: `CREATE PROCEDURE updateQuest()
    BEGIN
        DECLARE current_chapter INT;

        SELECT sp.Chapter INTO current_chapter
        FROM xenoblade2_guide.storyProgresses as sp
        WHERE sp.id = 1;

        DROP temporary TABLE IF EXISTS xenoblade2_guide._unavailableQuestPart1;

        CREATE temporary TABLE xenoblade2_guide._unavailableQuestPart1
        SELECT preQuest.RequiredBy as id
        FROM xenoblade2_guide.prerequisitesQuests as preQuest
        WHERE (preQuest.StoryProgress > current_chapter
          AND preQuest.StoryProgress IS NOT NULL)
        OR (preQuest.NewGamePlus > (
            SELECT sp.NewGamePlus
            FROM xenoblade2_guide.storyProgresses as sp
            WHERE sp.id = 1
        ) AND preQuest.NewGamePlus IS NOT NULL)
        OR (preQuest.DLCUnlocked > (
            SELECT sp.DLCUnlocked
            FROM xenoblade2_guide.storyProgresses as sp
            WHERE sp.id = 1
        ) AND preQuest.DLCUnlocked IS NOT NULL)
        OR (preQuest.Location NOT IN (
            SELECT loc.id
            FROM xenoblade2_guide.locations as loc
            WHERE loc.StoryProgress <= current_chapter
        ) AND preQuest.Location IS NOT NULL)
        OR (preQuest.MercMission IN (
            SELECT mm.id
            FROM xenoblade2_guide.mercMissions as mm
            WHERE mm.Available = 0
        ) AND preQuest.MercMission IS NOT NULL)
        OR (preQuest.Heart2Heart IN (
            SELECT h2h.id
            FROM xenoblade2_guide.heart2Hearts as h2h
            WHERE h2h.Available = 0
        ) AND preQuest.Heart2Heart IS NOT NULL)
        OR (preQuest.BladeUnlocked IN (
            SELECT blade.id
            FROM xenoblade2_guide.blades as blade
            WHERE blade.Available = 0
        ) AND preQuest.BladeUnlocked IS NOT NULL)
        OR (preQuest.BladeAffinityChartNode IN (
            SELECT acn.id
            FROM xenoblade2_guide.affinityChartNodes as acn
            WHERE acn.Available = 0
        ) AND preQuest.BladeAffinityChartNode IS NOT NULL);

        UPDATE xenoblade2_guide.quests
        SET Available = 1
        WHERE id NOT IN (
            SELECT id
            FROM xenoblade2_guide._unavailableQuestPart1
        )
        OR id NOT IN (
            SELECT preQuest.RequiredBy as id
            FROM xenoblade2_guide.prerequisitesQuests as preQuest
        );

        UPDATE xenoblade2_guide.quests
        SET Available = 0, Status = 'NOT STARTED'
        WHERE id IN (
            SELECT id
            FROM xenoblade2_guide._unavailableQuestPart1
        );

        DROP temporary TABLE IF EXISTS xenoblade2_guide._unavailableQuestPart2;

        CREATE temporary TABLE xenoblade2_guide._unavailableQuestPart2
        SELECT preQuest.RequiredBy as id
        FROM xenoblade2_guide.prerequisitesQuests as preQuest
        WHERE preQuest.Quest IN (
          SELECT quest.id
          FROM xenoblade2_guide.quests as quest
          WHERE quest.Available = 0
          OR (
            preQuest.OtherPrerequisiteDetail LIKE '%accepted%'
            AND quest.Status = 'NOT STARTED'
          ) OR (
            preQuest.OtherPrerequisiteDetail LIKE '%During%'
            AND quest.Status = 'NOT STARTED'
          ) OR quest.Status != 'FINISHED'
        ) AND preQuest.Quest IS NOT NULL;

        UPDATE xenoblade2_guide.quests
        SET Available = 0, Status = 'NOT STARTED'
        WHERE id IN (
            SELECT id
            FROM xenoblade2_guide._unavailableQuestPart2
        );

        CALL updateNotStartedQuestSteps ();
    END`
}

const updateNotStartedQuestSteps = {
  name: 'updateNotStartedQuestSteps',
  query: `CREATE PROCEDURE updateNotStartedQuestSteps()
    BEGIN
        UPDATE xenoblade2_guide.questSteps as qs
        SET qs.Completed = 0
        WHERE qs.Quest IN (
          SELECT quest.id
          FROM xenoblade2_guide.quests as quest
          WHERE quest.Status = 'NOT STARTED'
        );

        UPDATE xenoblade2_guide.questSubSteps as qss
        SET qss.CompletionProgress = 0
        WHERE qss.QuestStep IN (
            SELECT qs.id
            FROM xenoblade2_guide.questSteps as qs
            WHERE qs.Quest IN (
              SELECT quest.id
              FROM xenoblade2_guide.quests as quest
              WHERE quest.Status = 'NOT STARTED'
            )
        );
    END`
}

const updateUndoQuestCompletion = {
  name: 'updateUndoQuestCompletion',
  query: `CREATE PROCEDURE updateUndoQuestCompletion(
        IN questId INT
    )
    BEGIN
        DECLARE lastQuestStep INT;

        SELECT MAX(qs.id) INTO lastQuestStep
        FROM xenoblade2_guide.questSteps as qs
        WHERE qs.Quest = questId;

        UPDATE xenoblade2_guide.questSteps as qs
        SET qs.Completed = 0
        WHERE qs.id = lastQuestStep;

        CALL updateUndoQuestStepCompletion (lastQuestStep);

    END`
}

const updateClearQuestCompletion = {
  name: 'updateClearQuestCompletion',
  query: `CREATE PROCEDURE updateClearQuestCompletion(
        IN questId INT
    )
    BEGIN
        UPDATE xenoblade2_guide.questSteps as qs
        SET qs.Completed = 0
        WHERE qs.Quest = questId;

        UPDATE xenoblade2_guide.questSubSteps as qss
        SET qss.CompletionProgress = 0
        WHERE qss.QuestStep IN (
            SELECT qs.id
            FROM xenoblade2_guide.questSteps as qs
            WHERE qs.Quest = questId
        );
    END`
}


const updateCompleteQuestManually = {
  name: 'updateCompleteQuestManually',
  query: `CREATE PROCEDURE updateCompleteQuestManually(
        IN questId INT,
        IN startedRoute VARCHAR(9)
    )
    BEGIN
        UPDATE xenoblade2_guide.questSteps as qs
        SET qs.Completed = 1
        WHERE qs.Quest = questId
          AND Description NOT LIKE 'Route %' OR Description LIKE startedRoute;

        UPDATE xenoblade2_guide.questSubSteps as qss
        SET qss.CompletionProgress = qss.Count
        WHERE qss.QuestStep IN (
            SELECT qs.id
            FROM xenoblade2_guide.questSteps as qs
            WHERE qs.Quest = questId
              AND qs.Description NOT LIKE 'Route %'
              OR qs.Description LIKE startedRoute
        );
    END`
}

const updateStepCompletion = {
  name: 'updateStepCompletion',
  query: `CREATE PROCEDURE updateStepCompletion(
    IN lastDoneStepId INT,
    IN questId INT,
    IN startedRoute VARCHAR(9)
  )
  BEGIN
    DROP temporary TABLE IF EXISTS xenoblade2_guide._finishedSteps;
    DROP temporary TABLE IF EXISTS xenoblade2_guide._notDoneSteps;

    CREATE temporary TABLE xenoblade2_guide._finishedSteps
    SELECT qs.id as id
    FROM xenoblade2_guide.questSteps as qs
    WHERE qs.Quest = questId AND qs.id < lastDoneStepId AND CASE
      WHEN Description
        NOT LIKE 'Route %'
        THEN true
      WHEN (SELECT updateId.Description
        FROM xenoblade2_guide.questSteps as updateId
        WHERE id = lastDoneStepId
      ) NOT LIKE 'Route %'
        AND lastDoneStepId > id
        AND Description LIKE startedRoute
        THEN true
      WHEN
        (SELECT updateId.Description
          FROM xenoblade2_guide.questSteps as updateId
          WHERE id = lastDoneStepId
        )
        LIKE 'Route A:%' AND Description NOT LIKE 'Route B:%'
        THEN true
      WHEN
        (SELECT updateId.Description
          FROM xenoblade2_guide.questSteps as updateId
          WHERE id = lastDoneStepId
        )
        LIKE 'Route B:%' AND Description NOT LIKE 'Route A:%'
        THEN true
      ELSE false
    END;

    CREATE temporary TABLE xenoblade2_guide._notDoneSteps
    SELECT qs.id as id
    FROM xenoblade2_guide.questSteps as qs
    WHERE qs.Quest = questId AND qs.id NOT IN (
        SELECT id
        FROM xenoblade2_guide._finishedSteps)
        AND qs.id != lastDoneStepId;

    UPDATE xenoblade2_guide.questSteps as qs
    SET qs.Completed = 1
    WHERE qs.id IN (
        SELECT id
        FROM xenoblade2_guide._finishedSteps);

    UPDATE xenoblade2_guide.questSubSteps as qss
    SET qss.CompletionProgress = qss.Count
    WHERE qss.QuestStep IN (
        SELECT id
        FROM xenoblade2_guide._finishedSteps);

    UPDATE xenoblade2_guide.questSteps as qs
    SET qs.Completed = 0
    WHERE qs.id IN (
        SELECT id
        FROM xenoblade2_guide._notDoneSteps);

    UPDATE xenoblade2_guide.questSubSteps as qss
    SET qss.CompletionProgress = 0
    WHERE qss.QuestStep IN (
        SELECT id
        FROM xenoblade2_guide._notDoneSteps);

  END`
}


const update_quest_procedures = [
  updateQuest,
  updateNotStartedQuestSteps,
  updateUndoQuestCompletion,
  updateClearQuestCompletion,
  updateCompleteQuestManually,
  updateStepCompletion
]

module.exports = update_quest_procedures