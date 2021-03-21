const Sequelize = require('sequelize');

const sequelize = new Sequelize('xenoblade-2-guide-db', null, null, {
    dialect: 'sqlite',
    storage: './server/database/xenoblade-2-guide-db.sqlite'
});

sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

const AffinityChart = sequelize.define('affinityChart', {
    AffinityBranch: { type: Sequelize.INTEGER, references: {
        model: 'affinityChartBranch',
        key: 'id'
    } },
    BladeSpecialBranch1: { type: Sequelize.INTEGER, references: {
        model: 'affinityChartBranch',
        key: 'id'
    } },
    BladeSpecialBranch2: { type: Sequelize.INTEGER, references: {
        model: 'affinityChartBranch',
        key: 'id'
    } },
    BladeSpecialBranch3: { type: Sequelize.INTEGER, references: {
        model: 'affinityChartBranch',
        key: 'id'
    } },
    BattleSkillBranch1: { type: Sequelize.INTEGER, references: {
        model: 'affinityChartBranch',
        key: 'id'
    } },
    BattleSkillBranch2: { type: Sequelize.INTEGER, references: {
        model: 'affinityChartBranch',
        key: 'id'
    } },
    BattleSkillBranch3: { type: Sequelize.INTEGER, references: {
        model: 'affinityChartBranch',
        key: 'id'
    } },
    FieldSkillBranch1: { type: Sequelize.INTEGER, references: {
        model: 'affinityChartBranch',
        key: 'id'
    } },
    FieldSkillBranch2: { type: Sequelize.INTEGER, references: {
        model: 'affinityChartBranch',
        key: 'id'
    } },
    FieldSkillBranch3: { type: Sequelize.INTEGER, references: {
        model: 'affinityChartBranch',
        key: 'id'
    } } 
});

const AffinityChartBranch = sequelize.define('affinityChartBranch', {
    BranchName: { type: Sequelize.TEXT },
    NodeAffinity1: { type: Sequelize.INTEGER, references: {
        model: 'affinityChartNode',
        key: 'id'
    } },
    NodeAffinity2: { type: Sequelize.INTEGER, references: {
        model: 'affinityChartNode',
        key: 'id'
    } },
    NodeAffinity3: { type: Sequelize.INTEGER, references: {
        model: 'affinityChartNode',
        key: 'id'
    } },
    NodeAffinity4: { type: Sequelize.INTEGER, references: {
        model: 'affinityChartNode',
        key: 'id'
    } },
    NodeAffinity5: { type: Sequelize.INTEGER, references: {
        model: 'affinityChartNode',
        key: 'id'
    } }
});

const AffinityChartNode = sequelize.define('affinityChartNode', {
    Name: { type: Sequelize.TEXT },
    SkillLevel: { type: Sequelize.INTEGER },
    Effect: { type: Sequelize.BLOB },
    Prerequisites: { type: Sequelize.BLOB },
    Available: { type: Sequelize.BOOLEAN },
    Unlocked: { type: Sequelize.BOOLEAN }
});

const Blade = sequelize.define('blade', {
    Name: { type: Sequelize.TEXT },
    Gender: { type: Sequelize.TEXT },
    Type: { type: Sequelize.TEXT },
    Weapon: { type: Sequelize.TEXT },
    Element: { type: Sequelize.TEXT },
    Role: { type: Sequelize.TEXT },
    AuxCoreCount: { type: Sequelize.INTEGER },
    Source: { type: Sequelize.TEXT },
    Heart2Heart: { type: Sequelize.TEXT, references: {
        model: 'heart2Heart',
        key: 'Title'
    } },
    BladeQuest: { type: Sequelize.TEXT, references: {
        model: 'quest',
        key: 'Name'
    } },
    AffinityChart: { type: Sequelize.INTEGER, references: {
        model: 'affinityChart',
        key: 'id'
    } },
    FavItem1: { type: Sequelize.TEXT, references: {
        model: 'item',
        key: 'Name'
    } },
    FavItem2: { type: Sequelize.TEXT, references: {
        model: 'item',
        key: 'Name'
    } },
    FavItemType1: { type: Sequelize.TEXT, references: {
        model: 'item',
        key: 'ItemType'
    } },
    FavItemType2: { type: Sequelize.TEXT, references: {
        model: 'item',
        key: 'ItemType'
    } },
    Unlocked: { type: Sequelize.BOOLEAN },
    Available: { type: Sequelize.BOOLEAN },
    Prerequisites: { type: Sequelize.BLOB }
});

const Heart2Heart = sequelize.define('heart2Heart', {
    Title: { type: Sequelize.TEXT },
    Location: { type: Sequelize.TEXT },
    Area: { type: Sequelize.TEXT },
    Prerequisites: { type: Sequelize.BLOB },
    Who: { type: Sequelize.TEXT },
    Outcomes: { type: Sequelize.BLOB }
});

const Item = sequelize.define('item', {
    Name: { type: Sequelize.TEXT },
    ItemType: { type: Sequelize.TEXT, references: {
        model: 'item',
        key: 'ItemType'
    } },
    Source: { type: Sequelize.BLOB },
    Location: { type: Sequelize.TEXT },
    Area: { type: Sequelize.BLOB },
    Price: { type: Sequelize.INTEGER },
    FavoriteOf: { type: Sequelize.TEXT },
    Effects: { type: Sequelize.BLOB }
});

const ItemType = sequelize.define('itemType', {
    ItemType: { type: Sequelize.TEXT }
});

const Monster = sequelize.define('monster', {
    Name: { type: Sequelize.TEXT },
    Type: { type: Sequelize.TEXT },
    LowestLevel: { type: Sequelize.INTEGER },
    HighestLevel: { type: Sequelize.INTEGER },
    Location: { type: Sequelize.TEXT },
    Area: { type: Sequelize.BLOB },
    SpawnCondition: { type: Sequelize.BLOB },
    Drops: { type: Sequelize.BLOB }
});

const Quest = sequelize.define('quest', {
    Name: { type: Sequelize.TEXT },
    Type: { type: Sequelize.TEXT },
    Client: { type: Sequelize.TEXT },
    Location: { type: Sequelize.TEXT },
    Area: { type: Sequelize.TEXT },
    Prerequisites: { type: Sequelize.BLOB },
    Objectives: { type: Sequelize.BLOB },
    Rewards: { type: Sequelize.BLOB }
});

const StoryProgress = sequelize.define('storyProgress', {
    OnlyShowAvailable: { type: Sequelize.BOOLEAN },
    Chapter: { type: Sequelize.INTEGER },
    UnlockedArea: { type: Sequelize.TEXT }
});

AffinityChart.sync()
AffinityChartBranch.sync()
AffinityChartNode.sync()
Blade.sync()
Heart2Heart.sync()
Item.sync()
ItemType.sync()
Monster.sync()
Quest.sync()
StoryProgress.sync()

module.exports = {
    AffinityChart,
    AffinityChartBranch,
    AffinityChartNode,
    Blade,
    Heart2Heart,
    Item,
    ItemType,
    Monster,
    Quest,
    StoryProgress
}