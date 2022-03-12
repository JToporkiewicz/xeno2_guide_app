module.exports = (sequelize, Sequelize) => {
  const Driver = sequelize.define('driver', {
    Name: { type: Sequelize.TEXT },
    ChapterUnlocked: { type: Sequelize.INTEGER },
    DriverSkillTree: { type: Sequelize.INTEGER, references: {
      model: 'driverSkillTrees',
      key: 'id'
    } },
    HiddenSkillTree: { type: Sequelize.INTEGER, references: {
      model: 'driverSkillTrees',
      key: 'id'
    } },
    Heart2Hearts: { type: Sequelize.TEXT },
    FavItem1: { type: Sequelize.INTEGER, references: {
      model: 'items',
      key: 'id'
    } },
    FavItem2: { type: Sequelize.INTEGER, references: {
      model: 'items',
      key: 'id'
    } },
    FavItemType1: { type: Sequelize.INTEGER, references: {
      model: 'itemTypes',
      key: 'id'
    } },
    FavItemType2: { type: Sequelize.INTEGER, references: {
      model: 'itemTypes',
      key: 'id'
    } },
    IdeaStats: { type: Sequelize.TEXT }
  },
  {timestamps: false, createdAt: false, updatedAt: false}
  );

  return Driver;
}