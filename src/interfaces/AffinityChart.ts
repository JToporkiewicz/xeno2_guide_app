export interface IAffinityChart {
  id:number,
  AffinityBranch:number,
  BladeSpecialBranch1:number,
  BladeSpecialBranch2:number,
  BladeSpecialBranch3:number,
  BattleSkillBranch1:number,
  BattleSkillBranch2:number,
  BattleSkillBranch3:number,
  FieldSkillBranch1:number,
  FieldSkillBranch2:number,
  FieldSkillBranch3:number
}

export interface IAffinityChartBranch {
  id:number,
  BranchName:string,
  NodeAffinity1:number,
  NodeAffinity2:number,
  NodeAffinity3:number,
  NodeAffinity4:number,
  NodeAffinity5:number
}

export interface IAffinityChartNode {
  id:number,
  Name:string,
  SkillLevel:number,
  Effect:string,
  Available:boolean,
  Unlocked:boolean
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
