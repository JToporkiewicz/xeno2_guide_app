import { AnyAction } from 'redux'
import { combineEpics, Epic, ofType } from 'redux-observable'
import { mergeMap, from, of, EMPTY, concat } from 'rxjs'
import { callWithLoader$ } from '.'
import client from 'api-client';
import {
  fetchQuestSteps,
  fetchQuestStepsForQuest,
  fetchQuestSubSteps,
  fetchQuestSubStepsForQuest,
  QuestsActions,
  setQuests,
  setQuestSteps,
  setQuestSubSteps
} from '../actions/quests'
import { IQuestStep } from 'interfaces';

const fetchQuestsEffect:Epic<AnyAction, AnyAction> = (action$) =>
  action$.pipe(
    ofType(QuestsActions.FetchQuests),
    mergeMap(() => callWithLoader$(
      'Fetching Quests',
      from(client.resource('quest').find())
        .pipe(mergeMap((quests) => concat(
          of(setQuests(quests)),
          of(fetchQuestSteps())
        )))
    ))
  )

const fetchQuestEffect:Epic<AnyAction, AnyAction> = (action$) =>
  action$.pipe(
    ofType(QuestsActions.FetchQuest),
    mergeMap((action) => callWithLoader$(
      'Fetching Quests',
      from(client.resource('quest').get(action.payload))
        .pipe(mergeMap((quest) => concat(
          of(setQuests([quest])),
          of(fetchQuestStepsForQuest(quest.id))
        )))
    ))
  )

const fetchQuestStepEffect:Epic<AnyAction, AnyAction> = (action$) =>
  action$.pipe(
    ofType(QuestsActions.FetchQuestSteps),
    mergeMap(() => callWithLoader$(
      'Fetching Quest Steps',
      from(client.resource('questStep').find())
        .pipe(mergeMap((questSteps) => concat(
          of(setQuestSteps(questSteps)),
          of(fetchQuestSubSteps())
        )))
    ))
  )

const fetchQuestStepsForQuestEffect:Epic<AnyAction, AnyAction> = (action$) =>
  action$.pipe(
    ofType(QuestsActions.FetchQuestStepsForQuest),
    mergeMap((action) => callWithLoader$(
      'Fetching Quest Steps',
      from(client.resource('questStep').find({Quest: action.payload}))
        .pipe(mergeMap((questSteps: IQuestStep[]) => concat(
          of(setQuestSteps(questSteps)),
          of(...questSteps.map((step) => fetchQuestSubStepsForQuest(step.id)))
        )))
    ))
  )

const fetchQuestSubStepEffect:Epic<AnyAction, AnyAction> = (action$) =>
  action$.pipe(
    ofType(QuestsActions.FetchQuestSubSteps),
    mergeMap(() => callWithLoader$(
      'Fetching Quest Sub Steps',
      from(client.resource('questSubStep').find())
        .pipe(mergeMap((questSubSteps) => of(setQuestSubSteps(questSubSteps))))
    ))
  )

const fetchQuestSubStepsForQuestEffect:Epic<AnyAction, AnyAction> = (action$) =>
  action$.pipe(
    ofType(QuestsActions.FetchQuestSubStepsForQuest),
    mergeMap((action) => callWithLoader$(
      'Fetching Quest Steps',
      from(client.resource('questSubStep').find({'QuestStep': action.payload}))
        .pipe(mergeMap((questSubSteps) => of(setQuestSubSteps(questSubSteps))))
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
  fetchQuestEffect,
  fetchQuestStepEffect,
  fetchQuestStepsForQuestEffect,
  fetchQuestSubStepEffect,
  fetchQuestSubStepsForQuestEffect,
  saveQuestStatusEffect
)