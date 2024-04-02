const updateH2H = require('./updateH2H');
const updateMonster = require('./updateMonster');
const updateACN = require('./updateACN');
const updateBlade = require('./updateBlade');
const updateMM = require('./updateMM');
const updateQuest = require('./updateQuest');
const updateFieldSkill = require('./updateFieldSkill');
const updateQuestStep = require('./updateQuestStep');
const updateChallenge = require('./updateChallenge');

const updateQueries = [
  updateH2H,
  updateMonster,
  updateACN,
  updateBlade,
  updateMM,
  updateQuest,
  updateFieldSkill,
  updateQuestStep,
  updateChallenge
]

module.exports = updateQueries;