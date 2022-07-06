import { AnyAction } from 'redux'
import { combineEpics, Epic, ofType } from 'redux-observable'
import { mergeMap, from, of, EMPTY } from 'rxjs'
import { callWithLoader$ } from '.'
import client from '../../api-client';
import { QuestsActions, setQuests } from '../actions/quests'

const fetchQuestsEffect:Epic<AnyAction, AnyAction> = (action$) =>
  action$.pipe(
    ofType(QuestsActions.FetchQuests),
    mergeMap(() => callWithLoader$(
      'Fetching Quests',
      from(client.resource('quest').find())
        .pipe(mergeMap((quests) => of(setQuests(quests))))
    ))
  )

const saveQuestStatusEffect:Epic<AnyAction, AnyAction> = (action$) =>
  action$.pipe(
    ofType(QuestsActions.SaveQuestStatus),
    mergeMap((action) => callWithLoader$(
      'Save Quest Status',
      from(client.resource('quest')
        .update(action.payload.id, { Status: action.payload.Status }))
        .pipe(mergeMap(() => EMPTY))
    ))
  )

export const effects = combineEpics(
  fetchQuestsEffect,
  saveQuestStatusEffect
)