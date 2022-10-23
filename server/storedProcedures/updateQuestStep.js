const updateUndoQuestStepCompletion = {
  name: 'updateUndoQuestStepCompletion',
  query: `CREATE PROCEDURE updateUndoQuestStepCompletion(
        IN questStepId INT
    )
    BEGIN
        DECLARE lastQuestSubStep INT;

        SELECT MAX(qss.id) INTO lastQuestSubStep
        FROM xenoblade2_guide.questSubSteps as qss
        WHERE qss.QuestStep = questStepId;

        UPDATE xenoblade2_guide.questSubSteps as qss
        SET qss.CompletionProgress = 0
        WHERE qss.id = lastQuestSubStep;

    END`
}

const updateCompleteQuestStepManually = {
  name: 'updateCompleteQuestStepManually',
  query: `CREATE PROCEDURE updateCompleteQuestStepManually(
        IN questStepId INT
    )
    BEGIN

        DECLARE lastQuestStep INT;
        DECLARE questId INT;
        DECLARE previousStep INT;

        UPDATE xenoblade2_guide.questSubSteps as qss
        SET qss.CompletionProgress = qss.Count
        WHERE qss.QuestStep = questStepId;

        SELECT qs.Quest INTO questId
        FROM xenoblade2_guide.questSteps as qs
        WHERE qs.id = questStepId;

        SELECT id INTO previousStep
        FROM xenoblade2_guide.questSteps as qs
        WHERE qs.Quest = questId
        AND qs.id = questStepId - 1;

        IF previousStep IS NOT NULL THEN
            CALL updateCompleteQuestStepManually (previousStep);
            UPDATE xenoblade2_guide.questSteps as qs
            SET qs.Completed = 1
            WHERE qs.id = previousStep;    
        END IF;

        SELECT MAX(qs.id) INTO lastQuestStep
        FROM xenoblade2_guide.questSteps as qs
        WHERE qs.Quest = questId;

        IF questStepId = lastQuestStep THEN
            UPDATE xenoblade2_guide.quests as quest
            SET quest.Status = 'FINISHED'
            WHERE quest.id = questId;
        END IF;

    END`
}

const update_qs_procedures = [
  updateUndoQuestStepCompletion,
  updateCompleteQuestStepManually
]

module.exports = update_qs_procedures