import { IMonster } from 'interfaces';
import { IUpdateMonster } from 'reduxState/interfaces/monsters';
import { IUpdateUnlocked } from 'reduxState/interfaces/reduxState';
import { IFluxAction, IFluxPayloadAction } from './fluxActions';

export enum MonstersActions {
  FetchAllMonsters = 'FETCH_ALL_MONSTERS',
  FetchMonster = 'FETCH_MONSTER',
  SetMonsters = 'SET_MONSTERS',
  UpdateMonsterStatus = 'UPDATE_MONSTER_STATUS',
  SaveMonsterStatus = 'SET_MONSTER_STATUS'
}

export type ActionTypes =
  | IFluxAction<MonstersActions.FetchAllMonsters>
  | IFluxPayloadAction<MonstersActions.FetchMonster, number>
  | IFluxPayloadAction<MonstersActions.SetMonsters, IMonster[]>
  | IFluxPayloadAction<MonstersActions.UpdateMonsterStatus, IUpdateMonster>
  | IFluxPayloadAction<MonstersActions.SaveMonsterStatus, IUpdateUnlocked>;

export const fetchAllMonsters = ():ActionTypes => ({
  type: MonstersActions.FetchAllMonsters
});

export const fetchMonster = (payload: number) => ({
  type: MonstersActions.FetchMonster,
  payload
})

export const setMonsters = (payload:IMonster[]):ActionTypes => ({
  type: MonstersActions.SetMonsters,
  payload
});

export const updateMonsterStatus = (payload:IUpdateMonster):ActionTypes => ({
  type: MonstersActions.UpdateMonsterStatus,
  payload
});

export const saveMonsterStatus = (payload:IUpdateUnlocked):ActionTypes => ({
  type: MonstersActions.SaveMonsterStatus,
  payload
});
