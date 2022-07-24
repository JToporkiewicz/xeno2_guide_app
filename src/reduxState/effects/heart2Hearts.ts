import { AnyAction } from 'redux'
import { combineEpics, Epic, ofType } from 'redux-observable'
import { mergeMap, from, of, EMPTY } from 'rxjs'
import { callWithLoader$ } from '.'
import { Heart2HeartActions, setHeart2Hearts } from '../actions/heart2Hearts'
import client from 'api-client';
import { IUpdateH2HStatus } from 'reduxState/interfaces/heart2Hearts'

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
      action.payload.map((heart2Heart:IUpdateH2HStatus) => callWithLoader$(
        'Updating Heart 2 Hearts',
        from(client.resource('heart2Heart')
          .update(heart2Heart.id, {Viewed: heart2Heart.Viewed}))
      ))
      return EMPTY
    })
  )

export const effects = combineEpics(
  fetchHeart2HeartsEffect,
  fetchHeart2HeartEffect,
  saveHeart2HeartsEffect
)