export interface IMercMission {
  id:number,
  Name:string,
  MissionNation:number,
  Giver:string,
  GiverLocation:number,
  Duration:string,
  Type:string,
  Missable:boolean,
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
  MercMissionCompleted:number,
  StoryProgress:number,
  DLCUnlocked:boolean,
  OtherPrerequisiteTitle:string,
  OtherPrerequisiteDetails:string,
  Progress:string
}

export interface IRequirementsMM {
  id:number,
  MissionId:number,
  Blade:number,
  FieldSkill:number,
  FieldSkillLevel:number,
  Element:string,
  ElementLevel:number,
  WeaponType:string,
  WeaponLevel:number,
  BladeGender:string,
  BladeGenderLevel:number,
  Humanoid:boolean,
  HumanoidLevel:number,
  Stats:string,
  StatsLevel:number
}
