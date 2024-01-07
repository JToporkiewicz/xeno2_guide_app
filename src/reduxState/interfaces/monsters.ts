import { IMonsterAvailability } from './availabilityState';

export interface IUpdateMonster {
  id: number;
  beaten: boolean;
}

export const defaultMonster: IMonsterAvailability = {
  id:-1,
  Name:'',
  Category:'',
  Type:'',
  IsDriver:false,
  LowestLevel:-1,
  HighestLevel:-1,
  LocationId: -1,
  Location:'',
  Area:'',
  DLCRequired:false,
  SpawnCondition:'',
  Drops: [],
  Beaten:false,
  Available: false
}