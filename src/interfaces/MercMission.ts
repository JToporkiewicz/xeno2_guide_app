import { IRequirement } from './common'

export interface IMercMission {
  id:number,
  Name:string,
  MissionNation:string,
  Giver:string,
  GiverLocation:string,
  Duration:string,
  Type:string,
  Missable:boolean,
  Completed:boolean,
  Requirements: IRequirement[],
  Prerequisites?: IRequirement[]
}
