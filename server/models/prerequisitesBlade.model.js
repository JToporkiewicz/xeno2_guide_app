module.exports = (sequelize, Sequelize) => {
  const PrerequisitesBlade = sequelize.define('prerequisitesBlade', {
    RequiredBy: { type: Sequelize.INTEGER, references: {
      model: 'blades',
      key: 'id'
    } },
    StoryProgress: { type: Sequelize.INTEGER },
    NewGamePlus: { type: Sequelize.BOOLEAN },
    DLCUnlocked: { type: Sequelize.BOOLEAN },
    SideQuest: { type: Sequelize.INTEGER, references: {
      model: 'quests',
      key: 'id'
    } },
    Monster: { type: Sequelize.INTEGER, references: {
      model: 'monsters',
      key: 'id'
    } },
    Location: { type: Sequelize.INTEGER, references: {
      model: 'locations',
      key: 'id'
    } },
    OtherDetails: { type: Sequelize.TEXT },
  },
  {timestamps: false, createdAt: false, updatedAt: false}
  );

  return PrerequisitesBlade;
}