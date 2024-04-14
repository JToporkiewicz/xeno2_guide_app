module.exports = (sequelize, Sequelize) => {
  const ChallengeBattle = sequelize.define('challengeBattle', {
    Name: { type: Sequelize.TEXT },
    Difficulty: { type: Sequelize.TEXT },
    TimeLimit: { type: Sequelize.TEXT },
    Waves: { type: Sequelize. INTEGER },
    MaxLv: { type: Sequelize.INTEGER },
    BladePowers: { type: Sequelize.BOOLEAN },
    DriverRestrictions: { type: Sequelize.TEXT },
    Available: { type: Sequelize.BOOLEAN },
    Beaten: { type: Sequelize.BOOLEAN },
  },
  {timestamps: false, createdAt: false, updatedAt: false})

  return ChallengeBattle;
}