module.exports = (sequelize, Sequelize) => {
  const Monster = sequelize.define('monster', {
    Name: { type: Sequelize.TEXT },
    Category: { type: Sequelize.TEXT },
    Type: { type: Sequelize.INTEGER, references: {
      model: 'monsterTypes',
      key: 'id'
    } },
    IsDriver: { type: Sequelize.BOOLEAN },
    LowestLevel: { type: Sequelize.INTEGER },
    HighestLevel: { type: Sequelize.INTEGER },
    Location: { type: Sequelize.INTEGER, references: {
      model: 'locations',
      key: 'id'
    } },
    DLCRequired: { type: Sequelize.BOOLEAN },
    SpawnCondition: { type: Sequelize.TEXT },
    Drops: { type: Sequelize.TEXT },
    Available: { type: Sequelize.BOOLEAN },
    Beaten: { type: Sequelize.BOOLEAN }},
  {timestamps: false, createdAt: false, updatedAt: false}
  );

  return Monster;
}