export interface IMonster {
  id:number,
  Name:string,
  Category:string,
  Type:number,
  IsDriver:boolean,
  LowestLevel:number,
  HighestLevel:number,
  Location:number,
  DLCRequired:boolean,
  SpawnCondition:string,
  Drops:string,
  Available:boolean,
  Beaten:boolean
}

export interface IMonsterType {
  id:number,
  MonsterType:string
}