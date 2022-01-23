module.exports = (sequelize, Sequelize) => {
    const Blade = sequelize.define('blade', {
        Name: { type: Sequelize.TEXT },
        Gender: { type: Sequelize.TEXT },
        Type: { type: Sequelize.TEXT },
        Weapon: { type: Sequelize.TEXT },
        Element: { type: Sequelize.TEXT },
        Role: { type: Sequelize.TEXT },
        AuxCoreCount: { type: Sequelize.INTEGER },
        Source: { type: Sequelize.TEXT },
        Heart2Heart: {
            type: Sequelize.INTEGER,
            allowNull: true,
            references: {
                model: 'heart2Hearts',
                key: 'id'
            }
        },
        BladeQuest: {
            type: Sequelize.INTEGER,
            allowNull: true,
            references: {
                model: 'quests',
                key: 'id'
            }
        },
        AffinityChart: { type: Sequelize.INTEGER, references: {
            model: 'affinityCharts',
            key: 'id'
        } },
        FavItem1: { type: Sequelize.INTEGER, references: {
            model: 'items',
            key: 'id'
        } },
        FavItem2: { type: Sequelize.INTEGER, references: {
            model: 'items',
            key: 'id'
        } },
        FavItemType1: { type: Sequelize.INTEGER, references: {
            model: 'itemTypes',
            key: 'id'
        } },
        FavItemType2: { type: Sequelize.INTEGER, references: {
            model: 'itemTypes',
            key: 'id'
        } },
        Unlocked: { type: Sequelize.BOOLEAN },
        Available: { type: Sequelize.BOOLEAN }
        },
        {timestamps: false, createdAt: false, updatedAt: false}
    );

    return Blade;
}