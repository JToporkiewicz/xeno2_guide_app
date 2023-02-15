/** Customized router for the RESTful API actions **/

const express = require('express')
const Router = express.Router

module.exports = function(Model, sequelize) {
  const router = Router()
  
  router.put('/updateCommonBladeContribution', async function(req, res) {
    try {
      if (req.body && req.body.length) {
        await req.body.forEach(async (skill) => {
          await sequelize.query(`
            UPDATE xenoblade2_guide.fieldSkills
            SET CommonBladeContribution = ${skill.CommonBladeContribution}
            WHERE id = ${skill.id}`)
          await sequelize.query('CALL updateFieldSkillCommon (:skillId)',{
            replacements: {skillId: skill.id}
          })
        })
      }
    } catch (err) {
      return res.status(400).json({err: err.message})
    }
      
    res.status(200).send()
  })

  router.get('/getFieldSkills', async function(req, res) {
    const resources = await Model.findAll({ where: req.query })
    res.send(resources)
  })

  return router
}
