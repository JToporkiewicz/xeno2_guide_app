interface IH2hOutcomes {
  'Option 1'?: {[key:string]:any},
  'Option 2'?: {[key:string]:any},
  'All'?: {[key:string]:any}[],
}

export interface IHeart2Heart {
  id:number,
  Title:string,
  Area:string,
  Location:string,
  Who:string[],
  Outcomes:IH2hOutcomes,
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
