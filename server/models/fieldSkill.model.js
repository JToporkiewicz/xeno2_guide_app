module.exports = (sequelize, Sequelize) => {
  const FieldSkills = sequelize.define('fieldSkill', {
    Name: { type: Sequelize.TEXT },
    CommonBladeContribution: { type: Sequelize.INTEGER },
    TotalLevel: { type: Sequelize.INTEGER },
    Type: { type: Sequelize.TEXT }
  },
  {timestamps: false, createdAt: false, updatedAt: false}
  );

  return FieldSkills;
}