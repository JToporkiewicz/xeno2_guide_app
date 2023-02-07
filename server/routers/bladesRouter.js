/** Customized router for the RESTful API actions **/

const express = require('express')
const Router = express.Router
const { getAffinityCharts } = require('./common/affinityChart');
const { sequelize } = require('../models')
const Sequelize = require('sequelize');

module.exports = function() {
  const router = Router()

  router.get('/fetchAllBlades', async function (_, res) {

    const blades = await sequelize.query(
      'SELECT * FROM xenoblade2_guide.blades',
      { type: Sequelize.QueryTypes.SELECT })
    
    const charts = await getAffinityCharts()

    const mappedBlades = blades.map((b) => ({
      ...b,
      Unlocked: b.Unlocked === 1,
      Available: b.Available === 1,
      AffinityChart: Object.entries(charts[b.AffinityChart]).map(([key, branch]) => ({
        branchId: key,
        branchName: branch.branchName,
        nodes: branch.nodes
      }))
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

    const chart = await getAffinityCharts()

    const mappedBlade = {
      ...blade[0],
      Unlocked: blade[0].Unlocked === 1,
      Available: blade[0].Available === 1,
      AffinityChart: Object.entries(chart[blade[0].AffinityChart]).map(([key, branch]) => ({
        branchId: key,
        branchName: branch.branchName,
        nodes: branch.nodes
      }))
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

  return router
}
