import { AnyAction } from 'redux';
import { combineEpics, Epic, ofType } from 'redux-observable';
import {
  fetchAllMinorLocations,
  LocationActions,
  setMajorAreas,
  setMinorLocations
} from 'reduxState/actions/locations';
import { mergeMap, from, concat, of, EMPTY } from 'rxjs';
import { callWithLoader$ } from '.';
import client from 'api-client';
import { ILocations, IMajorAreas } from 'interfaces';

const fetchAllMajorAreasEffect:Epic<AnyAction, AnyAction> = (action$) =>
  action$.pipe(
    ofType(LocationActions.FetchAllMajorAreas),
    mergeMap(() => callWithLoader$(
      'Fetching major areas',
      from(client.resource('majorArea').find())
        .pipe(mergeMap((majorAreas:IMajorAreas[]) => concat(
          of(setMajorAreas(majorAreas)),
          of(fetchAllMinorLocations())
        )))
    ))
  )

const fetchAllMinorLocationsEffect:Epic<AnyAction, AnyAction> = (action$) =>
  action$.pipe(
    ofType(LocationActions.FetchAllMinorLocations),
    mergeMap(() => callWithLoader$(
      'Fetching minor locations',
      from(client.resource('location').find())
        .pipe(mergeMap((minorLocations:ILocations[]) =>
          of(setMinorLocations(minorLocations))
        ))
    ))
  )

const saveDevelopmentLevelEffect:Epic<AnyAction, AnyAction> = (action$) =>
  action$.pipe(
    ofType(LocationActions.SaveDevelopmentLevel),
    mergeMap((action) => callWithLoader$(
      'Update area development level',
      from(client.resource('majorArea')
        .update(action.payload.id, {DevelopmentLevel: action.payload.level}))
        .pipe(mergeMap(() => EMPTY))
    ))
  )

export const effects = combineEpics(
  fetchAllMajorAreasEffect,
  fetchAllMinorLocationsEffect,
  saveDevelopmentLevelEffect
)