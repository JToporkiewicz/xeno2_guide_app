module.exports = (sequelize, Sequelize) => {
  const Locations = sequelize.define('location', {
    Location: { type: Sequelize.TEXT },
    MajorArea: { type: Sequelize.INTEGER, references: {
      model: 'majorAreas',
      key: 'id'
    } },
    Type: { type: Sequelize.TEXT },
    StoryProgress: { type: Sequelize.INTEGER },
    Mapped: { type: Sequelize.BOOLEAN }
  },
  {timestamps: false, createdAt: false, updatedAt: false}
  );

  return Locations;
}