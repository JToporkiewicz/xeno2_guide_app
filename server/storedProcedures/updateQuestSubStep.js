const updateCompleteQuestSubStepManually = {
  name: 'updateCompleteQuestSubStepManually',
  query: `CREATE PROCEDURE updateCompleteQuestSubStepManually(
        IN questSubStepId INT
    )
    BEGIN

        DECLARE lastQuestSubStep INT;
        DECLARE questSubStepOrder INT;
        DECLARE questStepId INT;
        DECLARE previousStep INT;

        SELECT qss.QuestStep, qss.SubStepNumber INTO questStepId, questSubStepOrder
        FROM xenoblade2_guide.questSubSteps as qss
        WHERE qss.id = questSubStepId;

        SELECT MAX(id) INTO previousStep
        FROM xenoblade2_guide.questSubSteps as qss
        WHERE qss.QuestStep = questStepId
        AND qss.id < questSubStepId
        AND qss.SubStepNumber < questSubStepOrder;

        IF previousStep IS NOT NULL THEN
            CALL updateCompleteQuestSubStepManually (previousStep);
            UPDATE xenoblade2_guide.questSubSteps as qss
            SET qss.CompletionProgress = qss.Count
            WHERE qss.id = previousStep;    
        END IF;

        SELECT MAX(qss.id) INTO lastQuestSubStep
        FROM xenoblade2_guide.questSubStepOrder as qss
        WHERE qss.QuestStep = questStepId;

        IF questSubStepId = lastQuestSubStep THEN
            UPDATE xenoblade2_guide.questSteps as qs
            SET qs.Completed = 1
            WHERE qs.id = questStepId;

            CALL updateCompleteQuestStepManually(questStepId);
        END IF;

    END`
}

const update_qss_procedures = [
  updateCompleteQuestSubStepManually
]

module.exports = update_qss_procedures