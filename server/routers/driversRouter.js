/** Customized router for the RESTful API actions **/

const express = require('express')
const Router = express.Router
const { sequelize } = require('../models')
const Sequelize = require('sequelize');

module.exports = function() {
  const router = Router()

  const getSkillTrees = async function(id = '') {
    const skillTrees = await sequelize.query(
      `SELECT
        dst.id as dstId,
        dsn.*,
        CASE
          WHEN dsn.id = dst.Tier1Branch1
            OR dsn.id = dst.Tier1Branch2
            OR dsn.id = dst.Tier1Branch3
            OR dsn.id = dst.Tier1Branch4
            OR dsn.id = dst.Tier1Branch5 THEN 1
          WHEN dsn.id = dst.Tier2Branch1
            OR dsn.id = dst.Tier2Branch2
            OR dsn.id = dst.Tier2Branch3
            OR dsn.id = dst.Tier2Branch4
            OR dsn.id = dst.Tier2Branch5 THEN 2
          WHEN dsn.id = dst.Tier3Branch1
            OR dsn.id = dst.Tier3Branch2
            OR dsn.id = dst.Tier3Branch3
            OR dsn.id = dst.Tier3Branch4
            OR dsn.id = dst.Tier3Branch5 THEN 3
        END AS Tier
      FROM xenoblade2_guide.driverSkillTrees as dst
      RIGHT JOIN xenoblade2_guide.driverSkillNodes as dsn
        ON dst.Tier1Branch1 = dsn.id
          OR dst.Tier2Branch1 = dsn.id
          OR dst.Tier3Branch1 = dsn.id
          OR dst.Tier1Branch2 = dsn.id
          OR dst.Tier2Branch2 = dsn.id
          OR dst.Tier3Branch2 = dsn.id
          OR dst.Tier1Branch3 = dsn.id
          OR dst.Tier2Branch3 = dsn.id
          OR dst.Tier3Branch3 = dsn.id
          OR dst.Tier1Branch4 = dsn.id
          OR dst.Tier2Branch4 = dsn.id
          OR dst.Tier3Branch4 = dsn.id
          OR dst.Tier1Branch5 = dsn.id
          OR dst.Tier2Branch5 = dsn.id
          OR dst.Tier3Branch5 = dsn.id
      ${id ? `WHERE dst.id = ${id}` : ''}`,
      { type: Sequelize.QueryTypes.SELECT })
    const mappedTrees = skillTrees.reduce((prev, curr) => {
      const treeList = prev[curr.dstId];
  
      const nodeDetails = {
        nodeId: curr.id,
        name: curr.Name,
        effect: curr.Effect,
        sp: curr.SP,
        unlocked: curr.Unlocked === 1,
      };
  
      if (treeList) {
        const tier = treeList['tier' + curr.Tier]
        return {
          ...prev,
          [curr.dstId]: {
            ...treeList,
            ['tier' + curr.Tier]: (tier || []).concat(nodeDetails)
          }
        }
      }
      return {
        ...prev,
        [curr.dstId]: {
          treeId: curr.dstId,
          ['tier' + curr.Tier]: [nodeDetails]
        }
      }
    }, {});
  
    return mappedTrees;
  }

  const getDriverArts = async function(id = '') {
    const arts = await sequelize.query(
      `SELECT
        da.id as artId,
        da.Driver,
        da.Name,
        da.WeaponType,
        da.Effect,
        da.Target,
        da.Type,
        da.LevelUnlocked,
      CASE
        WHEN da.Level1 = dad.id THEN 1
        WHEN da.Level2 = dad.id THEN 2
        WHEN da.Level3 = dad.id THEN 3
        WHEN da.Level4 = dad.id THEN 4
        WHEN da.Level5 = dad.id THEN 5
        WHEN da.Level5MaxAffinity = dad.id THEN 6
      END AS NodeLevel,
      dad.*
      FROM xenoblade2_guide.driverArts as da
      RIGHT JOIN xenoblade2_guide.driverArtDetails as dad
      ON da.Level1 = dad.id
        OR da.Level2 = dad.id
        OR da.Level3 = dad.id
        OR da.Level4 = dad.id
        OR da.Level5 = dad.id
        OR da.Level5MaxAffinity = dad.id
    ${id ? `WHERE da.Driver = ${id}` : ''}`,
      { type: Sequelize.QueryTypes.SELECT })
    
    const mappedArts = arts.reduce((prev, curr) => {
      const driverArtsList = prev[curr.Driver];
    
      const artDetails = {
        id: curr.artId,
        name: curr.Name,
        weaponType: curr.WeaponType,
        effect: JSON.parse(curr.Effect),
        target: curr.Target,
        type: curr.Type,
        levelUnlocked: curr.LevelUnlocked
      };

      const nodeDetails = {
        sp: curr.SP,
        damage: curr.Damage,
        effectPotency: curr.EffectPotency,
        recharge: curr.Recharge,
        level: curr.NodeLevel
      }
    
      if (driverArtsList) {
        const art = driverArtsList.find((artList) => artList.id === curr.artId)
        return {
          ...prev,
          [curr.Driver]: driverArtsList.filter((artList) => !art || artList.id !== art.id)
            .concat({
              ...artDetails,
              nodes: (art || {nodes: []}).nodes.concat(nodeDetails)
            })
        }
      }
      return {
        ...prev,
        [curr.Driver]: [
          {
            ...artDetails,
            nodes: [nodeDetails]
          }
        ]
      }
    }, {});
    
    return mappedArts;
  
  }

  router.get('/fetchAllDrivers', async function (_, res) {
    const drivers = await sequelize.query(
      'SELECT * FROM xenoblade2_guide.drivers',
      { type: Sequelize.QueryTypes.SELECT })

    const skillTrees = await getSkillTrees();

    const driverArts = await getDriverArts();

    const mappedDrivers = drivers.map((dr) => ({
      id: dr.id,
      name: dr.Name,
      chapterUnlocked: dr.ChapterUnlocked,
      favItem1: dr.FavItem1,
      favItemType1: dr.FavItemType1,
      favItem2: dr.FavItem2,
      favItemType2: dr.FavItemType2,
      ideaStats: JSON.parse(dr.IdeaStats),
      arts: driverArts[dr.id],
      skillTree: skillTrees[dr.DriverSkillTree],
      hiddenSkillTree: skillTrees[dr.HiddenSkillTree]
    }))

    res.send(mappedDrivers)
  })

  router.get('/fetchDriver', async function (req, res) {
    const driver = await sequelize.query(
      `SELECT * FROM xenoblade2_guide.drivers
      WHERE id = ${req.query.id}`,
      { type: Sequelize.QueryTypes.SELECT }
    )

    if (driver.length !== 1) {
      res.status(401)
      res.send([])
    }

    const mainSkillTree = await getSkillTrees(driver[0].DriverSkillTree);
    const hiddenSkillTree = await getSkillTrees(driver[0].HiddenSkillTree);
    const driverArts = await getDriverArts(driver[0].id);

    const mappedDriver = {
      id: driver[0].id,
      name: driver[0].Name,
      chapterUnlocked: driver[0].ChapterUnlocked,
      favItem1: driver[0].FavItem1,
      favItemType1: driver[0].FavItemType1,
      favItem2: driver[0].FavItem2,
      favItemType2: driver[0].FavItemType2,
      arts: driverArts[driver[0].id],
      skillTree: mainSkillTree[driver[0].DriverSkillTree],
      hiddenSkillTree: hiddenSkillTree[driver[0].HiddenSkillTree],
      ideaStats: JSON.parse(driver[0].IdeaStats),
    }

    res.send(mappedDriver)
  })

  router.put('/updateSkillNodesUnlocked', async function(req, res) {
    try {
      if (req.body.unlocked && req.body.unlocked.length > 0) {
        await sequelize.query(`
          UPDATE xenoblade2_guide.driverSkillNodes
          SET Unlocked = 1
          WHERE id IN (${req.body.unlocked.join(', ')})`)
      }
      if (req.body.locked && req.body.locked.length > 0) {
        await sequelize.query(`
          UPDATE xenoblade2_guide.driverSkillNodes
          SET Unlocked = 0
          WHERE id IN (${req.body.locked.join(', ')})`)
      }
    } catch (err) {
      return res.status(400).json({err: err.message})
    }
  
    res.status(200).send()
  })

  router.put('/updateArtLevel', async function (req, res) {
    try {
      if (req.body && req.body.length) {
        req.body.forEach(async (art) => {
          await sequelize.query(`
            UPDATE xenoblade2_guide.driverArts
            SET LevelUnlocked = ${art.levelUnlocked}
            WHERE id = ${art.id}`)
        })
      }
    } catch (err) {
      return res.status(400).json({err: err.message})
    }
    
    res.status(200).send()
  })

  return router
}
