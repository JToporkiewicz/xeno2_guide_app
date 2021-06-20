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

const MajorAreas = sequelize.define('majorArea', {
    Name: { type: Sequelize.TEXT },
    DevelopmentLevel: { type: Sequelize.INTEGER },
    Located: { type: Sequelize.TEXT },
    StoryProgress: { type: Sequelize.INTEGER }
    },
    {timestamps: false, createdAt: false, updatedAt: false}
);

const Locations = sequelize.define('location', {
    Location: { type: Sequelize.TEXT },
    MajorArea: { type: Sequelize.INTEGER, references: {
        model: MajorAreas,
        key: 'id'
    } },
    Type: { type: Sequelize.TEXT },
    StoryProgress: { type: Sequelize.INTEGER }
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
    Location: { type: Sequelize.INTEGER, references: {
        model: Locations,
        key: 'id'
    } },
    Price: { type: Sequelize.INTEGER },
    FavoriteOf: { type: Sequelize.TEXT },
    Effects: { type: Sequelize.TEXT }
    },
    {timestamps: false, createdAt: false, updatedAt: false}
);

const Quest = sequelize.define('quest', {
    Name: { type: Sequelize.TEXT },
    Type: { type: Sequelize.TEXT },
    Client: { type: Sequelize.TEXT },
    Location: { type: Sequelize.INTEGER, references: {
        model: Locations,
        key: 'id'
    } },
    Rewards: { type: Sequelize.TEXT },
    Available: { type: Sequelize.TINYINT },
    Status: { type: Sequelize.TEXT }},
    {timestamps: false, createdAt: false, updatedAt: false}
);

const AffinityChartNode = sequelize.define('affinityChartNode', {
    Name: { type: Sequelize.TEXT },
    SkillLevel: { type: Sequelize.INTEGER },
    Effect: { type: Sequelize.TEXT },
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
    Location: { type: Sequelize.INTEGER, references: {
        model: Locations,
        key: 'id'
    } },
    Who: { type: Sequelize.TEXT },
    Outcomes: { type: Sequelize.TEXT },
    Available: { type: Sequelize.BOOLEAN },
    Viewed: { type: Sequelize.BOOLEAN }},
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
    Available: { type: Sequelize.BOOLEAN }
    },
    {timestamps: false, createdAt: false, updatedAt: false}
);

const DriverSkillNode = sequelize.define('driverSkillNode', {
    Name: { type: Sequelize.TEXT },
    Effect: { type: Sequelize.TEXT },
    SP: { type: Sequelize.INTEGER },
    Unlocked: { type: Sequelize.BOOLEAN } },
    {timestamps: false, createdAt: false, updatedAt: false}
);

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
    } } },
    {timestamps: false, createdAt: false, updatedAt: false}
);

const Driver = sequelize.define('driver', {
    Name: { type: Sequelize.TEXT },
    ChapterUnlocked: { type: Sequelize.INTEGER },
    DriverSkillTree: { type: Sequelize.INTEGER, references: {
        model: DriverSkillTree,
        key: 'id'
    } },
    HiddenSkillTree: { type: Sequelize.INTEGER, references: {
        model: DriverSkillTree,
        key: 'id'
    } },
    Heart2Hearts: { type: Sequelize.TEXT },
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
    IdeaStats: { type: Sequelize.TEXT }
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
    WeaponType: { type: Sequelize.TEXT },
    Effect: { type: Sequelize.TEXT },
    Target: { type: Sequelize.TEXT },
    Type: { type: Sequelize.TEXT },
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

const FieldSkills = sequelize.define('fieldSkill', {
    Name: { type: Sequelize.TEXT },
    CommonBladeContribution: { type: Sequelize.INTEGER },
    TotalLevel: { type: Sequelize.INTEGER },
    Type: { type: Sequelize.TEXT }
    },
    {timestamps: false, createdAt: false, updatedAt: false}
);

const RequirementsMM = sequelize.define('requirementsMM', {
    Blade: { type: Sequelize.INTEGER, references: {
        model: Blade,
        key: 'id'
    } },
    FieldSkill1: { type: Sequelize.INTEGER, references: {
        model: FieldSkills,
        key: 'id'
    } },
    FieldSkill1Level: { type: Sequelize.INTEGER },
    FieldSkill2: { type: Sequelize.INTEGER, references: {
        model: FieldSkills,
        key: 'id'
    } },
    FieldSkill2Level: { type: Sequelize.INTEGER },
    FieldSkill3: { type: Sequelize.INTEGER, references: {
        model: FieldSkills,
        key: 'id'
    } },
    FieldSkill3Level: { type: Sequelize.INTEGER }
    },
    {timestamps: false, createdAt: false, updatedAt: false}
);

const MercMission = sequelize.define('mercMission', {
    Name: { type: Sequelize.TEXT },
    MissionNation: { type: Sequelize.INTEGER, references: {
        model: MajorAreas,
        key: 'id'
    } },
    Giver: { type: Sequelize.TEXT },
    GiverLocation: { type: Sequelize.INTEGER, references: {
        model: Locations,
        key: 'id'
    } },
    Duration: { type: Sequelize.TEXT },
    Type: { type: Sequelize.TEXT },
    Completed: { type: Sequelize.BOOLEAN },
    Available: { type: Sequelize.BOOLEAN }
    },
    {timestamps: false, createdAt: false, updatedAt: false}
);

const Monster = sequelize.define('monster', {
    Name: { type: Sequelize.TEXT },
    Category: { type: Sequelize.TEXT },
    Type: { type: Sequelize.TEXT },
    LowestLevel: { type: Sequelize.INTEGER },
    HighestLevel: { type: Sequelize.INTEGER },
    Location: { type: Sequelize.INTEGER, references: {
        model: Locations,
        key: 'id'
    } },
    DLCRequired: { type: Sequelize.BOOLEAN },
    SpawnCondition: { type: Sequelize.TEXT },
    Drops: { type: Sequelize.TEXT },
    Available: { type: Sequelize.BOOLEAN },
    Beaten: { type: Sequelize.BOOLEAN }},
    {timestamps: false, createdAt: false, updatedAt: false}
);

const PrerequisitesACN = sequelize.define('prerequisitesACN', {
    RequiredBy: { type: Sequelize.INTEGER, references: {
        model: AffinityChartNode,
        key: 'id'
    } },
    OtherPrerequisiteName: { type: Sequelize.TEXT },
    OtherPrerequisiteDetail: { type: Sequelize.INTEGER },
    StoryProgress: { type: Sequelize.INTEGER },
    Location: { type: Sequelize.INTEGER, references: {
        model: MajorAreas,
        key: 'id'
    } },
    Heart2HeartTitle: { type: Sequelize.INTEGER, references: {
        model: Heart2Heart,
        key: 'id'
    } },
    SideQuest: { type: Sequelize.INTEGER, references: {
        model: Quest,
        key: 'id'
    } },
    MercMissionTitle: { type: Sequelize.INTEGER, references: {
        model: MercMission,
        key: 'id'
    } },
    MonsterTitle: { type: Sequelize.INTEGER, references: {
        model: Monster,
        key: 'id'
    } },
    AffinityChartNode: { type: Sequelize.INTEGER, references: {
        model: AffinityChartNode,
        key: 'id'
    } },
    PouchItemType: { type: Sequelize.INTEGER, references: {
        model: ItemType,
        key: 'id'
    } },
    PouchItem: { type: Sequelize.INTEGER, references: {
        model: Item,
        key: 'id'
    } },
    Progress: { type: Sequelize.INTEGER }
    },
    {timestamps: false, createdAt: false, updatedAt: false}
);

const PrerequisitesBlade = sequelize.define('prerequisitesBlade', {
    RequiredBy: { type: Sequelize.INTEGER, references: {
        model: Blade,
        key: 'id'
    } },
    StoryProgress: { type: Sequelize.INTEGER },
    NewGamePlus: { type: Sequelize.BOOLEAN },
    DLCUnlocked: { type: Sequelize.BOOLEAN },
    SideQuest: { type: Sequelize.INTEGER, references: {
        model: Quest,
        key: 'id'
    } },
    MercMission: { type: Sequelize.INTEGER, references: {
        model: MercMission,
        key: 'id'
    } } },
    {timestamps: false, createdAt: false, updatedAt: false}
);

const PrerequisitesH2H = sequelize.define('prerequisitesH2H', {
    RequiredBy: { type: Sequelize.INTEGER, references: {
        model: Heart2Heart,
        key: 'id'
    } },
    StoryProgress: { type: Sequelize.INTEGER },
    NewGamePlus: { type: Sequelize.BOOLEAN },
    DLCUnlocked: { type: Sequelize.BOOLEAN },
    BladeAffinityChartNode: { type: Sequelize.INTEGER, references: {
        model: AffinityChartNode,
        key: 'id'
    } },
    FieldSkill1: { type: Sequelize.INTEGER, references: {
        model: FieldSkills,
        key: 'id'
    } },
    FieldSkill1Level: { type: Sequelize.INTEGER },
    FieldSkill2: { type: Sequelize.INTEGER, references: {
        model: FieldSkills,
        key: 'id'
    } },
    FieldSkill2Level: { type: Sequelize.INTEGER },
    Quest: { type: Sequelize.INTEGER, references: {
        model: Quest,
        key: 'id'
    } },
    StayAtAnInn: { type: Sequelize.TEXT },
    InnLocation: { type: Sequelize.INTEGER, references: {
        model: MajorAreas,
        key: 'id'
    } }
    },
    {timestamps: false, createdAt: false, updatedAt: false}
);

const PrerequisitesMM = sequelize.define('prerequisitesMM', {
    RequiredBy: { type: Sequelize.INTEGER, references: {
        model: MercMission,
        key: 'id'
    } },
    Nation: { type: Sequelize.INTEGER, references: {
        model: MajorAreas,
        key: 'id'
    } },
    LocationDevLevel: { type: Sequelize.INTEGER },
    MercLevel: { type: Sequelize.INTEGER },
    BladeUnlocked: { type: Sequelize.INTEGER, references: {
        model: Blade,
        key: 'id'
    } },
    Quest: { type: Sequelize.INTEGER, references: {
        model: Quest,
        key: 'id'
    } },
    QuestStatus: { type: Sequelize.TEXT },
    StoryProgress: { type: Sequelize.INTEGER },
    DLCUnlocked: { type: Sequelize.BOOLEAN },
    OtherPrerequisiteTitle: { type: Sequelize.TEXT },
    OtherPrerequisiteDetails: { type: Sequelize.TEXT },
    Progress: { type: Sequelize.TEXT }
    },
    {timestamps: false, createdAt: false, updatedAt: false}
);

const QuestStep = sequelize.define('questStep', {
    Quest: { type: Sequelize.INTEGER, references: {
        model: Quest,
        key: 'id'
    } },
    StepNumber: { type: Sequelize.INTEGER },
    Description: { type: Sequelize.TEXT },
    Completed: { type: Sequelize.TINYINT }
    },
    {timestamps: false, createdAt: false, updatedAt: false}
);

const QuestSubStep = sequelize.define('questSubStep', {
    QuestStep: { type: Sequelize.INTEGER, references: {
        model: QuestStep,
        key: 'id'
    } },
    SubStepNumber: { type: Sequelize.INTEGER },
    Description: { type: Sequelize.TEXT },
    CompleteSideQuest: { type: Sequelize.INTEGER, references: {
        model: Quest,
        key: 'id'
    } },
    DefeatMonster: { type: Sequelize.INTEGER, references: {
        model: Monster,
        key: 'id'
    } },
    CollectItem: { type: Sequelize.INTEGER, references: {
        model: Item,
        key: 'id'
    } },
    Count: { type: Sequelize.INTEGER },
    CompletionProgress: { type: Sequelize.TINYINT }
    },
    {timestamps: false, createdAt: false, updatedAt: false}
);

const PrerequisitesQuests = sequelize.define('prerequisitesQuest', {
    RequiredBy: { type: Sequelize.INTEGER, references: {
        model: Quest,
        key: 'id'
    }},
    Location: { type: Sequelize.INTEGER, references: {
        model: Locations,
        key: 'id'
    } },
    StoryProgress: { type: Sequelize.INTEGER },
    NewGamePlus: { type: Sequelize.BOOLEAN },
    DLCUnlocked: { type: Sequelize.BOOLEAN },
    MercMission: { type: Sequelize.INTEGER, references: {
        model: MercMission,
        key: 'id'
    } },
    Heart2Heart: { type: Sequelize.INTEGER, references: {
        model: Heart2Heart,
        key: 'id'
    } },
    BladeUnlocked: { type: Sequelize.INTEGER, references: {
        model: Blade,
        key: 'id'
    } },
    BladeAffinityChartNode: { type: Sequelize.INTEGER, references: {
        model: AffinityChartNode,
        key: 'id'
    } },
    Quest: { type: Sequelize.INTEGER, references: {
        model: Quest,
        key: 'id'
    } },
    OtherPrerequisiteDetail: { type: Sequelize.TEXT }
 },
    {timestamps: false, createdAt: false, updatedAt: false}
);

const StoryProgress = sequelize.define('storyProgress', {
    OnlyShowAvailable: { type: Sequelize.BOOLEAN },
    Chapter: { type: Sequelize.INTEGER },
    NewGamePlus: { type: Sequelize.BOOLEAN },
    TimeOfDay: { type: Sequelize.TIME },
    AreaWeather: { type: Sequelize.TEXT },
    DLCUnlocked: { type: Sequelize.BOOLEAN }
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
FieldSkills.sync()
Heart2Heart.sync()
Item.sync()
ItemType.sync()
Locations.sync()
MajorAreas.sync()
MercMission.sync()
Monster.sync()
PrerequisitesACN.sync()
PrerequisitesBlade.sync()
PrerequisitesH2H.sync()
PrerequisitesMM.sync()
PrerequisitesQuests.sync()
RequirementsMM.sync()
Quest.sync()
QuestStep.sync()
QuestSubStep.sync()
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
    FieldSkills,
    Heart2Heart,
    Item,
    ItemType,
    Locations,
    MajorAreas,
    MercMission,
    Monster,
    PrerequisitesACN,
    PrerequisitesBlade,
    PrerequisitesH2H,
    PrerequisitesMM,
    PrerequisitesQuests,
    RequirementsMM,
    Quest,
    QuestStep,
    QuestSubStep,
    StoryProgress
}