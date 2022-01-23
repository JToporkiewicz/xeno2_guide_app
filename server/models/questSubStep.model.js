module.exports = (sequelize, Sequelize) => {
    const QuestSubStep = sequelize.define('questSubStep', {
        QuestStep: { type: Sequelize.INTEGER, references: {
            model: 'questSteps',
            key: 'id'
        } },
        SubStepNumber: { type: Sequelize.INTEGER },
        Description: { type: Sequelize.TEXT },
        CompleteSideQuest: {
            type: Sequelize.INTEGER,
            allowNull: true,
            references: {
                model: 'quests',
                key: 'id'
            }
        },
        DefeatMonster: {
            type: Sequelize.INTEGER,
            allowNull: true,
            references: {
                model: 'monsters',
                key: 'id'
            }
        },
        CollectItem: {
            type: Sequelize.INTEGER,
            allowNull: true,
            references: {
                model: 'items',
                key: 'id'
            }
        },
        Count: { type: Sequelize.INTEGER },
        CompletionProgress: { type: Sequelize.TINYINT }
        },
        {timestamps: false, createdAt: false, updatedAt: false}
    );

    return QuestSubStep
}