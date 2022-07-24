import {
  IDriverArtDetails,
  IDriverSkillNode,
  IAffinityChartNode,
  IMercMission,
  IQuestStep,
  IQuestSubStep,
  IStoryProgress,
  IItem,
  IItemType
} from 'interfaces';
import { IFieldSkills } from 'interfaces/FieldSkills';
import { IMonster } from 'interfaces/Monster';

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
  effect: string,
  target: string,
  type: string,
  levelUnlocked: number,
  nodes: IDriverArtNode[]
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
  ideaStats:string,
  show?:boolean
}

export interface IAffinityChartNodeState extends IAffinityChartNode {
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

export interface IHeart2HeartState {
  id:number,
  Title:string,
  Area:string,
  Location:string,
  Who:string,
  Outcomes:string,
  Available:boolean,
  Viewed:boolean
}

export interface IQuestStepState extends IQuestStep {
  SubSteps?: IQuestSubStep[]
}

export interface IQuestState {
  id:number,
  Name:string,
  Type:string,
  Client:string,
  Location:string,
  Rewards:string,
  Available:boolean,
  Status:string
  Steps: IQuestStepState[]
}

export interface IItemState {
  items: IItem[],
  itemTypes: IItemType[]
}

export interface IXenobladeState {
  core: ICoreState,
  locations: IMajorLocations[],
  drivers: IDriverState[],
  blades: IBladeState[],
  fieldSkills: IFieldSkills[],
  heart2hearts: IHeart2HeartState[],
  quests: IQuestState[],
  mercMissions: IMercMission[],
  monsters: IMonster[],
  items: IItemState
}
