import {
  IDriverArtDetails,
  IDriverSkillNode,
  IQuestSubStep,
  IStoryProgress,
  IItem,
  IItemType
} from 'interfaces';
import { IFieldSkills } from 'interfaces/FieldSkills';

export interface IUpdateShow {
  id: number,
  show: boolean
}

export interface ISelectedState {
  id: number,
  area: string
}

export const defaultSelected = {
  id: 0,
  area: ''
}

export interface ICoreState {
  storyProgress: IStoryProgress,
  loaderState: string[],
  selected: ISelectedState,
}

export interface ILocationState {
  id: number,
  Location: string,
  Type: string,
  StoryProgress: number
}

export interface IInnerMajorArea {
  id: number,
  Name: string,
  StoryProgress: number,
  Locations: ILocationState[]
}

export interface IMajorLocations {
  id: number,
  Name: string,
  DevelopmentLevel: number,
  StoryProgress: number,
  InnerMajorAreas: IInnerMajorArea[]
}

export interface ISkillTreeState {
  treeId: number,
  tier1: IDriverSkillNode[],
  tier2: IDriverSkillNode[],
  tier3: IDriverSkillNode[]
}

export interface IDriverArtNode extends IDriverArtDetails {
  Level: number
}

export const defaultArtState = {
  id: 0,
  name: '',
  weaponType: '',
  effect: '',
  target: '',
  type: '',
  levelUnlocked: 0,
  nodes: [] as IDriverArtNode[]
}

export interface IDriverArtsState {
  id: number,
  name: string,
  weaponType: string,
  effect: string[],
  target: string,
  type: string,
  levelUnlocked: number,
  nodes: IDriverArtNode[]
}

interface IDriverIdeaStats {
  Bravery: number,
  Truth: number,
  Compassion: number,
  Justice: number,
}

export interface IDriverState {
  id: number,
  name: string,
  chapterUnlocked:number,
  arts: IDriverArtsState[],
  skillTree: ISkillTreeState,
  hiddenSkillTree: ISkillTreeState,
  favItem1:number,
  favItem2:number,
  favItemType1:number,
  favItemType2:number,
  ideaStats:IDriverIdeaStats,
  show?:boolean
}

export interface IAffinityChartNodeState {
  id:number,
  Name:string,
  SkillLevel:number,
  Effect:string[],
  Available:boolean,
  Unlocked:boolean
  Tier: number
}

export interface IAffinityChartBranchState {
  id: number,
  branchName: string,
  nodes: IAffinityChartNodeState[]
}

export interface IAffinityChartState {
  id: number,
  branches: IAffinityChartBranchState[]
}

export interface IBladeState {
  id: number,
  name: string,
  gender: string,
  type: string,
  weapon: string,
  element: string,
  role: string,
  auxCoreCount: number,
  source: string,
  heart2heartId: number,
  bladeQuestId: number,
  affinityChart: IAffinityChartState,
  favItem1:number,
  favItem2:number,
  favItemType1:number,
  favItemType2:number,
  unlocked: boolean,
  available: boolean,
  show?:boolean
}

interface IH2hOutcomes {
  'Option 1'?: {[key:string]:any},
  'Option 2'?: {[key:string]:any},
  'All'?: {[key:string]:any}[],
}

export interface IHeart2HeartState {
  id:number,
  Title:string,
  Area:string,
  Location:string,
  Who:string[],
  Outcomes:IH2hOutcomes,
  Available:boolean,
  Viewed:boolean
}

export interface IQuestStepState {
  id:number,
  Quest:number,
  StepNumber:number,
  Description:string,
  Completed: boolean,
  SubSteps?: IQuestSubStep[]
}

export interface IQuestState {
  id:number,
  Name:string,
  Type:string,
  Client:string,
  Area:string,
  Location:string,
  Rewards:string[],
  Available:boolean,
  Status:string
  Steps: IQuestStepState[]
}

export interface IItemState {
  items: IItem[],
  itemTypes: IItemType[]
}

export interface IRequirement {
  area: string,
  requirement: string,
  requirementCount?: number,
  available?:boolean,
  completed?:boolean
}

export interface IMercMissionState {
  id:number,
  Name:string,
  MissionNation:string,
  Giver:string,
  GiverLocation:string,
  Duration:string,
  Type:string,
  Missable:boolean,
  Completed:boolean,
  Available:boolean
  Requirements: IRequirement[]
}

export interface IMonsterDrops {
  name: string;
  type: string;
  rarity: string;
  dropRate: string;
}

export interface IMonsterState {
  id:number,
  Name:string,
  Category:string,
  Type:string,
  IsDriver:boolean,
  LowestLevel:number,
  HighestLevel:number,
  Location:string,
  Area:string,
  DLCRequired:boolean,
  SpawnCondition:string,
  Drops: IMonsterDrops[],
  Available:boolean,
  Beaten:boolean
}

export interface IXenobladeState {
  core: ICoreState,
  locations: IMajorLocations[],
  drivers: IDriverState[],
  blades: IBladeState[],
  fieldSkills: IFieldSkills[],
  heart2hearts: IHeart2HeartState[],
  quests: IQuestState[],
  mercMissions: IMercMissionState[],
  monsters: IMonsterState[],
  items: IItemState
}
