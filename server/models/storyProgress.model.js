module.exports = (sequelize, Sequelize) => {
  const StoryProgress = sequelize.define('storyProgress', {
    OnlyShowAvailable: { type: Sequelize.BOOLEAN },
    Chapter: { type: Sequelize.INTEGER },
    NewGamePlus: { type: Sequelize.BOOLEAN },
    AreaWeather: { type: Sequelize.TEXT },
    DLCUnlocked: { type: Sequelize.BOOLEAN },
    MercLevel: { type: Sequelize.INTEGER }
  },
  {timestamps: false, createdAt: false, updatedAt: false}
  );

  return StoryProgress;
}