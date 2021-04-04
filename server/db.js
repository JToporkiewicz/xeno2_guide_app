const Sequelize = require('sequelize');

const sequelize = new Sequelize('xenoblade-2-guide-db',
{define: { freezeTableName: true }},
null,
{
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


const AffinityChartNode = sequelize.define('affinityChartNode', {
    Name: { type: Sequelize.TEXT },
    SkillLevel: { type: Sequelize.INTEGER },
    Effect: { type: Sequelize.BLOB },
    Prerequisites: { type: Sequelize.BLOB },
    Available: { type: Sequelize.BOOLEAN },
    Unlocked: { type: Sequelize.BOOLEAN }
    },
    {timestamps: false, createdAt: false, updatedAt: false}
);

const AffinityChartBranch = sequelize.define('affinityChartBranch', {
    BranchName: { type: Sequelize.TEXT },
    NodeAffinity1: { type: Sequelize.INTEGER, references: {
        model: AffinityChartNode,
        key: 'id'
    } },
    NodeAffinity2: { type: Sequelize.INTEGER, references: {
        model: AffinityChartNode,
        key: 'id'
    } },
    NodeAffinity3: { type: Sequelize.INTEGER, references: {
        model: AffinityChartNode,
        key: 'id'
    } },
    NodeAffinity4: { type: Sequelize.INTEGER, references: {
        model: AffinityChartNode,
        key: 'id'
    } },
    NodeAffinity5: { type: Sequelize.INTEGER, references: {
        model: AffinityChartNode,
        key: 'id'
    } }
    },
    {timestamps: false, createdAt: false, updatedAt: false}
);


const AffinityChart = sequelize.define('affinityChart', {
    AffinityBranch: { type: Sequelize.INTEGER, references: {
        model: AffinityChartBranch,
        key: 'id'
    } },
    BladeSpecialBranch1: { type: Sequelize.INTEGER, references: {
        model: AffinityChartBranch,
        key: 'id'
    } },
    BladeSpecialBranch2: { type: Sequelize.INTEGER, references: {
        model: AffinityChartBranch,
        key: 'id'
    } },
    BladeSpecialBranch3: { type: Sequelize.INTEGER, references: {
        model: AffinityChartBranch,
        key: 'id'
    } },
    BattleSkillBranch1: { type: Sequelize.INTEGER, references: {
        model: AffinityChartBranch,
        key: 'id'
    } },
    BattleSkillBranch2: { type: Sequelize.INTEGER, references: {
        model: AffinityChartBranch,
        key: 'id'
    } },
    BattleSkillBranch3: { type: Sequelize.INTEGER, references: {
        model: AffinityChartBranch,
        key: 'id'
    } },
    FieldSkillBranch1: { type: Sequelize.INTEGER, references: {
        model: AffinityChartBranch,
        key: 'id'
    } },
    FieldSkillBranch2: { type: Sequelize.INTEGER, references: {
        model: AffinityChartBranch,
        key: 'id'
    } },
    FieldSkillBranch3: { type: Sequelize.INTEGER, references: {
        model: AffinityChartBranch,
        key: 'id'
    } } 
    },
    {timestamps: false, createdAt: false, updatedAt: false}
);

const Heart2Heart = sequelize.define('heart2Heart', {
    Title: { type: Sequelize.TEXT },
    Location: { type: Sequelize.TEXT },
    Area: { type: Sequelize.TEXT },
    Prerequisites: { type: Sequelize.BLOB },
    Who: { type: Sequelize.BLOB },
    Outcomes: { type: Sequelize.BLOB }
    },
    {timestamps: false, createdAt: false, updatedAt: false}
);

const ItemType = sequelize.define('itemType', {
    ItemType: { type: Sequelize.TEXT }
    },
    {timestamps: false, createdAt: false, updatedAt: false}
);

const Item = sequelize.define('item', {
    Name: { type: Sequelize.TEXT },
    ItemType: { type: Sequelize.TEXT, references: {
        model: ItemType,
        key: 'id'
    } },
    Source: { type: Sequelize.TEXT },
    Location: { type: Sequelize.TEXT },
    Area: { type: Sequelize.BLOB },
    Price: { type: Sequelize.INTEGER },
    FavoriteOf: { type: Sequelize.TEXT },
    Effects: { type: Sequelize.BLOB }
    },
    {timestamps: false, createdAt: false, updatedAt: false}
);

const Monster = sequelize.define('monster', {
    Name: { type: Sequelize.TEXT },
    Type: { type: Sequelize.TEXT },
    LowestLevel: { type: Sequelize.INTEGER },
    HighestLevel: { type: Sequelize.INTEGER },
    Location: { type: Sequelize.TEXT },
    Area: { type: Sequelize.BLOB },
    SpawnCondition: { type: Sequelize.BLOB },
    Drops: { type: Sequelize.BLOB }
    },
    {timestamps: false, createdAt: false, updatedAt: false}
);

const Quest = sequelize.define('quest', {
    Name: { type: Sequelize.TEXT },
    Type: { type: Sequelize.TEXT },
    Client: { type: Sequelize.TEXT },
    Location: { type: Sequelize.TEXT },
    Area: { type: Sequelize.TEXT },
    Prerequisites: { type: Sequelize.BLOB },
    Objectives: { type: Sequelize.BLOB },
    Rewards: { type: Sequelize.BLOB }
    },
    {timestamps: false, createdAt: false, updatedAt: false}
);


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
        model: Heart2Heart,
        key: 'id'
    } },
    BladeQuest: { type: Sequelize.TEXT, references: {
        model: Quest,
        key: 'id'
    } },
    AffinityChart: { type: Sequelize.INTEGER, references: {
        model: AffinityChart,
        key: 'id'
    } },
    FavItem1: { type: Sequelize.TEXT, references: {
        model: Item,
        key: 'id'
    } },
    FavItem2: { type: Sequelize.TEXT, references: {
        model: Item,
        key: 'id'
    } },
    FavItemType1: { type: Sequelize.TEXT, references: {
        model: ItemType,
        key: 'id'
    } },
    FavItemType2: { type: Sequelize.TEXT, references: {
        model: ItemType,
        key: 'id'
    } },
    Unlocked: { type: Sequelize.BOOLEAN },
    Available: { type: Sequelize.BOOLEAN },
    Prerequisites: { type: Sequelize.BLOB }
    },
    {timestamps: false, createdAt: false, updatedAt: false}
);

const DriverSkillNode = sequelize.define('driverSkillNode', {
    Name: { type: Sequelize.TEXT },
    Effect: { type: Sequelize.TEXT },
    SP: { type: Sequelize.INTEGER },
    Unlocked: { type: Sequelize.BOOLEAN } },
    {timestamps: false, createdAt: false, updatedAt: false}
)

const DriverSkillTree = sequelize.define('driverSkillTree', {
    Tier1Branch1: { type: Sequelize.INTEGER, references: {
        model: DriverSkillNode,
        key: 'id'
    } }, 
    Tier1Branch2: { type: Sequelize.INTEGER, references: {
        model: DriverSkillNode,
        key: 'id'
    } }, 
    Tier1Branch3: { type: Sequelize.INTEGER, references: {
        model: DriverSkillNode,
        key: 'id'
    } },  
    Tier1Branch4: { type: Sequelize.INTEGER, references: {
        model: DriverSkillNode,
        key: 'id'
    } },  
    Tier1Branch5: { type: Sequelize.INTEGER, references: {
        model: DriverSkillNode,
        key: 'id'
    } }, 
    Tier2Branch1: { type: Sequelize.INTEGER, references: {
        model: DriverSkillNode,
        key: 'id'
    } }, 
    Tier2Branch2: { type: Sequelize.INTEGER, references: {
        model: DriverSkillNode,
        key: 'id'
    } },  
    Tier2Branch3: { type: Sequelize.INTEGER, references: {
        model: DriverSkillNode,
        key: 'id'
    } }, 
    Tier2Branch4: { type: Sequelize.INTEGER, references: {
        model: DriverSkillNode,
        key: 'id'
    } }, 
    Tier2Branch5: { type: Sequelize.INTEGER, references: {
        model: DriverSkillNode,
        key: 'id'
    } }, 
    Tier3Branch1: { type: Sequelize.INTEGER, references: {
        model: DriverSkillNode,
        key: 'id'
    } }, 
    Tier3Branch2: { type: Sequelize.INTEGER, references: {
        model: DriverSkillNode,
        key: 'id'
    } }, 
    Tier3Branch3: { type: Sequelize.INTEGER, references: {
        model: DriverSkillNode,
        key: 'id'
    } }, 
    Tier3Branch4: { type: Sequelize.INTEGER, references: {
        model: DriverSkillNode,
        key: 'id'
    } }, 
    Tier3Branch5: { type: Sequelize.INTEGER, references: {
        model: DriverSkillNode,
        key: 'id'
    } }, 
    },
    {timestamps: false, createdAt: false, updatedAt: false}
)

const Driver = sequelize.define('driver', {
    ChapterUnlocked: { type: Sequelize.INTEGER },
    DriverSkillTree: { type: Sequelize.INTEGER, references: {
        model: DriverSkillTree,
        key: 'id'
    } },
    HiddenSkillTree: { type: Sequelize.INTEGER, references: {
        model: DriverSkillTree,
        key: 'id'
    } },
    Heart2Hearts: { type: Sequelize.BLOB },
    FavItem1: { type: Sequelize.TEXT, references: {
        model: Item,
        key: 'id'
    } },
    FavItem2: { type: Sequelize.TEXT, references: {
        model: Item,
        key: 'id'
    } },
    FavItemType1: { type: Sequelize.TEXT, references: {
        model: ItemType,
        key: 'id'
    } },
    FavItemType2: { type: Sequelize.TEXT, references: {
        model: ItemType,
        key: 'id'
    } },
    IdeaStats: { type: Sequelize.BLOB }
    },
    {timestamps: false, createdAt: false, updatedAt: false}
);

const DriverArtDetails = sequelize.define('driverArtDetail', {
    SP: { type: Sequelize.INTEGER },
    Damage: { type: Sequelize.INTEGER },
    EffectPotency: { type: Sequelize.TEXT },
    Recharge: { type: Sequelize.INTEGER }},
    {timestamps: false, createdAt: false, updatedAt: false}
);

const DriverArts = sequelize.define('driverArt', {
    Name: { type: Sequelize.TEXT },
    Driver: { type: Sequelize.INTEGER, references: {
        model: Driver,
        key: 'id'
    } },
    Effect: { type: Sequelize.TEXT },
    LevelUnlocked: { type: Sequelize.INTEGER },
    Level1: { type: Sequelize.INTEGER, references: {
        model: DriverArtDetails,
        key: 'id'
    } },
    Level2: { type: Sequelize.INTEGER, references: {
        model: DriverArtDetails,
        key: 'id'
    } },
    Level3: { type: Sequelize.INTEGER, references: {
        model: DriverArtDetails,
        key: 'id'
    } },
    Level4: { type: Sequelize.INTEGER, references: {
        model: DriverArtDetails,
        key: 'id'
    } },
    Level5: { type: Sequelize.INTEGER, references: {
        model: DriverArtDetails,
        key: 'id'
    } },
    Level5MaxAffinity: { type: Sequelize.INTEGER, references: {
        model: DriverArtDetails,
        key: 'id'
    } } },
    {timestamps: false, createdAt: false, updatedAt: false}
);

const StoryProgress = sequelize.define('storyProgress', {
    OnlyShowAvailable: { type: Sequelize.BOOLEAN },
    Chapter: { type: Sequelize.INTEGER },
    NewGamePlus: { type: Sequelize.BOOLEAN },
    TimeOfDay: { type: Sequelize.TEXT },
    AreaWeather: { type: Sequelize.TEXT }
    },
    {timestamps: false, createdAt: false, updatedAt: false}
);

AffinityChart.sync()
AffinityChartBranch.sync()
AffinityChartNode.sync()
Blade.sync()
Driver.sync()
DriverArtDetails.sync()
DriverArts.sync()
DriverSkillNode.sync()
DriverSkillTree.sync()
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
    Driver,
    DriverArtDetails,
    DriverArts,
    DriverSkillNode,
    DriverSkillTree,
    Heart2Heart,
    Item,
    ItemType,
    Monster,
    Quest,
    StoryProgress
}