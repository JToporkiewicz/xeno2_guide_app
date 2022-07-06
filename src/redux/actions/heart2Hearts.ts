import { IHeart2Heart } from '../../interfaces';
import { IFluxAction, IFluxPayloadAction } from './fluxActions';

export enum Heart2HeartActions {
  FetchHeart2HeartsPrerequisites = 'FETCH_HEART_2_HEARTS_PREREQUISITES',
  FetchHeart2Hearts = 'FETCH_HEART_2_HEARTS',
  SetHeart2Hearts = 'SET_HEART_2_HEARTS',
  UpdateHeart2Hearts = 'UPDATE_HEART_2_HEARTS',
  SaveHeart2Hearts = 'SAVE_HEART_2_HEARTS',
  UpdateHeart2HeartStatus = 'UPDATE_HEART_2_HEART_STATUS',
  SaveHeart2HeartStatus = 'SAVE_HEART_2_HEART_STATUS',
}

export type ActionTypes =
| IFluxAction<Heart2HeartActions.FetchHeart2Hearts>
| IFluxPayloadAction<Heart2HeartActions.SetHeart2Hearts, IHeart2Heart[]>
| IFluxPayloadAction<Heart2HeartActions.UpdateHeart2Hearts, IHeart2Heart>
| IFluxPayloadAction<Heart2HeartActions.SaveHeart2Hearts, IHeart2Heart[]>
| IFluxPayloadAction<Heart2HeartActions.UpdateHeart2HeartStatus, IHeart2Heart>
| IFluxPayloadAction<Heart2HeartActions.SaveHeart2HeartStatus, IHeart2Heart>;


export const fetchHeart2Hearts = ():ActionTypes => ({
  type: Heart2HeartActions.FetchHeart2Hearts
});

export const setHeart2Hearts = (payload:IHeart2Heart[]):ActionTypes => ({
  type: Heart2HeartActions.SetHeart2Hearts,
  payload
});

export const updateHeart2Hearts = (payload:IHeart2Heart):ActionTypes => ({
  type: Heart2HeartActions.UpdateHeart2Hearts,
  payload
});

export const saveHeart2Hearts = (payload:IHeart2Heart[]):ActionTypes => ({
  type: Heart2HeartActions.SaveHeart2Hearts,
  payload
});

export const updateHeart2HeartStatus = (payload:IHeart2Heart):ActionTypes => ({
  type: Heart2HeartActions.UpdateHeart2HeartStatus,
  payload
});

export const saveHeart2HeartStatus = (payload:IHeart2Heart):ActionTypes => ({
  type: Heart2HeartActions.SaveHeart2HeartStatus,
  payload
});
