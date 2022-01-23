module.exports = (sequelize, Sequelize) => {
    const MajorAreas = sequelize.define('majorArea', {
        Name: { type: Sequelize.TEXT },
        DevelopmentLevel: { type: Sequelize.INTEGER },
        Located: { type: Sequelize.TEXT },
        StoryProgress: { type: Sequelize.INTEGER }
        },
        {timestamps: false, createdAt: false, updatedAt: false}
    );
    
    return MajorAreas;
}