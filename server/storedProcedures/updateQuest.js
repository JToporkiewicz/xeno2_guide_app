const updateQuest = {
  name: 'updateQuest',
  query: `CREATE PROCEDURE updateQuest()
    BEGIN
        DECLARE current_chapter INT;

        SELECT sp.Chapter INTO current_chapter
        FROM xenoblade2_guide.storyprogresses as sp
        WHERE sp.id = 1;

        DROP temporary TABLE IF EXISTS xenoblade2_guide._availableQuest;

        CREATE temporary TABLE xenoblade2_guide._availableQuest
        SELECT preQuest.RequiredBy as id
        FROM xenoblade2_guide.prerequisitesquests as preQuest
        WHERE (preQuest.Location IN (
            SELECT loc.id
            FROM xenoblade2_guide.locations as loc
            WHERE loc.StoryProgress <= current_chapter
        ) OR preQuest.Location IS NULL)
        AND (preQuest.StoryProgress <= current_chapter
            OR preQuest.StoryProgress IS NULL)
        AND (preQuest.NewGamePlus <= (
            SELECT sp.NewGamePlus
            FROM xenoblade2_guide.storyprogresses as sp
            WHERE sp.id = 1
        ) OR preQuest.NewGamePlus IS NULL)
        AND (preQuest.DLCUnlocked <= (
            SELECT sp.DLCUnlocked
            FROM xenoblade2_guide.storyprogresses as sp
            WHERE sp.id = 1
        ) OR preQuest.DLCUnlocked IS NULL)
        AND (preQuest.MercMission IN (
            SELECT mm.id
            FROM xenoblade2_guide.mercmissions as mm
            WHERE mm.Available = 1
        ) OR preQuest.MercMission IS NULL)
        AND (preQuest.Heart2Heart IN (
            SELECT h2h.id
            FROM xenoblade2_guide.heart2hearts as h2h
            WHERE h2h.Available = 1
        ) OR preQuest.Heart2Heart IS NULL)
        AND (preQuest.BladeUnlocked IN (
            SELECT blade.id
            FROM xenoblade2_guide.blades as blade
            WHERE blade.Available = 1
        ) OR preQuest.BladeUnlocked IS NULL)
        AND (preQuest.BladeAffinityChartNode IN (
            SELECT acn.id
            FROM xenoblade2_guide.blades as acn
            WHERE acn.Available = 1
        ) OR preQuest.BladeAffinityChartNode IS NULL)
        AND (preQuest.Quest IN (
            SELECT quest.id
            FROM xenoblade2_guide.quests as quest
            WHERE quest.Available = 1
        ) OR preQuest.Quest IS NULL);

        UPDATE xenoblade2_guide.quests
        SET Available = 1
        WHERE id IN (
            SELECT id
            FROM xenoblade2_guide._availableQuest
        )
        OR id NOT IN (
            SELECT preQuest.RequiredBy as id
            FROM xenoblade2_guide.prerequisitesquests as preQuest
        );

        UPDATE xenoblade2_guide.quests
        SET Available = 0, Status = 'NOT STARTED'
        WHERE id NOT IN (
            SELECT id
            FROM xenoblade2_guide._availableQuest
        )
        AND id IN (
            SELECT preQuest.RequiredBy as id
            FROM xenoblade2_guide.prerequisitesquests as preQuest
        );

    END`
}

const updateQuestRelatedACN = {
  name: 'updateQuestRelatedACN',
  query: `CREATE PROCEDURE updateQuestRelatedACN()
    BEGIN
        UPDATE xenoblade2_guide.prerequisitesacns as preACN
        SET preACN.Progress = 1
        WHERE preACN.SideQuest IN (
            SELECT quest.id
            FROM xenoblade2_guide.quests as quest
            WHERE quest.Status = 'FINISHED'
        ) AND preACN.SideQuest IS NOT NULL;

        UPDATE xenoblade2_guide.prerequisitesacns as preACN
        SET preACN.Progress = 0
        WHERE preACN.SideQuest NOT IN (
            SELECT quest.id
            FROM xenoblade2_guide.quests as quest
            WHERE quest.Status = 'FINISHED'
        ) AND preACN.SideQuest IS NOT NULL;

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
        FROM xenoblade2_guide.queststeps as qs
        WHERE qs.Quest = questId;

        UPDATE xenoblade2_guide.queststeps as qs
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
        UPDATE xenoblade2_guide.queststeps as qs
        SET qs.Completed = 0
        WHERE qs.Quest = questId;

        UPDATE xenoblade2_guide.queststeps as qss
        SET qss.CompletionProgress = 0
        WHERE qss.QuestStep IN (
            SELECT qs.id
            FROM xenoblade2_guide.queststeps as qs
            WHERE qs.Quest = questId
        );
    END`
}


const updateCompleteQuestManually = {
  name: 'updateCompleteQuestManually',
  query: `CREATE PROCEDURE updateCompleteQuestManually(
        IN questId INT
    )
    BEGIN
        UPDATE xenoblade2_guide.queststeps as qs
        SET qs.Completed = 1
        WHERE qs.Quest = questId;

        UPDATE xenoblade2_guide.queststeps as qss
        SET qss.CompletionProgress = 1
        WHERE qss.QuestStep IN (
            SELECT qs.id
            FROM xenoblade2_guide.queststeps as qs
            WHERE qs.Quest = questId
        );
    END`
}


const update_quest_procedures = [
  updateQuest,
  updateQuestRelatedACN,
  updateUndoQuestCompletion,
  updateClearQuestCompletion,
  updateCompleteQuestManually
]

module.exports = update_quest_procedures