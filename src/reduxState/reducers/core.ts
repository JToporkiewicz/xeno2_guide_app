import { combineReducers } from 'redux';
import createReducer from 'redux-action-reducer';
import { IStoryProgress, defaultStoryProgress } from 'interfaces';
import { defaultSelected, ICoreState, ISelectedState } from '../interfaces/reduxState';
import { CoreActions } from '../actions/core';

const loaderState = createReducer<string[], string>(
  [CoreActions.ShowLoader, (state, payload) => state.concat([payload])],
  [CoreActions.HideLoader,
    (state, payload) =>
      state.filter((loader: string) => loader !== payload)],
  [CoreActions.ResetLoader, () => []]
)([]);
const storyProgress = createReducer<IStoryProgress>(
  [CoreActions.SetStoryProgress, (_:IStoryProgress, storyProgress: IStoryProgress) => {
    if (storyProgress.Chapter < 4) {
      return {
        ...storyProgress,
        MercLevel: 1
      }
    }
    return storyProgress;
  }]
)(defaultStoryProgress);
const selected = createReducer<ISelectedState>(
  [CoreActions.SetSelected, (_:ISelectedState, selected: ISelectedState) => selected],
  [CoreActions.ClearSelected, () => defaultSelected]
)(defaultSelected);

export const coreReducer = combineReducers<ICoreState>({
  storyProgress,
  loaderState,
  selected
})