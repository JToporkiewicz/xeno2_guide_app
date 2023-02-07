/** Customized router for the RESTful API actions **/

const express = require('express')
const Router = express.Router
const { getAffinityCharts } = require('./common/affinityChart');

module.exports = function(Model) {
  const router = Router()
  
  router.put('/:id', async function(req, res) {
    const resource = await Model.findOne({ where: { id: req.params.id } })
    await resource.update(req.body)
    await resource.reload()
    res.send(resource)
  })

  router.get('/:id', async function(req, res) {
    const resource = await Model.findOne({ where: { id: req.params.id } })
    res.send(resource)
  })

  router.get('/', async function(req, res) {
    const charts = await getAffinityCharts();

    res.send(charts)
  })

  return router
}
