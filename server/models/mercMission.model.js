module.exports = (sequelize, Sequelize) => {
  const MercMission = sequelize.define('mercMission', {
    Name: { type: Sequelize.TEXT },
    MissionNation: { type: Sequelize.INTEGER, references: {
      model: 'majorAreas',
      key: 'id'
    } },
    Giver: { type: Sequelize.TEXT },
    GiverLocation: { type: Sequelize.INTEGER, references: {
      model: 'locations',
      key: 'id'
    } },
    Duration: { type: Sequelize.TEXT },
    Type: { type: Sequelize.TEXT },
    Completed: { type: Sequelize.BOOLEAN },
    Available: { type: Sequelize.BOOLEAN }
  },
  {timestamps: false, createdAt: false, updatedAt: false}
  );

  return MercMission;
}