const express = require("express");
const cors = require("cors");

const app = express();
const corsOptions = {
    origin: "http://localhost:3000"
};

app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

const db = require('./models');
const restRouter = require('./router')

app.get('/', (req, res) => {
    res.json({ message: 'database works' })
})

// Implement routes
app.use('/affinityChart', restRouter(db.affinityChart))
app.use('/affinityChartBranch', restRouter(db.affinityChartBranch))
app.use('/affinityChartNode', restRouter(db.affinityChartNode))
app.use('/blade', restRouter(db.blade))
app.use('/driver', restRouter(db.driver))
app.use('/driverArtDetails', restRouter(db.driverArtDetail))
app.use('/driverArt', restRouter(db.driverArt))
app.use('/driverSkillNode', restRouter(db.driverSkillNode))
app.use('/driverSkillTree', restRouter(db.driverSkillTree))
app.use('/fieldSkill', restRouter(db.fieldSkills))
app.use('/heart2Heart', restRouter(db.heart2Heart))
app.use('/item', restRouter(db.item))
app.use('/itemType', restRouter(db.itemType))
app.use('/location', restRouter(db.location))
app.use('/majorArea', restRouter(db.majorArea))
app.use('/mercMission', restRouter(db.mercMission))
app.use('/monster', restRouter(db.monster))
app.use('/prerequisitesACN', restRouter(db.prerequisitesACN))
app.use('/prerequisitesBlade', restRouter(db.prerequisitesBlade))
app.use('/prerequisitesH2H', restRouter(db.prerequisitesH2H))
app.use('/prerequisitesMM', restRouter(db.prerequisitesMM))
app.use('/prerequisitesQuest', restRouter(db.prerequisitesQuest))
app.use('/requirementsMM', restRouter(db.requirementsMM))
app.use('/quest', restRouter(db.quest))
app.use('/questStep', restRouter(db.questStep))
app.use('/questSubStep', restRouter(db.questSubStep))
app.use('/storyProgress', restRouter(db.storyProgress))

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
