import { AnyAction } from 'redux';
import { combineEpics, Epic, ofType } from 'redux-observable';
import {
  fetchAllMercMissionRequirements,
  MercMissionsActions,
  setMercMissionRequirements,
  setMercMissions
} from 'reduxState/actions/mercMissions';
import { concat, from, mergeMap, of } from 'rxjs';
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

export const effects = combineEpics(
  fetchAllMercMissionsEffect,
  fetchAllMercMissionRequirementsEffect
)