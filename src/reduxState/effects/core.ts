import { AnyAction } from 'redux'
import { Epic, ofType, combineEpics } from 'redux-observable'
import { mergeMap, from, of, concat, switchMap } from 'rxjs'
import { callWithLoader$ } from '.'
import { CoreActions, fetchStoryProgress, resetState, setStoryProgress } from '../actions/core'
import client from 'api-client';
import { fetchAllBlades } from '../actions/blades'
import { fetchAllDrivers } from '../actions/drivers'
import { fetchHeart2Hearts } from '../actions/heart2Hearts'
import { fetchQuests } from '../actions/quests'
import { fetchFieldSkills } from '../actions/fieldSkills'
import { fetchAllMajorAreas } from 'reduxState/actions/locations'
import { fetchAllMercMissions } from 'reduxState/actions/mercMissions'
import { fetchAllMonsters } from 'reduxState/actions/monsters'
import { fetchItemTypes, fetchItems } from 'reduxState/actions/items'
import { fetchChallengeBattles } from 'reduxState/actions/challengeBattles'

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
          mergeMap(() => concat(
            of(setStoryProgress(action.payload)),
            of(resetState())
          ))
        )
    ))
  )

const resetStateEffect:Epic<AnyAction, AnyAction> = (action$) =>
  action$.pipe(
    ofType(CoreActions.ResetState),
    switchMap(() =>
      concat(
        of(fetchStoryProgress()),
        of(fetchItems()),
        of(fetchItemTypes()),
        of(fetchAllDrivers()),
        of(fetchAllBlades()),
        of(fetchHeart2Hearts()),
        of(fetchQuests()),
        of(fetchFieldSkills()),
        of(fetchAllMercMissions()),
        of(fetchAllMonsters()),
        of(fetchAllMajorAreas()),
        of(fetchChallengeBattles())
      )
    )
  )

export const effects = combineEpics(
  fetchStoryProgressEffect,
  saveStoryProgressEffect,
  resetStateEffect
)