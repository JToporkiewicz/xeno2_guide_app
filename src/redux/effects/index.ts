import { Action, AnyAction } from 'redux';
import { combineEpics, Epic, ofType } from 'redux-observable';
import { concat, of, mergeMap, Observable, filter } from 'rxjs';
import { Actions } from '../actions';
import { showLoader, hideLoader, fetchStoryProgress } from '../actions/core';
import { effects as coreEffects } from './core';
import { effects as driverEffects } from './drivers';
import { effects as heart2HeartEffects } from './heart2Hearts';
import { effects as bladeEffects } from './blades';
import { effects as itemEffects } from './items';
import { fetchAllBlades } from '../actions/blades';
import { fetchAllDrivers } from '../actions/drivers';
import { fetchHeart2Hearts } from '../actions/heart2Hearts';
import { getDrivers } from '../selectors';

export const callWithLoader$ = <T extends Action>(loaderState:string, action$:Observable<T>) =>
  concat(
    of(showLoader(loaderState)),
    action$,
    of(hideLoader(loaderState))
  )

const initialLoad:Epic<AnyAction, AnyAction> = (action$, state$) => 
  action$.pipe(
    ofType(Actions.InitialLoad),
    filter(() => getDrivers(state$.value).length === 0),
    mergeMap(() => 
      concat(
        of(fetchStoryProgress()),
        of(fetchAllDrivers()),
        of(fetchAllBlades()),
        of(fetchHeart2Hearts())
      )
    )
  )

export const effects = combineEpics(
  initialLoad,
  bladeEffects,
  coreEffects,
  driverEffects,
  heart2HeartEffects,
  itemEffects
)