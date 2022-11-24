import { IMonster, IMonsterType } from 'interfaces';
import { IUpdateMonster } from 'reduxState/interfaces/monsters';
import { IFluxAction, IFluxPayloadAction } from './fluxActions';

export enum MonstersActions {
  FetchAllMonsters = 'FETCH_ALL_MONSTERS',
  SetMonsters = 'SET_MONSTERS',
  FetchMonsterTypes = 'FETCH_MONSTER_TYPES',
  SetMonsterTypes = 'SET_MONSTER_TYPES',
  UpdateMonsterStatus = 'UPDATE_MONSTER_STATUS',
  SaveMonsterStatus = 'SET_MONSTER_STATUS'
}

export type ActionTypes =
  | IFluxAction<MonstersActions.FetchAllMonsters>
  | IFluxPayloadAction<MonstersActions.SetMonsters, IMonster[]>
  | IFluxAction<MonstersActions.FetchMonsterTypes>
  | IFluxPayloadAction<MonstersActions.SetMonsterTypes, IMonsterType[]>
  | IFluxPayloadAction<MonstersActions.UpdateMonsterStatus, IUpdateMonster>
  | IFluxPayloadAction<MonstersActions.SaveMonsterStatus, IUpdateMonster>;

export const fetchAllMonsters = ():ActionTypes => ({
  type: MonstersActions.FetchAllMonsters
});

export const setMonsters = (payload:IMonster[]):ActionTypes => ({
  type: MonstersActions.SetMonsters,
  payload
});

export const fetchMonsterTypes = ():ActionTypes => ({
  type: MonstersActions.FetchMonsterTypes
});

export const setMonsterTypes = (payload:IMonsterType[]):ActionTypes => ({
  type: MonstersActions.SetMonsterTypes,
  payload
});

export const updateMonsterStatus = (payload:IUpdateMonster):ActionTypes => ({
  type: MonstersActions.UpdateMonsterStatus,
  payload
});

export const saveMonsterStatus = (payload:IUpdateMonster):ActionTypes => ({
  type: MonstersActions.SaveMonsterStatus,
  payload
});
