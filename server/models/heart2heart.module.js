module.exports = (sequelize, Sequelize) => {
  const Heart2Heart = sequelize.define('heart2Heart', {
    Title: { type: Sequelize.TEXT },
    Location: { type: Sequelize.INTEGER, references: {
      model: 'locations',
      key: 'id'
    } },
    Who: { type: Sequelize.TEXT },
    Outcomes: { type: Sequelize.TEXT },
    Available: { type: Sequelize.BOOLEAN },
    Viewed: { type: Sequelize.BOOLEAN }},
  {timestamps: false, createdAt: false, updatedAt: false}
  );

  return Heart2Heart;
}