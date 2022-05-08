import { AnyAction } from 'redux';
import { combineEpics, Epic, ofType } from 'redux-observable';
import { from, mergeMap, of } from 'rxjs';
import { callWithLoader$ } from '.';
import { BladeActions, setBlade } from '../actions/blades';
import client from '../../api-client';

const fetchAllBladesEffect:Epic<AnyAction, AnyAction> = (action$) =>
  action$.pipe(
    ofType(BladeActions.FetchAllBlades),
    mergeMap(() => callWithLoader$(
      'Fetching blades',
      from(client.resource('blade').find())
        .pipe(mergeMap((blade) => of(setBlade(blade))
        ))
    ))
  )

const fetchBladesByWeaponEffect:Epic<AnyAction, AnyAction> = (action$) =>
  action$.pipe(
    ofType(BladeActions.FetchBladesByWeapon),
    mergeMap((action) => callWithLoader$(
      'Fetching blades',
      from(client.resource('blade').find({Weapon: action.payload}))
        .pipe(mergeMap((blade) => of(setBlade(blade))
        ))
    ))
  )

export const effects = combineEpics(
  fetchBladesByWeaponEffect,
  fetchAllBladesEffect
)