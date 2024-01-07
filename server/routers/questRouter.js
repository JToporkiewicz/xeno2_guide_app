/** Customized router for the RESTful API actions **/

const express = require('express')
const Router = express.Router
const { sequelize } = require('../models')
const Sequelize = require('sequelize');

module.exports = function() {
  const router = Router()

  const getQuestPrerequirements = async function(id = '') {
    const questPres = await sequelize.query(`
    SELECT
      pre.*,
      loc.Location as LocName,
      ma.Name as MAName,
      ma.Located as MALocated,
      mm.Name as MMName,
      h2h.Title as H2hTitle,
      b.Name as BladeName,
      acn.Name as ACNName,
      acn.SkillLevel as ACNLevel,
      b2.Name as ACNBlade,
      b2.id as ACNBladeId,
      q.Name as QuestName
      FROM xenoblade2_guide.prerequisitesQuests as pre
      LEFT JOIN xenoblade2_guide.locations as loc
        ON loc.id = pre.Location
      LEFT JOIN xenoblade2_guide.majorAreas as ma
        ON loc.MajorArea = ma.id
      LEFT JOIN xenoblade2_guide.mercMissions as mm
        ON mm.id = pre.MercMission
      LEFT JOIN xenoblade2_guide.heart2Hearts as h2h
        ON h2h.id = pre.Heart2Heart
      LEFT JOIN xenoblade2_guide.blades as b
        ON b.id = pre.BladeUnlocked
      LEFT JOIN xenoblade2_guide.affinityChartNodes as acn
        ON acn.id = pre.BladeAffinityChartNode
      LEFT JOIN xenoblade2_guide.affinityChartBranches as acb
        ON acb.NodeAffinity1 = acn.id
        OR acb.NodeAffinity2 = acn.id
        OR acb.NodeAffinity3 = acn.id
        OR acb.NodeAffinity4 = acn.id
        OR acb.NodeAffinity5 = acn.id
        AND acn.id IS NOT NULL
      LEFT JOIN xenoblade2_guide.affinityCharts as ac
        ON ac.AffinityBranch = acb.id
        OR ac.BattleSkillBranch1 = acb.id
        OR ac.BattleSkillBranch2 = acb.id
        OR ac.BattleSkillBranch3 = acb.id
        OR ac.BladeSpecialBranch1 = acb.id
        OR ac.BladeSpecialBranch2 = acb.id
        OR ac.BladeSpecialBranch3 = acb.id
        OR ac.FieldSkillBranch1 = acb.id
        OR ac.FieldSkillBranch2 = acb.id
        OR ac.FieldSkillBranch3 = acb.id
        AND acb.id IS NOT NULL
      LEFT JOIN xenoblade2_guide.blades as b2
        ON b2.AffinityChart = ac.id
        AND ac.id IS NOT NULL
      LEFT JOIN xenoblade2_guide.quests as q
        ON q.id = pre.Quest
      ${id ? `WHERE pre.RequiredBy = ${id}` : ''}`,
    { type: Sequelize.QueryTypes.SELECT })

    const mappedPre = questPres.reduce((list, pre) => {
      const reqs = [];

      if (pre.StoryProgress) {
        reqs.push({
          area: 'Story Progress',
          requirement: 'Chapter ' + pre.StoryProgress,
          requirementCount: pre.StoryProgress
        })
      }

      if (pre.NewGamePlus) {
        reqs.push({
          area: 'New Game Plus',
          requirement: pre.NewGamePlus === 1
        })
      }

      if (pre.DLCUnlocked) {
        reqs.push({
          area: 'DLC Unlocked',
          requirement: pre.DLCUnlocked === 1
        })
      }

      if (pre.Location) {
        reqs.push({
          area: 'Location',
          requirement: `${pre.MALocated} -> ${pre.MAName} -> ${pre.LocName}`,
          reqId: pre.Location
        })
      }

      if (pre.MercMission) {
        reqs.push({
          area: 'Merc Mission',
          requirement: pre.MMName,
          reqId: pre.MercMission
        })
      }

      if (pre.Heart2Heart) {
        reqs.push({
          area: 'Heart-to-heart',
          requirement: pre.H2hTitle,
          reqId: pre.Heart2Heart
        })
      }

      if (pre.BladeName) {
        reqs.push({
          area: 'Blade',
          requirement: pre.BladeName,
          reqId: pre.BladeUnlocked
        })
      }

      if (pre.BladeAffinityChartNode) {
        reqs.push({
          area: 'Affinity Chart Node',
          requirement: `${pre.ACNBlade}: ${pre.ACNName} Level ${pre.ACNLevel}`,
          reqId: pre.ACNBladeId
        })
      }

      if (pre.Quest) {
        reqs.push({
          area: pre.OtherPrerequisiteDetail?.includes('accepted') ? 'Start side-quest' : 'Quest',
          requirement: pre.QuestName,
          reqId: pre.Quest
        })
      }

      if (pre.OtherPrerequisiteDetail) {
        reqs.push({
          area: 'Other',
          requirement: pre.OtherPrerequisiteDetail
        })
      }

      return {
        ...list,
        [pre.RequiredBy]: (list[pre.RequiredBy] || []).concat(reqs)
      }
    }, {})

    return mappedPre
  }

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
      q.Status
      FROM xenoblade2_guide.quests as q
      LEFT JOIN xenoblade2_guide.locations as loc
        ON q.Location = loc.id
      LEFT JOIN xenoblade2_guide.majorAreas as ma
        ON loc.MajorArea = ma.id
      ${id ? `WHERE q.id = ${id}` : ''}`,
      { type: Sequelize.QueryTypes.SELECT })

    const pres = await getQuestPrerequirements(id)

    const mappedQuests = quests.map((q) => ({
      id:q.id,
      Name:q.Name,
      Type:q.Type,
      Client:q.Client,
      Area:`(${q.maLoc} -> ${q.maName})`,
      Location:q.Location,
      Rewards:JSON.parse(q.Rewards),
      Status:q.Status,
      PreReqs: pres[q.id] || undefined
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
