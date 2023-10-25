/** Customized router for the RESTful API actions **/

const express = require('express')
const Router = express.Router
const { sequelize } = require('../models')
const Sequelize = require('sequelize');

module.exports = function() {
  const router = Router()

  router.get('/getAllItems', async function(_, res) {
    const items = await sequelize.query(
      `SELECT
      item.id,
      item.Name,
      it.ItemType,
      it.id as itID,
      item.Source,
      loc.Location,
      ma.Name as maName,
      ma.Located as maLoc,
      item.Price,
      item.FavoriteOf,
      item.Effects
      FROM xenoblade2_guide.items as item
      LEFT JOIN xenoblade2_guide.itemTypes as it
        ON item.ItemType = it.id
      LEFT JOIN xenoblade2_guide.locations as loc
        ON item.Location = loc.id
      LEFT JOIN xenoblade2_guide.majorAreas as ma
        ON loc.MajorArea = ma.id`,
      { type: Sequelize.QueryTypes.SELECT })


    const mappedItems = items.map((i) => ({
      id:i.id,
      Name:i.Name,
      ItemTypeID:i.itID,
      ItemType:i.ItemType,
      Area:`(${i.maLoc} -> ${i.maName})`,
      Location:i.Location,
      Source:i.Source,
      Price:i.Price,
      FavoriteOf:i.FavoriteOf,
      ...JSON.parse(i.Effects)
    }))

    res.send(mappedItems)
  })

  router.get('/getItemTypes', async function(_, res) {
    const resources = await sequelize.query(
      'SELECT * FROM xenoblade2_guide.itemTypes',
      { type: Sequelize.QueryTypes.SELECT })
    res.send(resources)
  })

  return router
}
