import { IFluxAction, IFluxPayloadAction } from './fluxActions';
import { IStoryProgress } from 'interfaces';
import { ISelectedState } from '../interfaces/reduxState';

export enum CoreActions {
  ResetState = 'RESET_STATE',

  ShowLoader = 'SHOW_LOADER',
  HideLoader = 'HIDE_LOADER',
  ResetLoader = 'RESET_LOADER',

  ShowSaving = 'SHOW_SAVING',
  HideSaving = 'HIDE_SAVING',
  ResetSaving = 'RESET_SAVING',

  FetchStoryProgress = 'FETCH_STORY_PROGRESS',
  SetStoryProgress = 'SET_STORY_PROGRESS',
  SaveStoryProgress = 'SAVE_STORY_PROGRESS',

  SetSelected = 'SET_SELECTED',
  ClearSelected = 'CLEAR_SELECTED'
}

export type ActionTypes =
  | IFluxAction<CoreActions.ResetState>
  | IFluxPayloadAction<CoreActions.ShowLoader, string>
  | IFluxPayloadAction<CoreActions.HideLoader, string>
  | IFluxAction<CoreActions.ResetLoader>
  | IFluxPayloadAction<CoreActions.ShowSaving, string>
  | IFluxPayloadAction<CoreActions.HideSaving, string>
  | IFluxAction<CoreActions.ResetSaving>
  | IFluxAction<CoreActions.FetchStoryProgress>
  | IFluxPayloadAction<CoreActions.SetStoryProgress, IStoryProgress>
  | IFluxPayloadAction<CoreActions.SaveStoryProgress, IStoryProgress>
  | IFluxPayloadAction<CoreActions.SetSelected, ISelectedState>
  | IFluxAction<CoreActions.ClearSelected>;

export const resetState = () => ({
  type: CoreActions.ResetState
});

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

export const showSaving = (payload: string) => ({
  type: CoreActions.ShowSaving,
  payload
});
  
export const hideSaving = (payload: string) => ({
  type: CoreActions.HideSaving,
  payload
});

export const resetSaving = () => ({
  type: CoreActions.ResetSaving
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
