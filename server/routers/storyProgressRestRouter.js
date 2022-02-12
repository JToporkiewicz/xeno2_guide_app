/** Customized router for the RESTful API actions **/

const express = require('express')
const Router = express.Router

module.exports = function(Model, sequelize) {
  const router = Router()
  
  router.put('/:id', async function(req, res) {
    const resource = await Model.findOne({ where: { id: req.params.id } })
    await resource.update(req.body)
    try {
        const chapter = req.body.Chapter;
        const newGamePlus = req.body.NewGamePlus;
        const dlcUnlocked = req.body.DLCUnlocked;
        await sequelize.query('CALL dropAvailableH2HTable ()');
        await sequelize.query('CALL updateH2HFromStoryProgress (:chapter, :newGamePlus, :dlcUnlocked)',
          {replacements:{
            chapter,
            newGamePlus: newGamePlus ? 1 : 0,
            dlcUnlocked: dlcUnlocked ? 1 : 0
          }});
        await sequelize.query('CALL updateH2H ()');
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
