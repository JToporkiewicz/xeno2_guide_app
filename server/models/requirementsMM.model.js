module.exports = (sequelize, Sequelize) => {
  const RequirementsMM = sequelize.define('requirementsMM', {
    Blade: { type: Sequelize.INTEGER, references: {
      model: 'blades',
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
    FieldSkill3: { type: Sequelize.INTEGER, references: {
      model: 'fieldSkills',
      key: 'id'
    } },
    FieldSkill3Level: { type: Sequelize.INTEGER }
  },
  {timestamps: false, createdAt: false, updatedAt: false}
  );

  return RequirementsMM;
}