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
  AffinityChart:number,
  FavItem1:number,
  FavItem2:number,
  FavItemType1:number,
  FavItemType2:number,
  Unlocked:boolean,
  Available:boolean
}

export interface IPrerequisitesBlade {
  id:number,
  RequiredBy:number,
  StoryProgress:number,
  NewGamePlus:boolean,
  DLCUnlocked:boolean,
  SideQuest:number,
  MercMission:number,
  Monster:number,
  Location:number,
  OtherDetails:string
}
