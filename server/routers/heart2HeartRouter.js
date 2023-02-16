/** Customized router for the RESTful API actions **/

const express = require('express')
const Router = express.Router
const { sequelize } = require('../models')
const Sequelize = require('sequelize');

module.exports = function() {
  const router = Router()

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

    const mappedH2h = h2h.map((h) => ({
      id:h.id,
      Title:h.Title,
      Area:`(${h.maLoc} -> ${h.maName})`,
      Location:h.Location,
      Who:JSON.parse(h.Who),
      Outcomes:JSON.parse(h.Outcomes),
      Available:h.Available ? true : false,
      Viewed:h.Viewed ? true : false   
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
