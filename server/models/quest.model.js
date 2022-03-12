module.exports = (sequelize, Sequelize) => {
  const Quest = sequelize.define('quest', {
    Name: { type: Sequelize.TEXT },
    Type: { type: Sequelize.TEXT },
    Client: { type: Sequelize.TEXT },
    Location: { type: Sequelize.INTEGER, references: {
      model: 'locations',
      key: 'id'
    } },
    Rewards: { type: Sequelize.TEXT },
    Available: { type: Sequelize.TINYINT },
    Status: { type: Sequelize.TEXT }},
  {timestamps: false, createdAt: false, updatedAt: false}
  );

  return Quest;
}