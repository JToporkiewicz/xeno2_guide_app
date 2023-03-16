import { AnyAction } from 'redux'
import { combineEpics, Epic, ofType } from 'redux-observable'
import { mergeMap, from, of, EMPTY, concat } from 'rxjs'
import { callWithLoader$ } from '.'
import {
  QuestsActions,
  setQuests,
} from '../actions/quests'
import {
  getAllQuests,
  getQuestById,
  saveQuestsStatus,
  saveQuestStepStatus,
  saveQuestSubStepStatus
} from 'services/quests';

const fetchQuestsEffect:Epic<AnyAction, AnyAction> = (action$) =>
  action$.pipe(
    ofType(QuestsActions.FetchQuests),
    mergeMap(() => callWithLoader$(
      'Fetching Quests',
      from(getAllQuests())
        .pipe(mergeMap((quests) => concat(
          of(setQuests(quests)),
        )))
    ))
  )

const fetchQuestEffect:Epic<AnyAction, AnyAction> = (action$) =>
  action$.pipe(
    ofType(QuestsActions.FetchQuest),
    mergeMap((action) => callWithLoader$(
      'Fetching Quests',
      from(getQuestById(action.payload))
        .pipe(mergeMap((quest) => concat(
          of(setQuests([quest])),
        )))
    ))
  )

const saveQuestStatusEffect:Epic<AnyAction, AnyAction> = (action$) =>
  action$.pipe(
    ofType(QuestsActions.SaveQuestStatus),
    mergeMap((action) => callWithLoader$(
      'Save Quest Status',
      from(saveQuestsStatus(action.payload))
        .pipe(mergeMap(() => EMPTY))
    ))
  )

const saveQuestStepStatusEffect:Epic<AnyAction, AnyAction> = (action$) =>
  action$.pipe(
    ofType(QuestsActions.SaveQuestStepStatus),
    mergeMap((action) => callWithLoader$(
      'Save Quest Step Status',
      from(saveQuestStepStatus(action.payload))
        .pipe(mergeMap(() => EMPTY))
    ))
  )

const saveQuestSubStepStatusEffect:Epic<AnyAction, AnyAction> = (action$) =>
  action$.pipe(
    ofType(QuestsActions.SaveQuestSubStepStatus),
    mergeMap((action) => callWithLoader$(
      'Save Quest Sub Step Status',
      from(saveQuestSubStepStatus(action.payload))
        .pipe(mergeMap(() => EMPTY))
    ))
  )

export const effects = combineEpics(
  fetchQuestsEffect,
  fetchQuestEffect,
  saveQuestStatusEffect,
  saveQuestStepStatusEffect,
  saveQuestSubStepStatusEffect
)