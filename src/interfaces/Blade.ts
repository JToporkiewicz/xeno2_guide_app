import { IAffinityChartBranch } from './AffinityChart'
import { IRequirement } from './common'

export interface IBlade {
  id:number,
  Name:string,
  Gender:string,
  Type:string,
  Weapon:string,
  Element:string,
  Role:string,
  AuxCoreCount:number,
  Source:string,
  Heart2Heart:number,
  BladeQuest:number,
  AffinityChart:IAffinityChartBranch[],
  FavItem1:number,
  FavItem2:number,
  FavItemType1:number,
  FavItemType2:number,
  Unlocked:boolean,
  Prerequisites?: IRequirement[]
}
