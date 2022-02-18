/** Customized router for the RESTful API actions **/

const express = require('express')
const Router = express.Router

module.exports = function(Model, sequelize) {
  const router = Router()
  
  router.put('/:id', async function(req, res) {
    const resource = await Model.findOne({ where: { id: req.params.id } })
    await resource.update(req.body)
    try {
      if(req.body.CompletionProgress !== 0) {
        await sequelize.query('CALL updateCompleteQuestSubStepManually  (:questSubStepId)',{
          replacement: {questSubStepId: req.params.id}
        });
      }
      await sequelize.query('CALL updateH2H ()');
      await sequelize.query('CALL updateBlade ()');
      await sequelize.query('CALL updateMM ()');
      await sequelize.query('CALL updateQuest ()');  
      await sequelize.query('CALL updateQuestRelatedACN ()');
      await sequelize.query('CALL updateACN ()');
      await sequelize.query('CALL updateACNUnlocked ()');
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
