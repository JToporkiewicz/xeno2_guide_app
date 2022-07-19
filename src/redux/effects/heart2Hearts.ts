import { AnyAction } from 'redux'
import { combineEpics, Epic, ofType } from 'redux-observable'
import { mergeMap, from, of, EMPTY } from 'rxjs'
import { callWithLoader$ } from '.'
import { IHeart2Heart } from '../../interfaces'
import { Heart2HeartActions, setHeart2Hearts } from '../actions/heart2Hearts'
import client from '../../api-client';

const fetchHeart2HeartsEffect:Epic<AnyAction, AnyAction> = (action$) =>
  action$.pipe(
    ofType(Heart2HeartActions.FetchHeart2Hearts),
    mergeMap(() => callWithLoader$(
      'Fetching Heart 2 Hearts',
      from(client.resource('heart2Heart').find())
        .pipe(mergeMap((heart2Hearts) => of(setHeart2Hearts(heart2Hearts))))
    ))
  )

const fetchHeart2HeartEffect:Epic<AnyAction, AnyAction> = (action$) =>
  action$.pipe(
    ofType(Heart2HeartActions.FetchHeart2Heart),
    mergeMap((action) => callWithLoader$(
      'Fetching Heart 2 Hearts',
      from(client.resource('heart2Heart').get(action.payload))
        .pipe(mergeMap((heart2Heart) => of(setHeart2Hearts([heart2Heart]))))
    ))
  )

const saveHeart2HeartsEffect:Epic<AnyAction, AnyAction> = (action$) =>
  action$.pipe(
    ofType(Heart2HeartActions.SaveHeart2Hearts),
    mergeMap((action) => {
      action.payload.map((heart2Heart:IHeart2Heart) => callWithLoader$(
        'Updating Heart 2 Hearts',
        from(client.resource('heart2Heart').update(heart2Heart.id, heart2Heart))
      ))
      return EMPTY
    })
  )

const saveHeart2HeartStatusEffect:Epic<AnyAction, AnyAction> = (action$) =>
  action$.pipe(
    ofType(Heart2HeartActions.SaveHeart2HeartStatus),
    mergeMap((action) => callWithLoader$(
      'Updating Heart 2 Heart Status',
      from(client.resource('heart2Heart')
        .update(action.payload.id, { Viewed: action.payload.Viewed }))
        .pipe(mergeMap(() => EMPTY))
    ))
  )

export const effects = combineEpics(
  fetchHeart2HeartsEffect,
  fetchHeart2HeartEffect,
  saveHeart2HeartsEffect,
  saveHeart2HeartStatusEffect
)