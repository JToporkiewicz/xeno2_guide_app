import { AnyAction } from 'redux';
import { combineEpics, Epic, ofType } from 'redux-observable';
import {
  MercMissionsActions,
  setMercMissions
} from 'reduxState/actions/mercMissions';
import { concat, EMPTY, from, mergeMap, of } from 'rxjs';
import { callWithLoader$ } from '.';
import { IMercMission } from 'interfaces';
import {
  getAllMercMissions,
  getMercMissionById,
  updateMercMissionsStatus
} from 'services/mercMissions';

const fetchAllMercMissionsEffect:Epic<AnyAction, AnyAction> = (action$) =>
  action$.pipe(
    ofType(MercMissionsActions.FetchAllMercMissions),
    mergeMap(() => callWithLoader$(
      'Fetching merc missions',
      from(getAllMercMissions())
        .pipe(mergeMap((mercMissions:IMercMission[]) => concat(
          of(setMercMissions(mercMissions))
        )))
    ))
  )

const fetchMercMissionEffect:Epic<AnyAction, AnyAction> = (action$) =>
  action$.pipe(
    ofType(MercMissionsActions.FetchMercMission),
    mergeMap((action) => callWithLoader$(
      'Fetching merc missions',
      from(getMercMissionById(action.payload))
        .pipe(mergeMap((mercMission:IMercMission) => concat(
          of(setMercMissions([mercMission]))
        )))
    ))
  )

const saveMercMissionStatusEffect:Epic<AnyAction, AnyAction> = (action$) =>
  action$.pipe(
    ofType(MercMissionsActions.SaveMercMissionStatus),
    mergeMap((action) => callWithLoader$(
      'Saving merc mission status',
      from(updateMercMissionsStatus(action.payload))
        .pipe(mergeMap(() => EMPTY))
    ))
  )

export const effects = combineEpics(
  fetchAllMercMissionsEffect,
  saveMercMissionStatusEffect,
  fetchMercMissionEffect
)