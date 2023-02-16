import { IHeart2Heart } from 'interfaces';
import { IUpdateH2HStatus } from 'reduxState/interfaces/heart2Hearts';
import { IUpdateUnlocked } from 'reduxState/interfaces/reduxState';
import { IFluxAction, IFluxPayloadAction } from './fluxActions';

export enum Heart2HeartActions {
  FetchHeart2HeartsPrerequisites = 'FETCH_HEART_2_HEARTS_PREREQUISITES',
  FetchHeart2Hearts = 'FETCH_HEART_2_HEARTS',
  FetchHeart2Heart = 'FETCH_HEART_2_HEART',
  SetHeart2Hearts = 'SET_HEART_2_HEARTS',
  SaveHeart2Hearts = 'SAVE_HEART_2_HEARTS',
  UpdateHeart2HeartStatus = 'UPDATE_HEART_2_HEART_STATUS'
}

export type ActionTypes =
| IFluxAction<Heart2HeartActions.FetchHeart2Hearts>
| IFluxPayloadAction<Heart2HeartActions.FetchHeart2Heart, number>
| IFluxPayloadAction<Heart2HeartActions.SetHeart2Hearts, IHeart2Heart[]>
| IFluxPayloadAction<Heart2HeartActions.SaveHeart2Hearts, IUpdateUnlocked>
| IFluxPayloadAction<Heart2HeartActions.UpdateHeart2HeartStatus, IUpdateH2HStatus>;


export const fetchHeart2Hearts = ():ActionTypes => ({
  type: Heart2HeartActions.FetchHeart2Hearts
});

export const fetchHeart2Heart = (payload:number):ActionTypes => ({
  type: Heart2HeartActions.FetchHeart2Heart,
  payload
})

export const setHeart2Hearts = (payload:IHeart2Heart[]):ActionTypes => ({
  type: Heart2HeartActions.SetHeart2Hearts,
  payload
});

export const saveHeart2Hearts = (payload:IUpdateUnlocked):ActionTypes => ({
  type: Heart2HeartActions.SaveHeart2Hearts,
  payload
});

export const updateHeart2HeartStatus = (payload:IUpdateH2HStatus):ActionTypes => ({
  type: Heart2HeartActions.UpdateHeart2HeartStatus,
  payload
});
