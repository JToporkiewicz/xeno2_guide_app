module.exports = (sequelize, Sequelize) => {
    const QuestStep = sequelize.define('questStep', {
        Quest: { type: Sequelize.INTEGER, references: {
            model: 'quests',
            key: 'id'
        } },
        StepNumber: { type: Sequelize.INTEGER },
        Description: { type: Sequelize.TEXT },
        Completed: { type: Sequelize.TINYINT }
        },
        {timestamps: false, createdAt: false, updatedAt: false}
    );

    return QuestStep;
}