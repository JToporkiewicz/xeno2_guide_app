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

const update_qs_procedures = [
  updateUndoQuestStepCompletion
]

module.exports = update_qs_procedures