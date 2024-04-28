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
const bladesRouter = require('./routers/bladesRouter');
const driversRouter = require('./routers/driversRouter');
const heart2HeartRouter = require('./routers/heart2HeartRouter');
const mercMissionRouter = require('./routers/mercMissionRouter');
const questRouter = require('./routers/questRouter');
const fieldSkillRouter = require('./routers/fieldSkillRouter');
const monsterRouter = require('./routers/monsterRouter');
const itemRouter = require('./routers/itemRouter');
const challengeRouter = require('./routers/challengeRouter');
const locationRouter = require('./routers/locationRouter');

// const table = require('./storedProcedures');
const { sequelize } = require('./models');
// db.sequelize.sync({ alter: true });
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
app.use('/blade', bladesRouter())
app.use('/driver', driversRouter())
app.use('/fieldSkill', fieldSkillRouter(db.fieldSkill, sequelize))
app.use('/heart2Heart', heart2HeartRouter())
app.use('/item', itemRouter())
app.use('/location', locationRouter())
app.use('/majorArea', restRouter(db.majorArea))
app.use('/mercMission', mercMissionRouter())
app.use('/monster', monsterRouter())
app.use('/quest', questRouter())
app.use('/storyProgress', storyProgressRestRouter(db.storyProgress, sequelize))
app.use('/challengeBattle', challengeRouter())

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
