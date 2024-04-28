const { Router } = require('express')
const { sequelize } = require('../models')
const { Sequelize } = require('sequelize')

module.exports = function() {
  const router = Router()

  router.get('/getAllLocations', async function(_, res) {
    const locations = await sequelize.query(
      'SELECT * FROM xenoblade2_guide.locations',
      { type: Sequelize.QueryTypes.SELECT }
    )

    res.send(locations);
  })

  router.put('/updateMappedLocations', async function(req, res) {
    try {
      if (req.body.unlocked && req.body.unlocked.length > 0) {
        await sequelize.query(`
          UPDATE xenoblade2_guide.locations
          SET Mapped = 1
          WHERE id IN (${req.body.unlocked.join(', ')})`)
      }
      if (req.body.locked && req.body.locked.length > 0) {
        await sequelize.query(`
          UPDATE xenoblade2_guide.locations
          SET Mapped = 0
          WHERE id IN (${req.body.locked.join(', ')})`)
      }
    } catch (err) {
      return res.status(400).json({err: err.message})
    }
    res.status(200).send()
  
  })

  return router
}