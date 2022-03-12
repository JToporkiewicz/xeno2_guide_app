module.exports = (sequelize, Sequelize) => {
  const AffinityChartNode = sequelize.define('affinityChartNode', {
    Name: { type: Sequelize.TEXT },
    SkillLevel: { type: Sequelize.INTEGER },
    Effect: { type: Sequelize.TEXT },
    Available: { type: Sequelize.BOOLEAN },
    Unlocked: { type: Sequelize.BOOLEAN }
  },
  {timestamps: false, createdAt: false, updatedAt: false}
  );
    
  return AffinityChartNode;
}