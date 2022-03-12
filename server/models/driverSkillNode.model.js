module.exports = (sequelize, Sequelize) => {
  const DriverSkillNode = sequelize.define('driverSkillNode', {
    Name: { type: Sequelize.TEXT },
    Effect: { type: Sequelize.TEXT },
    SP: { type: Sequelize.INTEGER },
    Unlocked: { type: Sequelize.BOOLEAN } },
  {timestamps: false, createdAt: false, updatedAt: false}
  );

  return DriverSkillNode;
}