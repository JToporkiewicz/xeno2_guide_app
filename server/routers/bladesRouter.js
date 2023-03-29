/** Customized router for the RESTful API actions **/

const express = require('express')
const Router = express.Router
const { sequelize } = require('../models')
const Sequelize = require('sequelize');

module.exports = function() {
  const router = Router()

  const getACNPrerequisites = async function() {
    const acnPre = await sequelize.query(`
      SELECT
        pre.*,
        loc.Location as LocName,
        loc.StoryProgress as LocStory,
        ma.Name as maName,
        ma.Located as maLocated,
        h2h.Title as H2HTitle,
        h2h.Available as H2HAvailable,
        h2h.Viewed as H2HViewed,
        q.Name as QuestName,
        q.Available as QuestAvailable,
        q.Status as QuestStatus,
        mm.Name as MMName,
        mm.Available as MMAvailable,
        mm.Completed as MMCompleted,
        mon.Name as MonName,
        mon.Available as MonAvailable,
        monTypes.Available as MonTypeAvailable,
        mt.MonsterType as MonType,
        acn.Name as ACNName,
        acn.Available as ACNAvailable,
        acn.Unlocked as ACNUnlocked,
        item.Name as ItemName,
        item.Location as ItemLoc,
        it.ItemType as ITypeName
        FROM xenoblade2_guide.prerequisitesACNs as pre
        LEFT JOIN xenoblade2_guide.items as item
            ON pre.PouchItem = item.id
        LEFT JOIN xenoblade2_guide.monsters as mon
            ON pre.MonsterTitle = mon.id
        LEFT JOIN xenoblade2_guide.locations as loc
            ON pre.Location = loc.id
            OR item.Location = loc.id
            OR mon.Location = loc.id
        LEFT JOIN xenoblade2_guide.majorAreas as ma
            ON loc.MajorArea = ma.id
        LEFT JOIN xenoblade2_guide.heart2Hearts as h2h
            ON pre.Heart2HeartTitle = h2h.id
        LEFT JOIN xenoblade2_guide.quests as q
            ON pre.SideQuest = q.id
        LEFT JOIN xenoblade2_guide.mercMissions as mm
            ON pre.MercMissionTitle = mm.id
        LEFT JOIN (
            SELECT mon2.Type, mon2.Available
            FROM xenoblade2_guide.monsters as mon2
            WHERE mon2.Available = 1
            GROUP BY mon2.Type
          ) monTypes
            ON pre.MonsterType = monTypes.Type
        LEFT JOIN xenoblade2_guide.monsterTypes as mt
            ON pre.MonsterType = mt.id
        LEFT JOIN xenoblade2_guide.affinityChartNodes as acn
            ON pre.AffinityChartNode = acn.id
        LEFT JOIN xenoblade2_guide.itemTypes as it
            ON pre.PouchItemType = it.id`,
    { type: Sequelize.QueryTypes.SELECT })

    const storyProgress = await sequelize.query(
      'SELECT * FROM xenoblade2_guide.storyProgresses',
      { type: Sequelize.QueryTypes.SELECT })

    const mappedPres = acnPre.reduce((list, pre) => {
      const preList = [];

      if (pre.Heart2HeartTitle) {
        preList.push({
          area: pre.OtherPrerequisiteName,
          requirement: pre.H2HTitle,
          reqId: pre.Heart2HeartTitle,
          available: pre.H2HAvailable === 1,
          completed: pre.H2HViewed === 1
        })
      } else if (pre.SideQuest) {
        preList.push({
          area: pre.OtherPrerequisiteName,
          requirement: pre.QuestName,
          reqId: pre.SideQuest,
          available: pre.QuestAvailable === 1,
          completed: pre.QuestStatus === 'FINISHED'
        })
      } else if (pre.MercMissionTitle) {
        preList.push({
          area: pre.OtherPrerequisiteName,
          requirement: pre.MMName,
          reqId: pre.MercMissionTitle,
          available: pre.MMAvailable === 1,
          completed: pre.MMCompleted === 1
        })
      } else if (pre.MonsterTitle) {
        preList.push({
          area: 'Monster',
          requirement: pre.OtherPrerequisiteName + ': ' + pre.MonName,
          requirementCount: pre.OtherPrerequisiteDetail,
          reqId: pre.MonsterTitle,
          available: pre.MonAvailable === 1,
          progress: pre.Progress,
          completed: pre.Progress === pre.OtherPrerequisiteDetail
        })
      } else if (pre.MonsterType) {
        preList.push({
          area: 'Monster Type',
          requirement: pre.OtherPrerequisiteName + ': ' + pre.MonType,
          requirementCount: pre.OtherPrerequisiteDetail,
          available: pre.MonTypeAvailable === 1,
          progress: pre.Progress,
          completed: pre.Progress === pre.OtherPrerequisiteDetail
        })
      } else if (pre.AffinityChartNode) {
        preList.push({
          area: pre.OtherPrerequisiteName,
          requirement: pre.ACNName,
          requirementCount: pre.OtherPrerequisiteDetail,
          available: pre.ACNAvailable === 1,
          progress: pre.Progress,
          completed: pre.Progress === pre.OtherPrerequisiteDetail
        })
      } else if (pre.PouchItemType) {
        preList.push({
          area: pre.OtherPrerequisiteName,
          requirement: pre.ITypeName,
          requirementCount: pre.OtherPrerequisiteDetail,
          progress: pre.Progress,
          completed: pre.Progress === pre.OtherPrerequisiteDetail
        })
      } else if (pre.PouchItem) {
        preList.push({
          area: pre.OtherPrerequisiteName,
          requirement: pre.ItemName,
          requirementCount: pre.OtherPrerequisiteDetail,
          available:pre.LocStory ? storyProgress[0].Chapter >= pre.LocStory : undefined,
          progress: pre.Progress,
          completed: pre.Progress === pre.OtherPrerequisiteDetail
        })
      } else {
        preList.push({
          area: 'Other',
          requirement: pre.OtherPrerequisiteName,
          requirementCount: pre.OtherPrerequisiteDetail,
          progress: pre.Progress,
          completed: pre.Progress === pre.OtherPrerequisiteDetail
        })
      }

      if (pre.StoryProgress) {
        preList.push({
          area: 'Story Progress',
          requirement: 'Chapter ' + pre.StoryProgress,
          completed:storyProgress[0].Chapter >= pre.StoryProgress
        })
      }

      if (pre.DLCRequired) {
        preList.push({
          area: 'DLC Unlocked',
          requirement: pre.DLCUnlocked === 1,
          completed: storyProgress[0].DLCUnlocked === 1
        })
      }

      if (pre.Location) {
        preList.push({
          area: 'Location',
          requirement: pre.Location ?
            `${pre.maLocated} -> ${pre.maName} -> ${pre.LocName}` : '',
          available:pre.LocStory ? storyProgress[0].Chapter >= pre.LocStory : undefined,
        })
      }

      return {
        ...list,
        [pre.RequiredBy]: (list[pre.RequiredBy] || []).concat(preList.map((r) => ({
          ...r,
          id: pre.id
        })))
      }
    }, {})

    return mappedPres
  }

  const getAffinityCharts = async function(id = '') {
    const charts = await sequelize.query(`
      SELECT
        ac.id as treeId,
        acb.id as branchId,
        acb.BranchName,
        acn.id as nodeId,
        acn.SkillLevel,
        acn.Effect,
        acn.Available,
        acn.Unlocked,
        CASE
          WHEN acn.id = acb.NodeAffinity1 THEN 1
          WHEN acn.id = acb.NodeAffinity2 THEN 2
          WHEN acn.id = acb.NodeAffinity3 THEN 3
          WHEN acn.id = acb.NodeAffinity4 THEN 4
          WHEN acn.id = acb.NodeAffinity5 THEN 5
        END AS Tier
      FROM xenoblade2_guide.affinityCharts as ac
      RIGHT JOIN xenoblade2_guide.affinityChartBranches as acb
        ON (acb.id = ac.AffinityBranch AND ac.AffinityBranch IS NOT NULL)
        OR (acb.id = ac.BladeSpecialBranch1 AND ac.BladeSpecialBranch1 IS NOT NULL)
        OR (acb.id = ac.BladeSpecialBranch2 AND ac.BladeSpecialBranch2 IS NOT NULL)
        OR (acb.id = ac.BladeSpecialBranch3 AND ac.BladeSpecialBranch3 IS NOT NULL)
        OR (acb.id = ac.BattleSkillBranch1 AND ac.BattleSkillBranch1 IS NOT NULL)
        OR (acb.id = ac.BattleSkillBranch2 AND ac.BattleSkillBranch2 IS NOT NULL)
        OR (acb.id = ac.BattleSkillBranch3 AND ac.BattleSkillBranch3 IS NOT NULL)
        OR (acb.id = ac.FieldSkillBranch1 AND ac.FieldSkillBranch1 IS NOT NULL)
        OR (acb.id = ac.FieldSkillBranch2 AND ac.FieldSkillBranch2 IS NOT NULL)
        OR (acb.id = ac.FieldSkillBranch3 AND ac.FieldSkillBranch3 IS NOT NULL)
      RIGHT JOIN xenoblade2_guide.affinityChartNodes as acn
        ON (acn.id = acb.NodeAffinity1 AND acb.NodeAffinity1 IS NOT NULL)
        OR (acn.id = acb.NodeAffinity2 AND acb.NodeAffinity2 IS NOT NULL)
        OR (acn.id = acb.NodeAffinity3 AND acb.NodeAffinity3 IS NOT NULL)
        OR (acn.id = acb.NodeAffinity4 AND acb.NodeAffinity4 IS NOT NULL)
        OR (acn.id = acb.NodeAffinity5 AND acb.NodeAffinity5 IS NOT NULL)
      ${id ? `WHERE ac.id = ${id}` : ''}
      `, { type: Sequelize.QueryTypes.SELECT })

    const nodePre = await getACNPrerequisites();

    const mappedCharts = charts.reduce((prev, curr) => {
      const treeList = prev[curr.treeId];

      const nodeDetails = {
        nodeId: curr.nodeId,
        skillLevel: curr.SkillLevel,
        effect: JSON.parse(curr.Effect),
        available: curr.Available === 1,
        unlocked: curr.Unlocked === 1,
        tier: curr.Tier,
        preReqs: nodePre[curr.nodeId] || undefined
      };

      if (treeList) {
        const treeBranch = treeList[curr.branchId];
        return {
          ...prev,
          [curr.treeId]: {
            ...treeList,
            [curr.branchId]: {
              branchName: treeBranch?.branchName || curr.BranchName,
              nodes: (treeBranch?.nodes || []).concat(nodeDetails)
            }
          }
        }
      }
      return {
        ...prev,
        [curr.treeId]: {
          [curr.branchId]: {
            branchName: curr.BranchName,
            nodes: [nodeDetails]
          }
        }
      }
    }, {});

    return mappedCharts;
  }

  const getBladePrerequisites = async function(id = '') {
    const preRequisites = await sequelize.query(`
      SELECT
        pre.*,
        q.Name as QuestName,
        q.Available as QuestAvailable,
        q.Status as QuestStatus,
        mon.Name as MonName,
        mon.Available as MonAvailable,
        loc.Location as LocName,
        loc.StoryProgress as LocStory,
        ma.Name as maName,
        ma.Located as maLocated
        FROM xenoblade2_guide.prerequisitesBlades as pre
          LEFT JOIN xenoblade2_guide.quests as q
            ON pre.SideQuest = q.id
          LEFT JOIN xenoblade2_guide.monsters as mon
            ON pre.Monster = mon.id
          LEFT JOIN xenoblade2_guide.locations as loc
            ON pre.Location = loc.id
          LEFT JOIN xenoblade2_guide.majorAreas as ma
            ON loc.MajorArea = ma.id
      ${id ? `WHERE RequiredBy = ${id}` : ''}
    `, { type: Sequelize.QueryTypes.SELECT })

    const storyProgress = await sequelize.query(
      'SELECT * FROM xenoblade2_guide.storyProgresses',
      { type: Sequelize.QueryTypes.SELECT })

    const mappedPreReq = preRequisites.reduce((list, pre) => {
      const reqs = [];

      if (pre.StoryProgress) {
        reqs.push({
          area: 'Story Progress',
          requirement: 'Chapter ' + pre.StoryProgress,
          completed:storyProgress[0].Chapter >= pre.StoryProgress       
        })
      }

      if (pre.NewGamePlus) {
        reqs.push({
          area: 'New Game Plus',
          requirement: pre.NewGamePlus === 1,
          completed: storyProgress[0].NewGamePlus === 1
        })
      }

      if (pre.DLCUnlocked) {
        reqs.push({
          area: 'DLC Unlocked',
          requirement: pre.DLCUnlocked === 1,
          completed: storyProgress[0].DLCUnlocked === 1
        })
      }

      if (pre.SideQuest) {
        reqs.push({
          area: 'Quest',
          requirement: pre.QuestName,
          reqId: pre.SideQuest,
          available: pre.QuestAvailable === 1,
          completed: pre.QuestStatus === 'FINISHED'
        })
      }

      if (pre.Monster) {
        reqs.push({
          area: 'Monster',
          requirement: pre.MonName,
          reqId: pre.Monster,
          available: pre.MonAvailable === 1
        })
      }

      if (pre.OtherDetails) {
        reqs.push({
          area: 'Other',
          requirement: `${pre.Location ?
            `${pre.maLocated} -> ${pre.maName} -> ${pre.LocName}: ` : ''}${pre.OtherDetails}`,
          available:pre.LocStory ? storyProgress[0].Chapter >= pre.LocStory : undefined,
        })
      }

      return {...list, [pre.RequiredBy]: reqs}
    }, {})

    return mappedPreReq;
  }

  router.get('/fetchAllBlades', async function (_, res) {

    const blades = await sequelize.query(
      'SELECT * FROM xenoblade2_guide.blades',
      { type: Sequelize.QueryTypes.SELECT })
    
    const charts = await getAffinityCharts()

    const preReqs = await getBladePrerequisites()

    const mappedBlades = blades.map((b) => ({
      ...b,
      Unlocked: b.Unlocked === 1,
      Available: b.Available === 1,
      AffinityChart: Object.entries(charts[b.AffinityChart]).map(([key, branch]) => ({
        branchId: key,
        branchName: branch.branchName,
        nodes: branch.nodes
      })),
      Prerequisites: preReqs[b.id] || undefined
    }))

    res.send(mappedBlades)
  })

  router.get('/fetchBlade', async function (req, res) {
    const blade = await sequelize.query(
      `SELECT * FROM xenoblade2_guide.blades as blades WHERE blades.id = ${req.query.id}`,
      { type: Sequelize.QueryTypes.SELECT }
    )

    if (blade.length !== 1) {
      res.status(401)
      res.send([])
    }

    const chart = await getAffinityCharts(blade[0].AffinityChart)

    const preReqs = await getBladePrerequisites(req.query.id)

    const mappedBlade = {
      ...blade[0],
      Unlocked: blade[0].Unlocked === 1,
      Available: blade[0].Available === 1,
      AffinityChart: Object.entries(chart[blade[0].AffinityChart]).map(([key, branch]) => ({
        branchId: key,
        branchName: branch.branchName,
        nodes: branch.nodes
      })),
      Prerequisites: preReqs[blade[0].id] || undefined
    }

    res.send(mappedBlade)
  })
  
  router.put('/updateBladesUnlocked', async function(req, res) {
    try {
      if (req.body.unlocked && req.body.unlocked.length > 0) {
        await sequelize.query(`
          UPDATE xenoblade2_guide.blades
          SET Unlocked = 1
          WHERE id IN (${req.body.unlocked.join(', ')})`)
      }
      if (req.body.locked && req.body.locked.length > 0) {
        await sequelize.query(`
          UPDATE xenoblade2_guide.blades
          SET Unlocked = 0
          WHERE id IN (${req.body.locked.join(', ')})`)
      }
      await sequelize.query('CALL updateMM ()');
      await sequelize.query('CALL updateQuest ()');
    } catch (err) {
      return res.status(400).json({err: err.message})
    }

    res.status(200).send()
  })

  router.put('/updateACNStatus', async function(req, res) {
    try {
      if (req.body.unlocked && req.body.unlocked.length > 0) {
        await sequelize.query(`
          UPDATE xenoblade2_guide.affinityChartNodes
          SET Unlocked = 1
          WHERE id IN (${req.body.unlocked.join(', ')})
        `)

        await sequelize.query(`
          UPDATE xenoblade2_guide.prerequisitesACNs
          SET Progress = OtherPrerequisiteDetail
          WHERE RequiredBy IN (${req.body.unlocked.join(', ')})
        `)
      }
      if (req.body.locked && req.body.locked.length > 0) {
        await sequelize.query(`
          UPDATE xenoblade2_guide.affinityChartNodes
          SET Unlocked = 0
          WHERE id IN (${req.body.locked.join(', ')})`)
      }
      
      for (let i of req.body.partial) {
        await sequelize.query(`
          UPDATE xenoblade2_guide.prerequisitesACNs
          SET Progress = ${i.progress}
          WHERE id = ${i.id}
        `)
      }
      
      for (let i of (req.body.unlocked || []).concat(req.body.locked || [])) {
        await sequelize.query('CALL updateBranchACN (:skillId)', {
          replacements: {skillId: i}
        })
        await sequelize.query('CALL updateFieldSkill (:skillId)', {
          replacements: {skillId: i}
        })
      }
      await sequelize.query('CALL updateH2H ()');
      await sequelize.query('CALL updateQuest ()');
      await sequelize.query('CALL updateACN ()');
      await sequelize.query('CALL updateACNUnlocked ()');
    } catch (err) {
      return res.status(400).json({err: err.message})
    }

    res.status(200).send()
  })

  return router
}
