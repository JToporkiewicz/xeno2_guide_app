import { IChallengeBattle } from 'interfaces/ChallengeBattle';
import { IFluxAction, IFluxPayloadAction } from './fluxActions';
import { IUpdateUnlocked } from 'reduxState/interfaces/reduxState';
import { IUpdateChallengeBattle } from 'reduxState/interfaces/challengeBattles';

export enum ChallengeBattleActions {
  FetchChallengeBattles = 'FETCH_CHALLENGE_BATTLES',
  SetChallengeBattles = 'SET_CHALLENGE_BATTLES',
  UpdateChallengeBattleBeaten = 'UPDATE_CHALLENGE_BATTLE_BEATEN',
  SaveChallengeBattlesBeaten = 'SAVE_CHALLENGE_BATTLES_BEATEN'
}

export type ActionTypes =
  | IFluxAction<ChallengeBattleActions.FetchChallengeBattles>
  | IFluxPayloadAction<ChallengeBattleActions.SetChallengeBattles, IChallengeBattle[]>
  | IFluxPayloadAction<ChallengeBattleActions.UpdateChallengeBattleBeaten, IUpdateChallengeBattle>
  | IFluxPayloadAction<ChallengeBattleActions.SaveChallengeBattlesBeaten, IUpdateUnlocked>

export const fetchChallengeBattles = ():ActionTypes => ({
  type: ChallengeBattleActions.FetchChallengeBattles
})

export const setChallengeBattles = (payload: IChallengeBattle[]):ActionTypes => ({
  type: ChallengeBattleActions.SetChallengeBattles,
  payload
})

export const saveChallengeBattles = (payload: IUpdateUnlocked):ActionTypes => ({
  type: ChallengeBattleActions.SaveChallengeBattlesBeaten,
  payload
})

export const updateChallengeBattles = (payload: IUpdateChallengeBattle):ActionTypes => ({
  type: ChallengeBattleActions.UpdateChallengeBattleBeaten,
  payload
})

