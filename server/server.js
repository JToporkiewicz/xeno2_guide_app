const express = require('express')
const bodyParser = require('body-parser')
const compression = require('compression')
const cors = require('cors')
const helmet = require('helmet')

const {
    AffinityChart,
    AffinityChartBranch,
    AffinityChartNode,
    Blade,
    Driver,
    DriverArtDetails,
    DriverArts,
    DriverSkillNode,
    DriverSkillTree,
    FieldSkills,
    Heart2Heart,
    Item,
    ItemType,
    Locations,
    MajorAreas,
    MercMission,
    Monster,
    PrerequisitesACN,
    PrerequisitesBlade,
    PrerequisitesH2H,
    PrerequisitesMM,
    PrerequisitesQuests,
    RequirementsMM,
    Quest,
    QuestStep,
    QuestSubStep,
    StoryProgress,
} = require('./db')

// Import routes
const restRouter = require('./router')

// Set default port for express app
const PORT = process.env.PORT || 4001

// Create express app
const app = express()

// Apply middleware
// Note: Keep this at the top, above routes
app.use(cors())
app.use(helmet())
app.use(compression())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Implement routes
app.use('/affinityChart', restRouter(AffinityChart))
app.use('/affinityChartBranch', restRouter(AffinityChartBranch))
app.use('/affinityChartNode', restRouter(AffinityChartNode))
app.use('/blade', restRouter(Blade))
app.use('/driver', restRouter(Driver))
app.use('/driverArtDetails', restRouter(DriverArtDetails))
app.use('/driverArt', restRouter(DriverArts))
app.use('/driverSkillNode', restRouter(DriverSkillNode))
app.use('/driverSkillTree', restRouter(DriverSkillTree))
app.use('/fieldSkill', restRouter(FieldSkills))
app.use('/heart2Heart', restRouter(Heart2Heart))
app.use('/item', restRouter(Item))
app.use('/itemType', restRouter(ItemType))
app.use('/location', restRouter(Locations))
app.use('/majorArea', restRouter(MajorAreas))
app.use('/mercMission', restRouter(MercMission))
app.use('/monster', restRouter(Monster))
app.use('/prerequisitesACN', restRouter(PrerequisitesACN))
app.use('/prerequisitesBlade', restRouter(PrerequisitesBlade))
app.use('/prerequisitesH2H', restRouter(PrerequisitesH2H))
app.use('/prerequisitesMM', restRouter(PrerequisitesMM))
app.use('/prerequisitesQuest', restRouter(PrerequisitesQuests))
app.use('/requirementsMM', restRouter(RequirementsMM))
app.use('/quest', restRouter(Quest))
app.use('/questStep', restRouter(QuestStep))
app.use('/questSubStep', restRouter(QuestSubStep))
app.use('/storyProgress', restRouter(StoryProgress))

// Implement 500 error route
app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('Something is broken.')
})

// Implement 404 error route
app.use(function (req, res, next) {
  res.status(404).send('Sorry we could not find that.')
})

// Start express app
app.listen(PORT, function() {
  console.log(`Server is running on: ${PORT}`)
})