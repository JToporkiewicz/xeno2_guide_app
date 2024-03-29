/** Customized router for the RESTful API actions **/

const express = require('express')
const Router = express.Router

module.exports = function(Model, sequelize) {
  const router = Router()
  
  router.put('/:id', async function(req, res) {
    const resource = await Model.findOne({ where: { id: req.params.id } })
    await resource.update(req.body)
    try {
      await sequelize.query('CALL updateMonster ()');
      await sequelize.query('CALL updateH2H ()');
      await sequelize.query('CALL updateBlade ()');
      await sequelize.query('CALL updateMM ()');
      await sequelize.query('CALL updateQuest ()');
      await sequelize.query('CALL updateACN ()');
    } catch (err) {
      return res.status(400).json({err: err.message})
    }
    await resource.reload()
    res.send(resource)
  })

  router.get('/:id', async function(req, res) {
    const resource = await Model.findOne({ where: { id: req.params.id } })
    res.send(resource)
  })

  router.get('/', async function(req, res) {
    const resources = await Model.findAll({ where: req.query })
    res.send(resources)
  })

  return router
}
