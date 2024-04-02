module.exports = (sequelize, Sequelize) => {
  const PrerequisitesChallenge = sequelize.define('prerequisitesChallenge', {
    RequiredBy: { type: Sequelize.INTEGER, references: {
      model: 'challengeBattles',
      key: 'id'
    } },
    UniqueMonster: { type: Sequelize.INTEGER, references: {
      model: 'monsters',
      key: 'id'
    } },
    Chapter: { type: Sequelize.INTEGER },
    NewGamePlus: { type: Sequelize.BOOLEAN },
    Challenge: {  type: Sequelize.INTEGER, references: {
      model: 'challengeBattles',
      key: 'id'
    } },
    Other: { type: Sequelize.TEXT }
  },
  {timestamps: false, createdAt: false, updatedAt: false})

  return PrerequisitesChallenge
}