module.exports = (sequelize, Sequelize) => {
  const PrerequisitesH2H = sequelize.define('prerequisitesH2H', {
    RequiredBy: { type: Sequelize.INTEGER, references: {
      model: 'heart2Hearts',
      key: 'id'
    } },
    StoryProgress: { type: Sequelize.INTEGER },
    NewGamePlus: { type: Sequelize.BOOLEAN },
    DLCUnlocked: { type: Sequelize.BOOLEAN },
    BladeAffinityChartNode: { type: Sequelize.INTEGER, references: {
      model: 'affinityChartNodes',
      key: 'id'
    } },
    FieldSkill1: { type: Sequelize.INTEGER, references: {
      model: 'fieldSkills',
      key: 'id'
    } },
    FieldSkill1Level: { type: Sequelize.INTEGER },
    FieldSkill2: { type: Sequelize.INTEGER, references: {
      model: 'fieldSkills',
      key: 'id'
    } },
    FieldSkill2Level: { type: Sequelize.INTEGER },
    Quest: { type: Sequelize.INTEGER, references: {
      model: 'quests',
      key: 'id'
    } },
    StayAtAnInn: { type: Sequelize.TEXT },
    InnLocation: { type: Sequelize.INTEGER, references: {
      model: 'majorAreas',
      key: 'id'
    } }
  },
  {timestamps: false, createdAt: false, updatedAt: false}
  );

  return PrerequisitesH2H;
}