module.exports = (sequelize, Sequelize) => {
    const PrerequisitesQuests = sequelize.define('prerequisitesQuest', {
        RequiredBy: { type: Sequelize.INTEGER, references: {
            model: 'quests',
            key: 'id'
        }},
        Location: { type: Sequelize.INTEGER, references: {
            model: 'locations',
            key: 'id'
        } },
        StoryProgress: { type: Sequelize.INTEGER },
        NewGamePlus: { type: Sequelize.BOOLEAN },
        DLCUnlocked: { type: Sequelize.BOOLEAN },
        MercMission: { type: Sequelize.INTEGER, references: {
            model: 'mercMissions',
            key: 'id'
        } },
        Heart2Heart: { type: Sequelize.INTEGER, references: {
            model: 'heart2Hearts',
            key: 'id'
        } },
        BladeUnlocked: { type: Sequelize.INTEGER, references: {
            model: 'blades',
            key: 'id'
        } },
        BladeAffinityChartNode: { type: Sequelize.INTEGER, references: {
            model: 'affinityChartNodes',
            key: 'id'
        } },
        Quest: { type: Sequelize.INTEGER, references: {
            model: 'quests',
            key: 'id'
        } },
        OtherPrerequisiteDetail: { type: Sequelize.TEXT }
     },
        {timestamps: false, createdAt: false, updatedAt: false}
    );

    return PrerequisitesQuests;
}