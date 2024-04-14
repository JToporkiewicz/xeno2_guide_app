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
        b.Name as BladeName,
        b.id as BladeId,
        fs.Name as FSName,
        fs2.Name as FS2Name,
        q.Name as QuestName,
        ma.Name as MAName,
        ma.Located as MALocated
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

    const mappedPre = h2hPres.reduce((list, pre) => {
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

      if (pre.Quest) {
        reqs.push({
          area: 'Quest',
          requirement: pre.QuestName,
          reqId: pre.Quest
        })
      }

      if (pre.FieldSkill1) {
        reqs.push({
          area: 'Field Skills',
          requirement: pre.FSName,
          requirementCount: pre.FieldSkill1Level,
          reqId: pre.FieldSkill1
        })
      }

      if (pre.FieldSkill2) {
        reqs.push({
          area: 'Field Skills',
          requirement: pre.FS2Name,
          requirementCount: pre.FieldSkill2Level,
          reqId: pre.FieldSkill2
        })
      }

      if (pre.BladeAffinityChartNode) {
        reqs.push({
          area: 'Affinity Chart Node',
          requirement: `${pre.BladeName}: ${pre.ACNName} Level ${pre.ACNLevel}`,
          reqId: pre.BladeId
        })
      }

      if (pre.StayAtAnInn) {
        reqs.push({
          area: 'Stay at an inn',
          requirement: `${pre.StayAtAnInn} in ${pre.MALocated} -> ${pre.MAName}`,
          reqId: pre.InnLocation
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
      h2h.Location as locId,
      loc.Location,
      ma.Name as maName,
      ma.Located as maLoc,
      h2h.Who,
      h2h.Outcomes,
      h2h.Viewed
      FROM xenoblade2_guide.heart2Hearts as h2h
      LEFT JOIN xenoblade2_guide.locations as loc
        ON h2h.Location = loc.id
      LEFT JOIN xenoblade2_guide.majorAreas as ma
        ON loc.MajorArea = ma.id
      ${id ? `WHERE h2h.id = ${id}` : ''}`,
      { type: Sequelize.QueryTypes.SELECT })

    const pres = await getH2HPrerequisites(id)

    const mappedH2h = await Promise.all(h2h.map(async (h) => {
      const whoList = JSON.parse(h.Who)
      const blades = await sequelize.query(
        `SELECT
          b.id,
          b.Name
          FROM xenoblade2_guide.blades as b
          WHERE b.Name IN ("${whoList.join('", "')}")
        `,
        { type: Sequelize.QueryTypes.SELECT })

      const minChapter = await sequelize.query(
        `SELECT MAX(d.ChapterUnlocked) as maxDriver
          FROM xenoblade2_guide.drivers as d
          WHERE d.Name IN ("${whoList.join('", "')}")
        `,
        { type: Sequelize.QueryTypes.SELECT })

      let presList = (pres[h.id] || [])
        .concat(blades.map((b) => ({
          area: 'Blade',
          requirement: b.Name,
          reqId: b.id
        })))
        .concat({
          area: 'Location',
          reqId: h.locId
        })

      if (minChapter.length > 0 && minChapter[0].maxDriver !== null) {
        const storyPrerequisite = presList.find((p) => p.area === 'Story Progress')

        const storyReq = {
          area: 'Story Progress',
          requirement: 'Chapter ' + minChapter[0].maxDriver,
          requirementCount: minChapter[0].maxDriver        
        }

        if (storyPrerequisite
          && Number(storyPrerequisite.requirement.split(' ')[1]) < minChapter[0].maxDriver) {
          presList = presList.map((p) => {
            if (p.area === 'Story Progress') {
              return storyReq
            } else {
              return p
            }
          })
        } else if (storyPrerequisite === undefined) {
          presList = presList.concat(storyReq)
        }
      }

      return {
        id:h.id,
        Title:h.Title,
        Area:`(${h.maLoc} -> ${h.maName})`,
        Location:h.Location,
        Who:whoList,
        Outcomes:JSON.parse(h.Outcomes),
        Viewed:h.Viewed ? true : false,
        PreReqs: presList.length ? presList : undefined
      }
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
      await sequelize.query('CALL updateAll ()');
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
