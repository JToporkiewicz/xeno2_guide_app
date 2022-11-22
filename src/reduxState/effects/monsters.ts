import { AnyAction } from 'redux'
import { combineEpics, Epic, ofType } from 'redux-observable'
import { mergeMap, from, of, EMPTY, concat } from 'rxjs'
import { callWithLoader$ } from '.'
import client from 'api-client';
import {
  fetchMonsterTypes,
  MonstersActions,
  setMonsters,
  setMonsterTypes
} from 'reduxState/actions/monsters';
import { IUpdateMonster } from 'reduxState/interfaces/monsters';

const fetchMonstersEffect:Epic<AnyAction, AnyAction> = (action$) =>
  action$.pipe(
    ofType(MonstersActions.FetchAllMonsters),
    mergeMap(() => callWithLoader$(
      'Fetching Monsters',
      from(client.resource('monster').find())
        .pipe(mergeMap((monsters) => concat(
          of(setMonsters(monsters)),
          of(fetchMonsterTypes())
        )))
    ))
  )

const fetchMonsterEffect:Epic<AnyAction, AnyAction> = (action$) =>
  action$.pipe(
    ofType(MonstersActions.FetchMonsterTypes),
    mergeMap(() => callWithLoader$(
      'Fetching Monster Types',
      from(client.resource('monsterType').find())
        .pipe(mergeMap((monsterTypes) => of(setMonsterTypes(monsterTypes))))
    ))
  )

const saveMonstersEffect:Epic<AnyAction, AnyAction> = (action$) =>
  action$.pipe(
    ofType(MonstersActions.SaveMonsterStatus),
    mergeMap((action) => {
      action.payload.map((monster:IUpdateMonster) => callWithLoader$(
        'Updating Monster',
        from(client.resource('monster')
          .update(monster.id, {Beaten: monster.beaten}))
      ))
      return EMPTY
    })
  )

export const effects = combineEpics(
  fetchMonstersEffect,
  fetchMonsterEffect,
  saveMonstersEffect
)