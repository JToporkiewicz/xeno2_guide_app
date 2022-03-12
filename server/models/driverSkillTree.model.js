module.exports = (sequelize, Sequelize) => {
  const DriverSkillTree = sequelize.define('driverSkillTree', {
    Tier1Branch1: { type: Sequelize.INTEGER, references: {
      model: 'driverSkillNodes',
      key: 'id'
    } }, 
    Tier1Branch2:{ type: Sequelize.INTEGER, references: {
      model: 'driverSkillNodes',
      key: 'id'
    } }, 
    Tier1Branch3: { type: Sequelize.INTEGER, references: {
      model: 'driverSkillNodes',
      key: 'id'
    } }, 
    Tier1Branch4: { type: Sequelize.INTEGER, references: {
      model: 'driverSkillNodes',
      key: 'id'
    } }, 
    Tier1Branch5: { type: Sequelize.INTEGER, references: {
      model: 'driverSkillNodes',
      key: 'id'
    } }, 
    Tier2Branch1: { type: Sequelize.INTEGER, references: {
      model: 'driverSkillNodes',
      key: 'id'
    } }, 
    Tier2Branch2: { type: Sequelize.INTEGER, references: {
      model: 'driverSkillNodes',
      key: 'id'
    } }, 
    Tier2Branch3: { type: Sequelize.INTEGER, references: {
      model: 'driverSkillNodes',
      key: 'id'
    } }, 
    Tier2Branch4: { type: Sequelize.INTEGER, references: {
      model: 'driverSkillNodes',
      key: 'id'
    } }, 
    Tier2Branch5: { type: Sequelize.INTEGER, references: {
      model: 'driverSkillNodes',
      key: 'id'
    } }, 
    Tier3Branch1: { type: Sequelize.INTEGER, references: {
      model: 'driverSkillNodes',
      key: 'id'
    } }, 
    Tier3Branch2: { type: Sequelize.INTEGER, references: {
      model: 'driverSkillNodes',
      key: 'id'
    } }, 
    Tier3Branch3: { type: Sequelize.INTEGER, references: {
      model: 'driverSkillNodes',
      key: 'id'
    } }, 
    Tier3Branch4: { type: Sequelize.INTEGER, references: {
      model: 'driverSkillNodes',
      key: 'id'
    } }, 
    Tier3Branch5: { type: Sequelize.INTEGER, references: {
      model: 'driverSkillNodes',
      key: 'id'
    } } },
  {timestamps: false, createdAt: false, updatedAt: false}
  );

  return DriverSkillTree;
}