module.exports = (sequelize, Sequelize) => {
  const RequirementsMM = sequelize.define('requirementsMM', {
    MissionId: { type: Sequelize.INTEGER, references: {
      model: 'mercMissions',
      key: 'id'
    } },
    Blade: { type: Sequelize.INTEGER, references: {
      model: 'blades',
      key: 'id'
    } },
    FieldSkill: { type: Sequelize.INTEGER, references: {
      model: 'fieldSkills',
      key: 'id'
    } },
    FieldSkillLevel: { type: Sequelize.INTEGER },
    Element: { type: Sequelize.TEXT },
    ElementLevel: { type: Sequelize.INTEGER },
    WeaponType: { type: Sequelize.TEXT },
    WeaponLevel: { type: Sequelize.INTEGER },
    BladeGender: { type: Sequelize.TEXT },
    BladeGenderLevel: { type: Sequelize.INTEGER },
    Humanoid: { type: Sequelize.BOOLEAN },
    HumanoidLevel: { type: Sequelize.INTEGER },
    Stats: { type: Sequelize.TEXT },
    StatsLevel: { type: Sequelize.INTEGER }
  },
  {timestamps: false, createdAt: false, updatedAt: false}
  );

  return RequirementsMM;
}