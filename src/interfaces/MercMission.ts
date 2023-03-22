import { IRequirement } from './common'

export interface IPrerequisitesMM {
  id:number,
  RequiredBy:number,
  Nation:number,
  LocationDevLevel:number,
  MercLevel:number,
  BladeUnlocked:number,
  Quest:number,
  QuestStatus:string,
  MercMissionCompleted:number,
  StoryProgress:number,
  DLCUnlocked:boolean,
  OtherPrerequisiteTitle:string,
  OtherPrerequisiteDetails:string,
  Progress:string
}

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
  Available:boolean
  Requirements: IRequirement[]
}
