import { AnyAction } from 'redux';
import { combineEpics, Epic, ofType } from 'redux-observable';
import { from, mergeMap, of, concat, filter, EMPTY } from 'rxjs';
import { callWithLoader$ } from '.';
import {
  BladeActions,
  setBlade,
} from '../actions/blades';
import { IBlade } from 'interfaces';
import {
  getAllBlades,
  getBladeById,
  updateACNUnlocked,
  updateBladesUnlocked
} from 'services/blades';

const fetchAllBladesEffect:Epic<AnyAction, AnyAction> = (action$) =>
  action$.pipe(
    ofType(BladeActions.FetchAllBlades),
    mergeMap(() => callWithLoader$(
      'Fetching blades',
      from(getAllBlades())
        .pipe(mergeMap((blades:IBlade[]) => concat(
          of(setBlade(blades)),
        )))
    ))
  )

const fetchBladeEffect:Epic<AnyAction, AnyAction> = (action$) =>
  action$.pipe(
    ofType(BladeActions.FetchBlade),
    mergeMap((action) => callWithLoader$(
      'Fetching blade - ' + action.payload,
      from(getBladeById(action.payload))
        .pipe(mergeMap((blade:IBlade) => concat(
          of(setBlade([blade])),
        )))
    ))
  )

const saveBladeSkillNodeEffect:Epic<AnyAction, AnyAction> = (action$) =>
  action$.pipe(
    ofType(BladeActions.SaveBladeSkillNode),
    filter((action) => action.payload.unlocked?.length
      || action.payload.locked?.length
      || action.payload.partial?.length),
    mergeMap((action) => callWithLoader$(
      'Saving blade skill node',
      from(updateACNUnlocked(action.payload))
        .pipe(mergeMap(() => EMPTY))
    ))
  )

const saveBladeStatusEffect:Epic<AnyAction, AnyAction> = (action$) =>
  action$.pipe(
    ofType(BladeActions.SaveBladeStatus),
    filter((action) => action.payload.unlocked?.length || action.payload.locked?.length),
    mergeMap((action) => callWithLoader$(
      'Saving blade status',
      from(updateBladesUnlocked(action.payload))
        .pipe(mergeMap(() => EMPTY))
    ))
  )

export const effects = combineEpics(
  fetchAllBladesEffect,
  fetchBladeEffect,
  saveBladeSkillNodeEffect,
  saveBladeStatusEffect
)