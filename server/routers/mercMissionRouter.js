/** Customized router for the RESTful API actions **/

const express = require('express')
const Router = express.Router
const { sequelize } = require('../models')
const Sequelize = require('sequelize');

module.exports = function() {
  const router = Router()

  const getPreMM = async function(id = '') {
    const mmPres = await sequelize.query(`
    SELECT
      pre.*,
      ma.Name as NationName,
      b.Name as BladeName,
      q.Name as QuestName,
      mm.Name as MMName
      FROM xenoblade2_guide.prerequisitesMMs as pre
      LEFT JOIN xenoblade2_guide.majorAreas as ma
        ON ma.id = pre.Nation
      LEFT JOIN xenoblade2_guide.blades as b
        ON b.id = pre.BladeUnlocked
      LEFT JOIN xenoblade2_guide.quests as q
        ON q.id = pre.Quest
      LEFT JOIN xenoblade2_guide.mercMissions as mm
        ON mm.id = pre.MercMissionCompleted
      ${id ? `WHERE pre.RequiredBy = ${id}` : ''}`,
    { type: Sequelize.QueryTypes.SELECT });

    const mappedPre = mmPres.reduce((list, pre) => {
      const reqs = [];

      if (pre.Nation) {
        reqs.push({
          area: 'Nation Dev Level',
          requirement: `${pre.NationName}: Development Level ${pre.LocationDevLevel}`,
          requirementCount: pre.LocationDevLevel,
          reqId: pre.Nation
        })
      }

      if (pre.MercLevel) {
        reqs.push({
          area: 'Merc Level',
          requirement: `${pre.MercLevel}`,
          requirementCount: pre.MercLevel
        })
      }

      if (pre.BladeUnlocked) {
        reqs.push({
          area: 'Blade',
          requirement: pre.BladeName,
          reqId: pre.BladeUnlocked
        })
      }

      if (pre.Quest) {
        reqs.push({
          area: pre.QuestStatus === 'STARTED' ? 'Start side-quest': 'Quest',
          requirement: `${pre.QuestName}: ${pre.QuestStatus}`,
          reqId: pre.Quest
        })
      }

      if (pre.MercMissionCompleted) {
        reqs.push({
          area: 'Merc Mission',
          requirement: pre.MMName,
          reqId: pre.MercMissionCompleted
        })
      }

      if (pre.StoryProgress) {
        reqs.push({
          area: 'Story Progress',
          requirement: 'Chapter ' + pre.StoryProgress,
          requirementCount: pre.StoryProgress
        })
      }

      if (pre.DLCUnlocked) {
        reqs.push({
          area: 'DLC Unlocked',
          requirement: pre.DLCUnlocked === 1
        })
      }

      if (pre.OtherPrerequisiteDetails) {
        reqs.push({
          area: 'Other',
          requirement: `${pre.OtherPrerequisiteTitle}: ${pre.OtherPrerequisiteDetails}`
        })
      }

      return {
        ...list,
        [pre.RequiredBy]: (list[pre.RequiredBy] || []).concat(reqs)
      }
    }, {})

    return mappedPre;

  }

  const getMercMissions = async function(id = '') {
    const mm = await sequelize.query(`
      SELECT
        mm.id,
        mm.Name,
        ma.Name as MissionNation,
        mm.Giver,
        loc.Location as GiverLocation,
        mm.Duration,
        mm.Type,
        mm.Missable,
        mm.Completed
        FROM xenoblade2_guide.mercMissions as mm
        LEFT JOIN xenoblade2_guide.locations as loc
          ON mm.GiverLocation = loc.id
        LEFT JOIN xenoblade2_guide.majorAreas as ma
          ON mm.MissionNation = ma.id
        ${id ? `WHERE mm.id = ${id}` : ''}`,
    { type: Sequelize.QueryTypes.SELECT })

    const pres = await getPreMM(id);

    const mappedMM = mm.map((m) => ({
      ...m,
      Missable: m.Missable === 1,
      Completed: m.Completed === 1,
      Prerequisites: pres[m.id] || undefined
    }))

    return mappedMM;
  }

  const getMMRequirements = async function(id = '') {
    const requirements = await sequelize.query(`
      SELECT req.*,
        b.Name as BladeName,
        fs.Name as FieldSkillName,
        fs.TotalLevel as FieldSkillTotal
        FROM xenoblade2_guide.requirementsMMs as req
        LEFT JOIN xenoblade2_guide.blades as b
          ON b.id = req.Blade
        LEFT JOIN xenoblade2_guide.fieldSkills as fs
          ON fs.id = req.FieldSkill
      ${id ? `WHERE req.MissionId = ${id}` : ''}`,
    { type: Sequelize.QueryTypes.SELECT })

    const mappedReq = []
    requirements.forEach((r) => {
      if (r.Blade) {
        mappedReq.push({
          MissionId: r.MissionId,
          area: 'Blade',
          requirement: r.BladeName || 'Unknown',
          reqId: r.Blade
        })
      }
      if (r.FieldSkill) {
        mappedReq.push({
          MissionId: r.MissionId,
          area: 'Field Skills',
          requirement: r.FieldSkillName || 'Unknown',
          requirementCount: r.FieldSkillLevel
        })
      }
      if (r.Element) {
        mappedReq.push({
          MissionId: r.MissionId,
          area: 'Element Type',
          requirement: r.Element,
          requirementCount: r.ElementLevel
        })
      }
      if (r.WeaponType) {
        mappedReq.push({
          MissionId: r.MissionId,
          area: 'Weapon Type',
          requirement: r.WeaponType,
          requirementCount: r.WeaponLevel
        })
      }
      if (r.BladeGender) {
        mappedReq.push({
          MissionId: r.MissionId,
          area: 'Blade Gender',
          requirement: r.BladeGender,
          requirementCount: r.BladeGenderLevel
        })
      }
      if (r.Humanoid !== null) {
        mappedReq.push({
          MissionId: r.MissionId,
          area: 'Humanoid',
          requirement: r.Humanoid ? 'Humanoid' : 'Animal',
          requirementCount: r.HumanoidLevel
        })
      }
      if (r.Stats) {
        mappedReq.push({
          MissionId: r.MissionId,
          area: 'Stats',
          requirement: r.Stats,
          requirementCount: r.StatsLevel
        })
      }
    });

    return mappedReq;
  }
  
  router.put('/updateMMStatus', async function(req, res) {
    try {
      if (req.body.unlocked && req.body.unlocked.length > 0) {
        await sequelize.query(`
          UPDATE xenoblade2_guide.mercMissions
          SET Completed = 1
          WHERE id IN (${req.body.unlocked.join(', ')})`)
      }
      if (req.body.locked && req.body.locked.length > 0) {
        await sequelize.query(`
          UPDATE xenoblade2_guide.mercMissions
          SET Completed = 0
          WHERE id IN (${req.body.locked.join(', ')})`)
      }

      await sequelize.query('CALL updateBlade ()');
      await sequelize.query('CALL updateQuest ()');
      await sequelize.query('CALL updateMMRelatedACN ()');
      await sequelize.query('CALL updateACN ()');
    } catch (err) {
      return res.status(400).json({err: err.message})
    }
    res.status(200).send()
  })

  router.get('/getMercMission', async function(req, res) {
    const mercMissions = await getMercMissions(req.query.id);

    const requirements = await getMMRequirements(req.query.id);

    const mappedMM = {
      ...mercMissions[0],
      Requirements: requirements
    }
    res.send(mappedMM)
  })

  router.get('/getAllMercMissions', async function(_, res) {
    const mercMissions = await getMercMissions();

    const requirements = await getMMRequirements();

    const mappedMMs = mercMissions.map((mm) => ({
      ...mm,
      Requirements: requirements.filter((req) => req.MissionId === mm.id)
        .map((req) => {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { MissionId, ...requirement } = req;
          return requirement
        })
    }))
    res.send(mappedMMs)
  })

  return router
}
