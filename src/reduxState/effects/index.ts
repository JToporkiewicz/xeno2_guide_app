import { Action, AnyAction } from 'redux';
import { combineEpics, Epic, ofType } from 'redux-observable';
import { concat, of, Observable, switchMap, iif } from 'rxjs';
import { Actions } from '../actions';
import { showLoader, hideLoader, fetchStoryProgress, resetLoader } from '../actions/core';
import { effects as coreEffects } from './core';
import { effects as driverEffects } from './drivers';
import { effects as heart2HeartEffects } from './heart2Hearts';
import { effects as bladeEffects } from './blades';
import { effects as itemEffects } from './items';
import { effects as questEffects } from './quests';
import { effects as fieldSkillEffects } from './fieldSkills';
import { fetchAllBlades } from '../actions/blades';
import { fetchAllDrivers } from '../actions/drivers';
import { fetchHeart2Hearts } from '../actions/heart2Hearts';
import { getDrivers } from '../selectors';
import { fetchQuests } from '../actions/quests';
import { fetchFieldSkills } from '../actions/fieldSkills';

export const callWithLoader$ = <T extends Action>(loaderState:string, action$:Observable<T>) =>
  concat(
    of(showLoader(loaderState)),
    action$,
    of(hideLoader(loaderState))
  )

const initialLoad:Epic<AnyAction, AnyAction> = (action$, state$) => 
  action$.pipe(
    ofType(Actions.InitialLoad),
    switchMap(() => 
      iif(() => getDrivers(state$.value).length === 0,
        concat(
          of(fetchStoryProgress()),
          of(fetchAllDrivers()),
          of(fetchAllBlades()),
          of(fetchHeart2Hearts()),
          of(fetchQuests()),
          of(fetchFieldSkills())
        ),
        of(resetLoader())
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
  questEffects
)