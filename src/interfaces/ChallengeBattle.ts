import { IRequirement } from './common'

export interface IChallengeBattle {
  id:number,
  Name:string,
  Difficulty:string,
  TimeLimit:string,
  Waves:number,
  MaxLv:number,
  BladePowers:boolean,
  DriverRestrictions:string,
  Beaten:boolean,
  Prerequisites?: IRequirement[]
}
