module.exports = (sequelize, Sequelize) => {
  const PrerequisitesACN = sequelize.define('prerequisitesACN', {
    RequiredBy: { type: Sequelize.INTEGER, references: {
      model: 'affinityChartNodes',
      key: 'id'
    } },
    OtherPrerequisiteName: { type: Sequelize.TEXT },
    OtherPrerequisiteDetail: { type: Sequelize.INTEGER },
    StoryProgress: { type: Sequelize.INTEGER },
    DLCRequired: { type: Sequelize.BOOLEAN },
    Location: { type: Sequelize.INTEGER, references: {
      model: 'locations',
      key: 'id'
    } },
    Heart2HeartTitle: { type: Sequelize.INTEGER, references: {
      model: 'heart2Hearts',
      key: 'id'
    } },
    SideQuest: { type: Sequelize.INTEGER, references: {
      model: 'quests',
      key: 'id'
    } },
    MercMissionTitle: { type: Sequelize.INTEGER, references: {
      model: 'mercMissions',
      key: 'id'
    } },
    MonsterTitle: { type: Sequelize.INTEGER, references: {
      model: 'monsters',
      key: 'id'
    } },
    MonsterType: { type: Sequelize.INTEGER, references: {
      model: 'monsterTypes',
      key: 'id'
    } },
    AffinityChartNode: { type: Sequelize.INTEGER, references: {
      model: 'affinityChartNodes',
      key: 'id'
    } },
    PouchItemType: { type: Sequelize.INTEGER, references: {
      model: 'itemTypes',
      key: 'id'
    } },
    PouchItem: { type: Sequelize.INTEGER, references: {
      model: 'items',
      key: 'id'
    } },
    Progress: { type: Sequelize.INTEGER }
  },
  {timestamps: false, createdAt: false, updatedAt: false}
  );

  return PrerequisitesACN;
}