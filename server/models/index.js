const dbConfig = require('../db.config.js');

const Sequelize = require('sequelize');
const sequelizeDB = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelizeDB;

db.majorArea = require('./majorArea.model')(sequelizeDB, Sequelize);
db.location = require('./location.model')(sequelizeDB, Sequelize);
db.itemType = require('./itemType.model')(sequelizeDB, Sequelize);
db.item = require('./item.model')(sequelizeDB, Sequelize);
db.quest = require('./quest.model')(sequelizeDB, Sequelize);
db.affinityChartNode = require('./affinityChartNode.model')(sequelizeDB, Sequelize);
db.affinityChartBranch = require('./affinityChartBranch.model')(sequelizeDB, Sequelize);
db.affinityChart = require('./affinityChart.model.js')(sequelizeDB, Sequelize);
db.heart2Heart = require('./heart2heart.module')(sequelizeDB, Sequelize);
db.blade = require('./blade.model')(sequelizeDB, Sequelize);
db.driverSkillNode = require('./driverSkillNode.model')(sequelizeDB, Sequelize);
db.driverSkillTree = require('./driverSkillTree.model')(sequelizeDB, Sequelize);
db.driver = require('./driver.model')(sequelizeDB, Sequelize);
db.driverArtDetail = require('./driverArtDetail.model')(sequelizeDB, Sequelize);
db.driverArt = require('./driverArt.model')(sequelizeDB, Sequelize);
db.fieldSkill = require('./fieldSkill.model')(sequelizeDB, Sequelize);
db.requirementsMM = require('./requirementsMM.model')(sequelizeDB, Sequelize);
db.mercmission = require('./mercMission.model')(sequelizeDB, Sequelize);
db.monster = require('./monster.model')(sequelizeDB, Sequelize);
db.monsterType = require('./monsterType.model')(sequelizeDB, Sequelize);
db.prerequisitesACN = require('./prerequisitesACN.model')(sequelizeDB, Sequelize);
db.prerequisitesBlade = require('./prerequisitesBlade.model')(sequelizeDB, Sequelize);
db.prerequisitesH2H = require('./prerequisitesH2H.model')(sequelizeDB, Sequelize);
db.prerequisitesMM = require('./prerequisitesMM.model')(sequelizeDB, Sequelize);
db.questStep = require('./questStep.model')(sequelizeDB, Sequelize);
db.questSubStep = require('./questSubStep.model')(sequelizeDB, Sequelize);
db.prerequisitesQuest = require('./prerequisitesQuest.model')(sequelizeDB, Sequelize);
db.storyProgress = require('./storyProgress.model')(sequelizeDB, Sequelize);

module.exports = db;