const express = require('express')
const Router = express.Router
const { sequelize } = require('../models')
const Sequelize = require('sequelize');

module.exports = function() {
  const router = Router()

  const getChallengePrerequisites = async function() {
    const challengePres = await sequelize.query(`
      SELECT
        pre.*,
        mon.Name as MonName,
        chall.Name as ChallengeName
        FROM xenoblade2_guide.prerequisitesChallenges as pre
        LEFT JOIN xenoblade2_guide.monsters as mon
          ON pre.UniqueMonster = mon.id
        LEFT JOIN xenoblade2_guide.challengeBattles as chall
          ON pre.Challenge = chall.id`,
    { type: Sequelize.QueryTypes.SELECT })
    const mappedPre = challengePres.reduce((list, pre) => {
      const reqs = [];

      if (pre.Chapter) {
        reqs.push({
          area: 'Story Progress',
          requirement: 'Chapter ' + pre.Chapter,
          requirementCount: pre.Chapter
        })
      }

      if (pre.NewGamePlus) {
        reqs.push({
          area: 'New Game Plus',
          requirement: pre.NewGamePlus === 1
        })
      }

      if (pre.UniqueMonster) {
        reqs.push({
          area: 'Monster',
          requirement: pre.MonName,
          reqId: pre.UniqueMonster
        })
      }

      if (pre.Challenge) {
        reqs.push({
          area: 'Challenge',
          requirement: pre.ChallengeName,
          reqId: pre.Challenge
        })
      }

      if (pre.Other) {
        reqs.push({
          area: 'Other',
          requirement: pre.Other
        })
      }

      return {
        ...list,
        [pre.RequiredBy]: (list[pre.RequiredBy] || []).concat(reqs)
      }
    }, {})

    return mappedPre;
  }
  const getChallengeBattles = async function() {
    const cb = await sequelize.query(
      `SELECT
      cb.*
      FROM xenoblade2_guide.challengeBattles as cb`,
      { type: Sequelize.QueryTypes.SELECT }
    )

    const challengePre = await getChallengePrerequisites();

    const mappedCB = cb.map((c) => ({
      ...c,
      Beaten: c.Beaten === 1,
      Prerequisites: challengePre[c.id] || undefined
    }))

    return mappedCB
  }

  router.get('/getChallengeBattles', async function(_, res) {
    const resources = await getChallengeBattles()
    res.send(resources)
  })

  router.put('/updateChallengeBattle', async function(req, res) {
    try {
      if (req.body.unlocked && req.body.unlocked.length > 0) {
        await sequelize.query(`
        UPDATE xenoblade2_guide.challengeBattles
        SET Beaten = 1
        WHERE id IN (${req.body.unlocked.join(', ')})`)
      }
      if (req.body.locked && req.body.locked.length > 0) {
        await sequelize.query(`
        UPDATE xenoblade2_guide.challengeBattles
        SET Beaten = 0
        WHERE id IN (${req.body.locked.join(', ')})`)
      }
      await sequelize.query('CALL updateChallenge()');
    } catch (err) {
      return res.status(400).json({err: err.message})
    }
    res.status(200).send()
  })

  return router
}