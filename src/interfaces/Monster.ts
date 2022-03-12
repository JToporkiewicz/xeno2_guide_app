export interface IMonster {
  id:number,
  Name:string,
  Category:string,
  Type:string,
  LowestLevel:number,
  HighestLevel:number,
  Location:number,
  DLCRequired:boolean,
  SpawnCondition:string,
  Drops:string,
  Available:boolean,
  Beaten:boolean
}