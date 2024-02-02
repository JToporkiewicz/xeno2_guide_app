import { Action, AnyAction } from 'redux';
import { combineEpics, Epic, ofType } from 'redux-observable';
import { concat, of, Observable, switchMap, iif } from 'rxjs';
import { Actions } from '../actions';
import {
  showLoader,
  hideLoader,
  resetLoader,
  resetState,
  showSaving,
  hideSaving,
  resetSaving
} from '../actions/core';
import { effects as coreEffects } from './core';
import { effects as driverEffects } from './drivers';
import { effects as heart2HeartEffects } from './heart2Hearts';
import { effects as bladeEffects } from './blades';
import { effects as itemEffects } from './items';
import { effects as questEffects } from './quests';
import { effects as fieldSkillEffects } from './fieldSkills';
import { effects as locationEffects } from './locations';
import { effects as mercMissionEffects } from './mercMissions';
import { effects as monstersEffects } from './monsters';
import { getDrivers } from '../selectors';

export const callWithLoader$ = <T extends Action>(loaderState:string, action$:Observable<T>) =>
  concat(
    of(showLoader(loaderState)),
    action$,
    of(hideLoader(loaderState))
  )

export const callWithSmallLoader$ = <T extends Action>(loaderState:string, action$:Observable<T>) =>
  concat(
    of(showSaving(loaderState)),
    action$,
    of(hideSaving(loaderState))
  )

const initialLoad:Epic<AnyAction, AnyAction> = (action$, state$) => 
  action$.pipe(
    ofType(Actions.InitialLoad),
    switchMap(() => 
      iif(() => getDrivers(state$.value).length === 0,
        of(resetState()),
        concat(
          of(resetLoader()),
          of(resetSaving())
        )
      )
    )
  )

export const effects = combineEpics(
  initialLoad,
  bladeEffects,
  coreEffects,
  driverEffects,
  fieldSkillEffects,
  heart2HeartEffects,
  itemEffects,
  questEffects,
  locationEffects,
  mercMissionEffects,
  monstersEffects
)