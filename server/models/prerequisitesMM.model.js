module.exports = (sequelize, Sequelize) => {
  const PrerequisitesMM = sequelize.define('prerequisitesMM', {
    RequiredBy: { type: Sequelize.INTEGER, references: {
      model: 'mercMissions',
      key: 'id'
    } },
    Nation: { type: Sequelize.INTEGER, references: {
      model: 'majorAreas',
      key: 'id'
    } },
    LocationDevLevel: { type: Sequelize.INTEGER },
    MercLevel: { type: Sequelize.INTEGER },
    BladeUnlocked: { type: Sequelize.INTEGER, references: {
      model: 'blades',
      key: 'id'
    } },
    Quest: { type: Sequelize.INTEGER, references: {
      model: 'quests',
      key: 'id'
    } },
    QuestStatus: { type: Sequelize.TEXT },
    StoryProgress: { type: Sequelize.INTEGER },
    DLCUnlocked: { type: Sequelize.BOOLEAN },
    OtherPrerequisiteTitle: { type: Sequelize.TEXT },
    OtherPrerequisiteDetails: { type: Sequelize.TEXT },
    Progress: { type: Sequelize.TEXT }
  },
  {timestamps: false, createdAt: false, updatedAt: false}
  );

  return PrerequisitesMM;
}