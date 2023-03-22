import {
  IStoryProgress,
  IItem,
  IItemType,
  IDriver,
  IHeart2Heart,
  IQuest,
  IMercMission,
  IMonster
} from 'interfaces';
import { IRequirement } from 'interfaces/common';
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

export interface IUpdateUnlocked {
  unlocked?: number[],
  locked?: number[]
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

export interface IDriverState extends IDriver {
  show: boolean
}

export interface IAffinityChartNodeState {
  nodeId:number,
  skillLevel:number,
  effect:string[],
  available:boolean,
  unlocked:boolean
  tier: number
}

export interface IAffinityChartBranchState {
  branchId: number,
  branchName: string,
  nodes: IAffinityChartNodeState[]
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
  affinityChart: IAffinityChartBranchState[],
  favItem1:number,
  favItem2:number,
  favItemType1:number,
  favItemType2:number,
  unlocked: boolean,
  available: boolean,
  prerequisites?: IRequirement[],
  show?:boolean
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
  heart2hearts: IHeart2Heart[],
  quests: IQuest[],
  mercMissions: IMercMission[],
  monsters: IMonster[],
  items: IItemState
}
