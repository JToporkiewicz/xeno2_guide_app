import { AnyAction } from 'redux'
import { Epic, ofType, combineEpics } from 'redux-observable'
import { mergeMap, from, of } from 'rxjs'
import { callWithLoader$ } from '.'
import { CoreActions, setStoryProgress } from '../actions/core'
import client from '../../api-client';

const fetchStoryProgressEffect:Epic<AnyAction, AnyAction> = (action$) =>
  action$.pipe(
    ofType(CoreActions.FetchStoryProgress),
    mergeMap(() => callWithLoader$(
      'Fetching story progress',
      from(client.resource('storyProgress').get(1))
        .pipe(mergeMap((storyProgress) =>
          of(setStoryProgress(storyProgress))
        ))
    ))
  )

const saveStoryProgressEffect:Epic<AnyAction, AnyAction> = (action$) =>
  action$.pipe(
    ofType(CoreActions.SaveStoryProgress),
    mergeMap((action) => callWithLoader$(
      'Updating story progress',
      from(client.resource('storyProgress').update(1, action.payload))
        .pipe(
          mergeMap(() => of(setStoryProgress(action.payload)))
        )
    ))
  )

export const effects = combineEpics(
  fetchStoryProgressEffect,
  saveStoryProgressEffect
)