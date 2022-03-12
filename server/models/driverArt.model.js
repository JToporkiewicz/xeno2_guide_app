module.exports = (sequelize, Sequelize) => {
  const DriverArts = sequelize.define('driverArt', {
    Name: { type: Sequelize.TEXT },
    Driver: { type: Sequelize.INTEGER, references: {
      model: 'drivers',
      key: 'id'
    } },
    WeaponType: { type: Sequelize.TEXT },
    Effect: { type: Sequelize.TEXT },
    Target: { type: Sequelize.TEXT },
    Type: { type: Sequelize.TEXT },
    LevelUnlocked: { type: Sequelize.INTEGER },
    Level1: { type: Sequelize.INTEGER, references: {
      model: 'driverArtDetails',
      key: 'id'
    } },
    Level2: { type: Sequelize.INTEGER, references: {
      model: 'driverArtDetails',
      key: 'id'
    } },
    Level3: { type: Sequelize.INTEGER, references: {
      model: 'driverArtDetails',
      key: 'id'
    } },
    Level4: { type: Sequelize.INTEGER, references: {
      model: 'driverArtDetails',
      key: 'id'
    } },
    Level5: { type: Sequelize.INTEGER, references: {
      model: 'driverArtDetails',
      key: 'id'
    } },
    Level5MaxAffinity: { type: Sequelize.INTEGER, references: {
      model: 'driverArtDetails',
      key: 'id'
    } } },
  {timestamps: false, createdAt: false, updatedAt: false}
  );

  return DriverArts;
}