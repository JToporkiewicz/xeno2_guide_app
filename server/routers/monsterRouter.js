/** Customized router for the RESTful API actions **/

const express = require('express')
const Router = express.Router
const { sequelize } = require('../models')
const Sequelize = require('sequelize');

module.exports = function() {
  const router = Router()

  const getMonsters = async function(id = '') {
    const monsters = await sequelize.query(`
    SELECT m.id,
      m.Name,
      m.Category,
      mt.MonsterType as Type,
      m.IsDriver,
      m.LowestLevel,
      m.HighestLevel,
      m.Location as LocId,
      loc.Location as Location,
      ma.Name as AreaName,
      ma.Located as AreaLocation,
      m.DLCRequired,
      m.SpawnCondition,
      m.Drops,
      m.Beaten
      FROM xenoblade2_guide.monsters as m
      LEFT JOIN xenoblade2_guide.monsterTypes as mt
      ON m.Type = mt.id
      LEFT JOIN xenoblade2_guide.locations as loc
        ON loc.id = m.Location
      LEFT JOIN xenoblade2_guide.majorAreas as ma
      ON ma.id = loc.MajorArea
      ${id ? `WHERE m.id = ${id}` : ''}`,
    { type: Sequelize.QueryTypes.SELECT })

    const mappedMon = monsters.map((mon) => ({
      id: mon.id,
      Name: mon.Name,
      Category: mon.Category,
      Type: mon.Type,
      IsDriver: mon.IsDriver === 1,
      LowestLevel: mon.LowestLevel,
      HighestLevel: mon.HighestLevel,
      LocationId: mon.LocId,
      Location: mon.Location,
      Area: mon.AreaLocation === 'Uncharted area' ?
        mon.AreaName : `(${mon.AreaLocation} -> ${mon.AreaName})`,
      DLCRequired: mon.DLCRequired === 1,
      SpawnCondition: mon.SpawnCondition,
      Drops: JSON.parse(mon.Drops).map((drop) => ({
        name: drop.Name,
        type: drop.Type,
        rarity: drop.Rarity,
        dropRate: drop.Rate
      })),
      Beaten: mon.Beaten === 1
    }))

    return mappedMon
  }
  
  router.put('/updateMonsterStatus', async function(req, res) {
    try {
      if (req.body.unlocked && req.body.unlocked.length > 0) {
        await sequelize.query(`
          UPDATE xenoblade2_guide.monsters
          SET Beaten = 1
          WHERE id IN (${req.body.unlocked.join(', ')})`)
      }
      if (req.body.locked && req.body.locked.length > 0) {
        await sequelize.query(`
          UPDATE xenoblade2_guide.monsters
          SET Beaten = 0
          WHERE id IN (${req.body.locked.join(', ')})`)
      }
      await sequelize.query('CALL updateMonsterRelatedACN ()');
      await sequelize.query('CALL updateACN ()');
      await sequelize.query('CALL updateChallenge()');
    } catch (err) {
      return res.status(400).json({err: err.message})
    }
    res.status(200).send()
  })

  router.get('/getMonsterById', async function(req, res) {
    const resource = await getMonsters(req.query.id)
    res.send(resource)
  })

  router.get('/getAllMonsters', async function(_, res) {
    const resources = await getMonsters()
    res.send(resources)
  })

  return router
}
