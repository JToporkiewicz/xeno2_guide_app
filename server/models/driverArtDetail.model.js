module.exports = (sequelize, Sequelize) => {
  const DriverArtDetails = sequelize.define('driverArtDetail', {
    SP: { type: Sequelize.INTEGER },
    Damage: { type: Sequelize.INTEGER },
    EffectPotency: { type: Sequelize.TEXT },
    Recharge: { type: Sequelize.TEXT }},
  {timestamps: false, createdAt: false, updatedAt: false}
  );
    
  return DriverArtDetails;
}