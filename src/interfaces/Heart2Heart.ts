export interface IHeart2Heart {
  id:number,
  Title:string,
  Location:number,
  Who:string,
  Outcomes:string,
  Available:boolean,
  Viewed:boolean
}

export interface IPrerequisitesH2H {
  id:number,
  RequiredBy:number,
  StoryProgress:number,
  NewGamePlus:boolean,
  DLCUnlocked:boolean,
  BladeAffinityChartNode:number,
  FieldSkill1:number,
  FieldSkill1Level:number,
  FieldSkill2:number,
  FieldSkill2Level:number,
  Quest:number,
  StayAtAnInn:string,
  InnLocation:number
}
