import { AnyAction } from 'redux'
import { combineEpics, Epic, ofType } from 'redux-observable'
import { mergeMap, from, of, EMPTY } from 'rxjs'
import { callWithLoader$ } from '.'
import {
  MonstersActions,
  setMonsters
} from 'reduxState/actions/monsters';
import { getAllMonsters, updateMonsterStatus } from 'services/monsters';

const fetchMonstersEffect:Epic<AnyAction, AnyAction> = (action$) =>
  action$.pipe(
    ofType(MonstersActions.FetchAllMonsters),
    mergeMap(() => callWithLoader$(
      'Fetching Monsters',
      from(getAllMonsters())
        .pipe(mergeMap((monsters) => of(setMonsters(monsters)
        )))
    ))
  )

const saveMonstersEffect:Epic<AnyAction, AnyAction> = (action$) =>
  action$.pipe(
    ofType(MonstersActions.SaveMonsterStatus),
    mergeMap((action) =>
      callWithLoader$(
        'Updating Monster',
        from(updateMonsterStatus(action.payload))
          .pipe(mergeMap(() => EMPTY))
      ))
  )

export const effects = combineEpics(
  fetchMonstersEffect,
  saveMonstersEffect
)