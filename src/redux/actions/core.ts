import { IFluxAction, IFluxPayloadAction } from './fluxActions';
import { IStoryProgress } from '../../interfaces';
import { ISelectedState } from '../interfaces/reduxState';

export enum CoreActions {
  ShowLoader = 'SHOW_LOADER',
  HideLoader = 'HIDE_LOADER',
  ResetLoader = 'RESET_LOADER',

  FetchStoryProgress = 'FETCH_STORY_PROGRESS',
  SetStoryProgress = 'SET_STORY_PROGRESS',
  SaveStoryProgress = 'SAVE_STORY_PROGRESS',

  SetSelected = 'SET_SELECTED',
  ClearSelected = 'CLEAR_SELECTED'
}

export type ActionTypes =
  | IFluxPayloadAction<CoreActions.ShowLoader, string>
  | IFluxPayloadAction<CoreActions.HideLoader, string>
  | IFluxAction<CoreActions.FetchStoryProgress>
  | IFluxPayloadAction<CoreActions.SetStoryProgress, IStoryProgress>
  | IFluxPayloadAction<CoreActions.SaveStoryProgress, IStoryProgress>
  | IFluxPayloadAction<CoreActions.SetSelected, ISelectedState>
  | IFluxAction<CoreActions.ClearSelected>;


export const showLoader = (payload:string):ActionTypes => ({
  type: CoreActions.ShowLoader,
  payload
});
  
export const hideLoader = (payload:string):ActionTypes => ({
  type: CoreActions.HideLoader,
  payload
});

export const resetLoader = () => ({
  type: CoreActions.ResetLoader
});
  
export const fetchStoryProgress = ():ActionTypes => ({
  type: CoreActions.FetchStoryProgress
});
  
export const setStoryProgress = (payload:IStoryProgress):ActionTypes => ({
  type: CoreActions.SetStoryProgress,
  payload
});
  
export const saveStoryProgress = (payload:IStoryProgress):ActionTypes => ({
  type: CoreActions.SaveStoryProgress,
  payload
});

export const setSelected = (payload:ISelectedState):ActionTypes => ({
  type: CoreActions.SetSelected,
  payload
});

export const clearSelected = ():ActionTypes => ({
  type: CoreActions.ClearSelected
})
