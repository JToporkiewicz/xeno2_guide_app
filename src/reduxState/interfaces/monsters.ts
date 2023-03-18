import { IMonster } from 'interfaces';

export interface IUpdateMonster {
  id: number;
  beaten: boolean;
}

export const defaultMonster: IMonster = {
  id:-1,
  Name:'',
  Category:'',
  Type:'',
  IsDriver:false,
  LowestLevel:-1,
  HighestLevel:-1,
  Location:'',
  Area:'',
  DLCRequired:false,
  SpawnCondition:'',
  Drops: [],
  Available:false,
  Beaten:false  
}