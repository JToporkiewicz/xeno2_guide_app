import { AnyAction } from 'redux'
import { combineEpics, Epic, ofType } from 'redux-observable'
import { mergeMap, from, of, EMPTY, filter } from 'rxjs'
import { callWithLoader$ } from '.'
import { Heart2HeartActions, setHeart2Hearts } from '../actions/heart2Hearts'
import { getAllHeart2Hearts, getHeart2HeartById, updateH2HViewed } from 'services/heart2Hearts'

const fetchHeart2HeartsEffect:Epic<AnyAction, AnyAction> = (action$) =>
  action$.pipe(
    ofType(Heart2HeartActions.FetchHeart2Hearts),
    mergeMap(() => callWithLoader$(
      'Fetching Heart 2 Hearts',
      from(getAllHeart2Hearts())
        .pipe(mergeMap((heart2Hearts) => of(setHeart2Hearts(heart2Hearts))))
    ))
  )

const fetchHeart2HeartEffect:Epic<AnyAction, AnyAction> = (action$) =>
  action$.pipe(
    ofType(Heart2HeartActions.FetchHeart2Heart),
    mergeMap((action) => callWithLoader$(
      'Fetching Heart 2 Hearts',
      from(getHeart2HeartById(action.payload))
        .pipe(mergeMap((heart2Heart) => of(setHeart2Hearts([heart2Heart]))))
    ))
  )

const saveHeart2HeartsEffect:Epic<AnyAction, AnyAction> = (action$) =>
  action$.pipe(
    ofType(Heart2HeartActions.SaveHeart2Hearts),
    filter((action) => action.payload.unlocked?.length || action.payload.locked?.length),
    mergeMap((action) => 
      callWithLoader$(
        'Updating Heart 2 Hearts',
        from(updateH2HViewed(action.payload)).pipe(mergeMap(() => EMPTY))
      ))
  )

export const effects = combineEpics(
  fetchHeart2HeartsEffect,
  fetchHeart2HeartEffect,
  saveHeart2HeartsEffect
)