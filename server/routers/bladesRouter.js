/** Customized router for the RESTful API actions **/

const express = require('express')
const Router = express.Router
const { sequelize } = require('../models')
const Sequelize = require('sequelize');

module.exports = function() {
  const router = Router()

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

    const mappedCharts = charts.reduce((prev, curr) => {
      const treeList = prev[curr.treeId];

      const nodeDetails = {
        nodeId: curr.nodeId,
        skillLevel: curr.SkillLevel,
        effect: JSON.parse(curr.Effect),
        available: curr.Available === 1,
        unlocked: curr.Unlocked === 1,
        tier: curr.Tier
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
          requirement: pre.NewGamePlus,
          completed: storyProgress[0].NewGamePlus
        })
      }

      if (pre.DLCUnlocked) {
        reqs.push({
          area: 'DLC Unlocked',
          requirement: pre.DLCUnlocked,
          completed: storyProgress[0].DLCUnlocked
        })
      }

      if (pre.SideQuest) {
        reqs.push({
          area: 'Quest',
          requirement: pre.QuestName,
          reqId: pre.SideQuest,
          available: pre.QuestAvailable,
          completed: pre.QuestStatus === 'FINISHED'
        })
      }

      if (pre.Monster) {
        reqs.push({
          area: 'Monster',
          requirement: pre.MonName,
          reqId: pre.Monster,
          available: pre.MonAvailable
        })
      }

      if (pre.OtherDetails) {
        reqs.push({
          area: 'Other',
          requirement: `${pre.Location ?
            `${pre.maLocated} -> ${pre.maName} -> ${pre.LocName}: ` : ''}${pre.OtherDetails}`,
          available:pre.LocStory ? pre.LocStory >= storyProgress[0].Chapter : undefined,
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
      }
      if (req.body.locked && req.body.locked.length > 0) {
        await sequelize.query(`
          UPDATE xenoblade2_guide.affinityChartNodes
          SET Unlocked = 0
          WHERE id IN (${req.body.locked.join(', ')})`)
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
