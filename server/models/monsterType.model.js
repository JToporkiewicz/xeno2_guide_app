module.exports = (sequelize, Sequelize) => {
  const MonsterType = sequelize.define('monsterType', {
    MonsterType: { type: Sequelize.TEXT }
  },
  {timestamps: false, createdAt: false, updatedAt: false}
  );

  return MonsterType;
}