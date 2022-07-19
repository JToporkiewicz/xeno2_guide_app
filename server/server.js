const express = require('express');
const cors = require('cors');

const app = express();
const corsOptions = {
  origin: true
};

app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

const db = require('./models');
const restRouter = require('./routers/defaultRouter');
const storyProgressRestRouter = require('./routers/storyProgressRestRouter');
const affinityChartNodesRouter = require('./routers/affinityChartNodesRouter')
const bladesRouter = require('./routers/bladesRouter');
const heart2HeartRouter = require('./routers/heart2HeartRouter');
const mercMissionRouter = require('./routers/mercMissionRouter');
const questRouter = require('./routers/questRouter');
const questStepRouter = require('./routers/questStepRouter');
const questSubStepRouter = require('./routers/questSubStepRouter');
const fieldSkillRouter = require('./routers/fieldSkillRouter');
const monsterRouter = require('./routers/monsterRouter');

// const table = require('./storedProcedures');
const { sequelize } = require('./models');
db.sequelize.sync();
// for(var i = 0; i < table.length; i++) {
//   for(var j = 0; j < table[i].length; j++){
//     db.sequelize.query('DROP PROCEDURE IF EXISTS ' + table[i][j].name)
//     db.sequelize.query(table[i][j].query)
//   }
// }

app.get('/', (req, res) => {
  res.json({ message: 'database works' })
})

// Implement routes
app.use('/affinityChart', restRouter(db.affinityChart))
app.use('/affinityChartBranch', restRouter(db.affinityChartBranch))
app.use('/affinityChartNode', affinityChartNodesRouter(db.affinityChartNode, sequelize))
app.use('/blade', bladesRouter(db.blade, sequelize))
app.use('/driver', restRouter(db.driver))
app.use('/driverArtDetails', restRouter(db.driverArtDetail))
app.use('/driverArt', restRouter(db.driverArt))
app.use('/driverSkillNode', restRouter(db.driverSkillNode))
app.use('/driverSkillTree', restRouter(db.driverSkillTree))
app.use('/fieldSkill', fieldSkillRouter(db.fieldSkill, sequelize))
app.use('/heart2Heart', heart2HeartRouter(db.heart2Heart, sequelize))
app.use('/item', restRouter(db.item))
app.use('/itemType', restRouter(db.itemType))
app.use('/location', restRouter(db.location))
app.use('/majorArea', restRouter(db.majorArea))
app.use('/mercMission', mercMissionRouter(db.mercMission, sequelize))
app.use('/monster', monsterRouter(db.monster, sequelize))
app.use('/prerequisitesACN', restRouter(db.prerequisitesACN))
app.use('/prerequisitesBlade', restRouter(db.prerequisitesBlade))
app.use('/prerequisitesH2H', restRouter(db.prerequisitesH2H))
app.use('/prerequisitesMM', restRouter(db.prerequisitesMM))
app.use('/prerequisitesQuest', restRouter(db.prerequisitesQuest))
app.use('/requirementsMM', restRouter(db.requirementsMM))
app.use('/quest', questRouter(db.quest, sequelize))
app.use('/questStep', questStepRouter(db.questStep, sequelize))
app.use('/questSubStep', questSubStepRouter(db.questSubStep, sequelize))
app.use('/storyProgress', storyProgressRestRouter(db.storyProgress, sequelize))

app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('Something is broken.')
})

// Implement 404 error route
app.use(function (req, res, next) {
  res.status(404).send('Sorry we could not find that.')
})

const PORT = process.env.PORT || 4001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
