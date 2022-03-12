export interface IMercMission {
  id:number,
  Name:string,
  MissionNation:number,
  Giver:string,
  GiverLocation:number,
  Duration:string,
  Type:string,
  Completed:boolean,
  Available:boolean
}

export interface IPrerequisitesMM {
  id:number,
  RequiredBy:number,
  Nation:number,
  LocationDevLevel:number,
  MercLevel:number,
  BladeUnlocked:number,
  Quest:number,
  QuestStatus:string,
  StoryProgress:number,
  DLCUnlocked:boolean,
  OtherPrerequisiteTitle:string,
  OtherPrerequisiteDetails:string,
  Progress:string
}

export interface IRequirementsMM {
  id:number,
  Blade:number,
  FieldSkill1:number,
  FieldSkill1Level:number,
  FieldSkill2:number,
  FieldSkill2Level:number,
  FieldSkill3:number,
  FieldSkill3Level:number
}
