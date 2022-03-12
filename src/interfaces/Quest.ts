export interface IPrerequisitesQuests {
  id:number,
  RequiredBy:number,
  Location:number,
  StoryProgress:number,
  NewGamePlus:boolean,
  DLCUnlocked:boolean,
  MercMission:number,
  Heart2Heart:number,
  BladeUnlocked:number,
  BladeAffinityChartNode:number,
  Quest:number,
  OtherPrerequisiteDetail:string
}

export interface IQuest {
  id:number,
  Name:string,
  Type:string,
  Client:string,
  Location:number,
  Rewards:string,
  Available:boolean,
  Status:string
}

export interface IQuestStep {
  id:number,
  Quest:number,
  StepNumber:number,
  Description:string,
  Completed:boolean
}

export interface IQuestSubStep {
  id:number,
  QuestStep:number,
  SubStepNumber:number,
  Description:string,
  CompleteSideQuest:number,
  DefeatMonster:number,
  CollectItem:number,
  Count:number,
  CompletionProgress:boolean
}
