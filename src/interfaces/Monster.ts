export interface IMonsterDrops {
  name: string;
  type: string;
  rarity: string;
  dropRate: string;
}

export interface IMonster {
  id:number,
  Name:string,
  Category:string,
  Type:string,
  IsDriver:boolean,
  LowestLevel:number,
  HighestLevel:number,
  LocationId: number,
  Location:string,
  Area:string,
  DLCRequired:boolean,
  SpawnCondition:string,
  Drops: IMonsterDrops[],
  Beaten:boolean
}