/** Customized router for the RESTful API actions **/

const express = require('express')
const Router = express.Router
const { sequelize } = require('../models')
const Sequelize = require('sequelize');

module.exports = function() {
  const router = Router()

  const getH2HPrerequisites = async function(id = '') {
    const h2hPres = await sequelize.query(`
      SELECT
        pre.*,
        acn.Name as ACNName,
        acn.SkillLevel as ACNLevel,
        acn.Available as ACNAvailable,
        acn.Unlocked as ACNUnlocked,
        b.Name as BladeName,
        b.id as BladeId,
        fs.Name as FSName,
        fs.TotalLevel as FSCurrentTotal,
        fs2.Name as FS2Name,
        fs2.TotalLevel as FS2CurrentTotal,
        q.Name as QuestName,
        q.Available as QuestAvailable,
        q.Status as QuestStatus,
        ma.Name as MAName,
        ma.Located as MALocated,
        ma.StoryProgress as MAStory
        FROM xenoblade2_guide.prerequisitesH2Hs as pre
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
        LEFT JOIN xenoblade2_guide.blades as b
          ON b.AffinityChart = ac.id
          AND ac.id IS NOT NULL
        LEFT JOIN xenoblade2_guide.fieldSkills as fs
          ON fs.id = pre.FieldSkill1
        LEFT JOIN xenoblade2_guide.fieldSkills as fs2
          ON fs2.id = pre.FieldSkill2
        LEFT JOIN xenoblade2_guide.quests as q
          ON q.id = pre.Quest
        LEFT JOIN xenoblade2_guide.majorAreas as ma
          ON ma.id = pre.InnLocation
        ${id ? `WHERE pre.RequiredBy = ${id}` : ''}`,
    { type: Sequelize.QueryTypes.SELECT })

    const storyProgress = await sequelize.query(
      'SELECT * FROM xenoblade2_guide.storyProgresses',
      { type: Sequelize.QueryTypes.SELECT })

    const mappedPre = h2hPres.reduce((list, pre) => {
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

      if (pre.Quest) {
        reqs.push({
          area: 'Quest',
          requirement: pre.QuestName,
          reqId: pre.Quest,
          available: pre.QuestAvailable === 1,
          completed: pre.QuestStatus === 'FINISHED'
        })
      }

      if (pre.FieldSkill1) {
        reqs.push({
          area: 'Field Skills',
          requirement: pre.FSName,
          requirementCount: pre.FieldSkill1Level,
          completed: pre.FSCurrentTotal >= pre.FieldSkill1Level
        })
      }

      if (pre.FieldSkill2) {
        reqs.push({
          area: 'Field Skills',
          requirement: pre.FS2Name,
          requirementCount: pre.FieldSkill2Level,
          completed: pre.FS2CurrentTotal >= pre.FieldSkill2Level
        })
      }

      if (pre.BladeAffinityChartNode) {
        reqs.push({
          area: 'Affinity Chart Node',
          requirement: `${pre.BladeName}: ${pre.ACNName} Level ${pre.ACNLevel}`,
          available: pre.ACNAvailable,
          completed: pre.ACNUnlocked,
          reqId: pre.BladeId
        })
      }

      if (pre.StayAtAnInn) {
        reqs.push({
          area: 'Stay at an inn',
          requirement: `${pre.StayAtAnInn} in ${pre.MALocated} -> ${pre.MAName}`,
          available: storyProgress[0].Chapter >= pre.MAStory
        })
      }

      return {
        ...list,
        [pre.RequiredBy]: (list[pre.RequiredBy] || []).concat(reqs)
      }
    }, {})

    return mappedPre
  }

  const getHeart2Hearts = async function(id = '') {
    const h2h = await sequelize.query(
      `SELECT
      h2h.id,
      h2h.Title,
      loc.Location,
      ma.Name as maName,
      ma.Located as maLoc,
      h2h.Who,
      h2h.Outcomes,
      h2h.Available,
      h2h.Viewed
      FROM xenoblade2_guide.heart2Hearts as h2h
      LEFT JOIN xenoblade2_guide.locations as loc
        ON h2h.Location = loc.id
      LEFT JOIN xenoblade2_guide.majorAreas as ma
        ON loc.MajorArea = ma.id
      ${id ? `WHERE h2h.id = ${id}` : ''}`,
      { type: Sequelize.QueryTypes.SELECT })

    const pres = await getH2HPrerequisites(id)

    const mappedH2h = h2h.map((h) => ({
      id:h.id,
      Title:h.Title,
      Area:`(${h.maLoc} -> ${h.maName})`,
      Location:h.Location,
      Who:JSON.parse(h.Who),
      Outcomes:JSON.parse(h.Outcomes),
      Available:h.Available ? true : false,
      Viewed:h.Viewed ? true : false,
      PreReqs: pres[h.id] || undefined
    }))

    return mappedH2h
  }

  router.put('/updateH2HViewed', async function(req, res) {
    try {
      if (req.body.unlocked && req.body.unlocked.length > 0) {
        await sequelize.query(`
          UPDATE xenoblade2_guide.heart2Hearts
          SET Viewed = 1
          WHERE id IN (${req.body.unlocked.join(', ')})`)
      }
      if (req.body.locked && req.body.locked.length > 0) {
        await sequelize.query(`
          UPDATE xenoblade2_guide.heart2Hearts
          SET Viewed = 0
          WHERE id IN (${req.body.locked.join(', ')})`)
      }
      await sequelize.query('CALL updateH2HRelatedACN ()');
      await sequelize.query('CALL updateACNUnlocked ()');
      await sequelize.query('CALL updateQuest ()');
      await sequelize.query('CALL updateACN ()');
    } catch (err) {
      return res.status(400).json({err: err.message})
    }
    res.status(200).send()
  })

  router.get('/getH2h', async function(req, res) {
    const resource = await getHeart2Hearts(req.query.id)
    res.send(resource[0])
  })

  router.get('/getAllH2H', async function(_, res) {
    const resources = await getHeart2Hearts()
    res.send(resources)
  })

  return router
}
