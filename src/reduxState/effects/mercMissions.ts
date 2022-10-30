import { AnyAction } from 'redux';
import { combineEpics, Epic, ofType } from 'redux-observable';
import {
  fetchAllMercMissionRequirements,
  fetchMercMissionRequirements,
  MercMissionsActions,
  setMercMissionRequirements,
  setMercMissions
} from 'reduxState/actions/mercMissions';
import { concat, EMPTY, from, mergeMap, of } from 'rxjs';
import { callWithLoader$ } from '.';
import client from 'api-client';
import { IMercMission, IRequirementsMM } from 'interfaces';
import { getBlades, getFieldSkills } from 'reduxState/selectors';

const fetchAllMercMissionsEffect:Epic<AnyAction, AnyAction> = (action$) =>
  action$.pipe(
    ofType(MercMissionsActions.FetchAllMercMissions),
    mergeMap(() => callWithLoader$(
      'Fetching merc missions',
      from(client.resource('mercMission').find())
        .pipe(mergeMap((mercMissions:IMercMission[]) => concat(
          of(setMercMissions(mercMissions)),
          of(fetchAllMercMissionRequirements())
        )))
    ))
  )

const fetchMercMissionEffect:Epic<AnyAction, AnyAction> = (action$) =>
  action$.pipe(
    ofType(MercMissionsActions.FetchMercMission),
    mergeMap((action) => callWithLoader$(
      'Fetching merc missions',
      from(client.resource('mercMission').get(action.payload))
        .pipe(mergeMap((mercMission:IMercMission) => concat(
          of(setMercMissions([mercMission])),
          of(fetchMercMissionRequirements(action.payload))
        )))
    ))
  )

const fetchAllMercMissionRequirementsEffect:Epic<AnyAction, AnyAction> = (action$, state$) =>
  action$.pipe(
    ofType(MercMissionsActions.FetchAllMercMissionRequirements),
    mergeMap(() => callWithLoader$(
      'Fetching merc mission requirements',
      from(client.resource('requirementsMM').find())
        .pipe(mergeMap((mmReqs:IRequirementsMM[]) => concat(
          of(setMercMissionRequirements({
            requirements: mmReqs,
            blades: getBlades(state$.value),
            fieldSkills: getFieldSkills(state$.value)
          }))
        )))
    ))
  )

const fetchMercMissionRequirementsEffect:Epic<AnyAction, AnyAction> = (action$, state$) =>
  action$.pipe(
    ofType(MercMissionsActions.FetchMercMissionRequirements),
    mergeMap((action) => callWithLoader$(
      'Fetching merc mission requirements',
      from(client.resource('requirementsMM').find({MissionId: action.payload}))
        .pipe(mergeMap((mmReqs:IRequirementsMM[]) => concat(
          of(setMercMissionRequirements({
            requirements: mmReqs,
            blades: getBlades(state$.value),
            fieldSkills: getFieldSkills(state$.value)
          }))
        )))
    ))
  )

const saveMercMissionStatusEffect:Epic<AnyAction, AnyAction> = (action$) =>
  action$.pipe(
    ofType(MercMissionsActions.SaveMercMissionStatus),
    mergeMap((action) => callWithLoader$(
      'Saving merc mission status',
      from(client.resource('mercMission').update(
        action.payload.id,
        {Completed: action.payload.completed}))
        .pipe(mergeMap(() => EMPTY))
    ))
  )

export const effects = combineEpics(
  fetchAllMercMissionsEffect,
  fetchAllMercMissionRequirementsEffect,
  saveMercMissionStatusEffect,
  fetchMercMissionEffect,
  fetchMercMissionRequirementsEffect
)