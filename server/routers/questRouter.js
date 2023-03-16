/** Customized router for the RESTful API actions **/

const express = require('express')
const Router = express.Router
const { sequelize } = require('../models')
const Sequelize = require('sequelize');

module.exports = function() {
  const router = Router()

  const getQuests = async function(id = '') {
    const quests = await sequelize.query(
      `SELECT
      q.id,
      q.Name,
      q.Type,
      q.Client,
      loc.Location,
      ma.Name as maName,
      ma.Located as maLoc,
      q.Rewards,
      q.Available,
      q.Status
      FROM xenoblade2_guide.quests as q
      LEFT JOIN xenoblade2_guide.locations as loc
        ON q.Location = loc.id
      LEFT JOIN xenoblade2_guide.majorAreas as ma
        ON loc.MajorArea = ma.id
      ${id ? `WHERE q.id = ${id}` : ''}`,
      { type: Sequelize.QueryTypes.SELECT })

    const mappedQuests = quests.map((q) => ({
      id:q.id,
      Name:q.Name,
      Type:q.Type,
      Client:q.Client,
      Area:`(${q.maLoc} -> ${q.maName})`,
      Location:q.Location,
      Rewards:JSON.parse(q.Rewards),
      Available:q.Available ? true : false,
      Status:q.Status
    }))

    return mappedQuests
  }

  const getQuestSteps = async function(id = '') {
    const steps = await sequelize.query(
      `SELECT
        qs.Quest as QuestId,
        qs.id as StepId,
        qs.StepNumber as StepNumber,
        qs.Description as StepDesc,
        qs.Completed as StepCompleted,
        qss.id as SubStepId,
        qss.SubStepNumber as SubStepNumber,
        qss.Description as SubStepDesc,
        qss.CompleteSideQuest as SSCompleteSideQuest,
        qss.DefeatMonster as SSDefeatMonster,
        qss.CollectItem as SSCollectItem,
        qss.Count as SSCount,
        qss.CompletionProgress as SSProgress
      FROM xenoblade2_guide.questSteps as qs
      LEFT JOIN xenoblade2_guide.questSubSteps as qss
      ON qss.QuestStep = qs.id
      ${id ? `WHERE qs.Quest = ${id}` : ''}`,
      { type: Sequelize.QueryTypes.SELECT })

    const mappedSteps = steps.reduce((prev, curr) => {
      const stepDetails = prev[curr.QuestId]?.find((step) => step.id === curr.StepId)
        || {
          id: curr.StepId,
          Quest: curr.QuestId,
          StepNumber: curr.StepNumber,
          Description: curr.StepDesc,
          Completed: curr.StepCompleted ? true : false
        }
      const subStep = {
        id:curr.SubStepId,
        QuestStep:curr.StepId,
        SubStepNumber:curr.SubStepNumber,
        Description:curr.SubStepDesc,
        CompleteSideQuest:curr.SSCompleteSideQuest,
        DefeatMonster:curr.SSDefeatMonster,
        CollectItem:curr.SSCollectItem,
        Count:curr.SSCount,
        CompletionProgress:curr.SSProgress
      }

      if (subStep.id !== null) {
        stepDetails.SubSteps = (stepDetails.SubSteps || []).concat(subStep)
      }
      return {
        ...prev,
        [curr.QuestId]: (prev[curr.QuestId] || [])
          .filter((step) => step.id !== curr.StepId)
          .concat(stepDetails)
      }
    }, {})

    return mappedSteps

  }

  const findStepsInRoute = (stepId, startedRoute) => `CASE
    WHEN Description
      NOT LIKE 'Route %'
      THEN true
    WHEN (SELECT updateId.Description
      FROM xenoblade2_guide.questSteps as updateId
      WHERE id = ${stepId}
    ) NOT LIKE 'Route %'
      AND ${stepId} > id
      AND Description LIKE '${startedRoute}%'
      THEN true
    WHEN (SELECT Description FROM xenoblade2_guide.questSteps WHERE id = ${stepId})
      LIKE 'Route A:%' AND Description LIKE 'Route A:%'
      THEN true
    WHEN (SELECT Description FROM xenoblade2_guide.questSteps WHERE id = ${stepId})
      LIKE 'Route B:%' AND Description LIKE 'Route B:%'
      THEN true
    ELSE false
    END`
  
  router.put('/saveQuestsStatus', async function(req, res) {
    try {
      if (req.body && req.body.length) {
        await req.body.forEach(async (quest) => {
          await sequelize.query(`
            UPDATE xenoblade2_guide.quests
            SET Status = \'${quest.status}\'
            WHERE id = ${quest.questId}`)
          switch (quest.status) {
          case 'NOT STARTED':
            await sequelize.query('CALL updateClearQuestCompletion (:questId)',{
              replacements: {questId: quest.questId}
            });
            break;
          case 'FINISHED':
            const steps = await sequelize.query(`SELECT *
              FROM xenoblade2_guide.questSteps
              WHERE Quest = ${quest.questId}`,
            { type: Sequelize.QueryTypes.SELECT })
            await sequelize.query('CALL updateCompleteQuestManually (:questId, :startedRoute)',{
              replacements: {questId: quest.questId, startedRoute: (steps?.find(
                (step) => step.Description.startsWith('Route ')
                  && step.Completed)?.Description.slice(0, 8) || 'Route A:') + '%'}
            });
            break;
          case 'STARTED':
          default:
            await sequelize.query('CALL updateUndoQuestCompletion (:questId)',{
              replacements: {questId: quest.questId}
            });
            break;
          }
        })
        await sequelize.query('CALL updateH2H ()');
        await sequelize.query('CALL updateBlade ()');
        await sequelize.query('CALL updateMM ()');
        await sequelize.query('CALL updateQuest ()');
        await sequelize.query('CALL updateQuestRelatedACN ()');
        await sequelize.query('CALL updateACN ()');
        await sequelize.query('CALL updateACNUnlocked ()');
      }
    } catch (err) {
      return res.status(400).json({err: err.message})
    }
    res.status(200).send()
  })

  router.put('/saveQuestStep', async function(req, res) {
    try {
      if (req.body.lastCompletedStep === 0) {
        await sequelize.query(`
          UPDATE xenoblade2_guide.quests
          SET Status = 'NOT STARTED'
          WHERE id = ${req.body.questId}`);
        await sequelize.query('CALL updateClearQuestCompletion (:questId)',{
          replacements: {questId: req.body.questId}
        });
      } else {
        await sequelize.query(`
          UPDATE xenoblade2_guide.questSteps
          SET Completed = 1
          WHERE id = ${req.body.lastCompletedStep}`)

        await sequelize.query(`
          UPDATE xenoblade2_guide.questSubSteps
          SET CompletionProgress = Count
          WHERE QuestStep = ${req.body.lastCompletedStep}`)

        const lastStep = await sequelize.query(`
        SELECT id FROM xenoblade2_guide.questSteps
          WHERE Quest = ${req.body.questId} AND StepNumber IN (
            SELECT MAX(StepNumber) FROM xenoblade2_guide.questSteps
            WHERE Quest = ${req.body.questId}
            AND ${findStepsInRoute(req.body.lastCompletedStep, req.body.startedRoute)}
          ) AND ${findStepsInRoute(req.body.lastCompletedStep, req.body.startedRoute)}`,
        { type: Sequelize.QueryTypes.SELECT });

        if (req.body.lastCompletedStep === lastStep[0].id) {
          await sequelize.query(`
            UPDATE xenoblade2_guide.quests
            SET Status = 'FINISHED'
            WHERE id = ${req.body.questId}
          `)
          await sequelize.query('CALL updateCompleteQuestManually  (:questId, :startedRoute)',{
            replacements: {questId: req.body.questId, startedRoute: req.body.startedRoute + '%'}
          });
        } else {
          await sequelize.query(`
            UPDATE xenoblade2_guide.quests
            SET Status = 'STARTED'
            WHERE id = ${req.body.questId}
          `)
          await sequelize.query(`CALL updateStepCompletion (
            :lastDoneStepId,
            :questId,
            :startedRoute)`,{
            replacements: {
              lastDoneStepId: req.body.lastCompletedStep,
              questId: req.body.questId,
              startedRoute: req.body.startedRoute + '%'
            }
          });
        }
      }
      await sequelize.query('CALL updateH2H ()');
      await sequelize.query('CALL updateBlade ()');
      await sequelize.query('CALL updateMM ()');
      await sequelize.query('CALL updateQuest ()');
      await sequelize.query('CALL updateQuestRelatedACN ()');
      await sequelize.query('CALL updateACN ()');
      await sequelize.query('CALL updateACNUnlocked ()');
    } catch (err) {
      return res.status(400).json({err: err.message})
    }

    res.status(200).send()
  })

  router.put('/saveQuestSubStep', async function(req, res) {
    try {
      if (req.body.stepId === 0) {
        await sequelize.query(`
          UPDATE xenoblade2_guide.quests
          SET Status = 'NOT STARTED'
          WHERE id = ${req.body.questId}`);
        await sequelize.query('CALL updateClearQuestCompletion (:questId)',{
          replacements: {questId: req.body.questId}
        });
      } else {
        for (let i = 0; i < req.body.subSteps.length; i++) {
          const sub = req.body.subSteps[i];
          await sequelize.query(`UPDATE xenoblade2_guide.questSubSteps
            SET CompletionProgress = ${sub.progress}
            WHERE id = ${sub.subStepId}`)
        }
        const subSteps = await sequelize.query(`SELECT id, Count, CompletionProgress
          FROM xenoblade2_guide.questSubSteps
          WHERE QuestStep = ${req.body.stepId}`,
        { type: Sequelize.QueryTypes.SELECT });
        
        await sequelize.query(`
          UPDATE xenoblade2_guide.questSteps
          SET Completed =
          ${subSteps.filter((ss) => ss.CompletionProgress !== ss.Count).length === 0 ? '1' : '0'}
          WHERE id = ${req.body.stepId}`)

        const lastStep = await sequelize.query(`
        SELECT id, Completed FROM xenoblade2_guide.questSteps
          WHERE Quest = ${req.body.questId} AND StepNumber IN (
            SELECT MAX(StepNumber) FROM xenoblade2_guide.questSteps
            WHERE Quest = ${req.body.questId}
            AND ${findStepsInRoute(req.body.stepId, req.body.startedRoute)}
          ) AND ${findStepsInRoute(req.body.stepId, req.body.startedRoute)}`,
        { type: Sequelize.QueryTypes.SELECT });

        if (req.body.stepId === lastStep[0].id &&
          subSteps.filter((ss) => ss.CompletionProgress !== ss.Count).length === 0) {
          await sequelize.query(`
            UPDATE xenoblade2_guide.quests
            SET Status = 'FINISHED'
            WHERE id = ${req.body.questId}`);
          await sequelize.query('CALL updateCompleteQuestManually  (:questId, :startedRoute)',{
            replacements: {questId: req.body.questId, startedRoute: req.body.startedRoute + '%'}
          });  
        } else {
          await sequelize.query(`
            UPDATE xenoblade2_guide.quests
            SET Status = 'STARTED'
            WHERE id = ${req.body.questId}`);
          await sequelize.query(`CALL updateStepCompletion (
              :lastDoneStepId,
              :questId,
              :startedRoute)`,{
            replacements: {
              lastDoneStepId: req.body.stepId,
              questId: req.body.questId,
              startedRoute: req.body.startedRoute + '%'
            }
          });
        }
      }
      await sequelize.query('CALL updateH2H ()');
      await sequelize.query('CALL updateBlade ()');
      await sequelize.query('CALL updateMM ()');
      await sequelize.query('CALL updateQuest ()');  
      await sequelize.query('CALL updateQuestRelatedACN ()');
      await sequelize.query('CALL updateACN ()');
      await sequelize.query('CALL updateACNUnlocked ()');
    } catch (err) {
      return res.status(400).json({err: err.message})
    }
    res.status(200).send()
  })

  router.get('/getQuest', async function(req, res) {
    const resources = await getQuests(req.query.id)

    const steps = await getQuestSteps(req.query.id)

    const mappedQuest = resources.map((q) => ({
      ...q,
      Steps: steps[q.id]
    }))[0]
    res.send(mappedQuest)
  })

  router.get('/getAllQuests', async function(_, res) {
    const resources = await getQuests()

    const steps = await getQuestSteps()

    const mappedQuests = resources.map((q) => ({
      ...q,
      Steps: steps[q.id]
    }))
    res.send(mappedQuests)
  })

  return router
}
