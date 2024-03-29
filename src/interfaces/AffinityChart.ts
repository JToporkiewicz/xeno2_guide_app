import { IRequirement } from './common'

export interface IAffinityChartNode {
  nodeId: number,
  skillLevel: number,
  effect: string[],
  unlocked: boolean,
  tier: number,
  preReqs?: IRequirement[]
}

export interface IAffinityChartBranch {
  branchId:number,
  branchName:string,
  nodes: IAffinityChartNode[]
}

export interface IPrerequisitesACN {
  id:number,
  RequiredBy:number,
  OtherPrerequisiteName:string,
  OtherPrerequisiteDetail:number,
  StoryProgress:number,
  DLCRequired:boolean,
  Location:number,
  Heart2HeartTitle:number,
  SideQuest:number,
  MercMissionTitle:number,
  MonsterTitle:number,
  MonsterType:number,
  AffinityChartNode:number,
  PouchItemType:number,
  PouchItem:number,
  Progress:number
}
