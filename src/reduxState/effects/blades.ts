import { AnyAction } from 'redux';
import { combineEpics, Epic, ofType } from 'redux-observable';
import { from, mergeMap, of, concat } from 'rxjs';
import { callWithLoader$ } from '.';
import {
  BladeActions,
  setBlade,
} from '../actions/blades';
import client from 'api-client';
import { IBlade } from 'interfaces';
import { fetchAllMercMissionRequirements } from 'reduxState/actions/mercMissions';
import { getAllBlades, getBladeById, updateBladesUnlocked } from 'services/blades';

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
    mergeMap((action) => callWithLoader$(
      'Saving blade skill node - ' + action.payload.nodeId,
      from(client.resource('affinityChartNode').update(action.payload.nodeId, action.payload))
        .pipe(mergeMap(() => of(fetchAllMercMissionRequirements())))
    ))
  )

const saveBladeStatusEffect:Epic<AnyAction, AnyAction> = (action$) =>
  action$.pipe(
    ofType(BladeActions.SaveBladeStatus),
    mergeMap((action) => callWithLoader$(
      'Saving blade status',
      from(updateBladesUnlocked(action.payload))
        .pipe(mergeMap(() => of(fetchAllMercMissionRequirements())))
    ))
  )

export const effects = combineEpics(
  fetchAllBladesEffect,
  fetchBladeEffect,
  saveBladeSkillNodeEffect,
  saveBladeStatusEffect
)