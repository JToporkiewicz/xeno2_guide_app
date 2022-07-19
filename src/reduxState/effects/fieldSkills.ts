import { AnyAction } from 'redux'
import { combineEpics, Epic, ofType } from 'redux-observable'
import { mergeMap, from, of, EMPTY } from 'rxjs'
import { callWithLoader$ } from '.'
import client from 'api-client';
import { FieldSkillsActions, setFieldSkills } from '../actions/fieldSkills'

const fetchFieldSkillsEffect:Epic<AnyAction, AnyAction> = (action$) =>
  action$.pipe(
    ofType(FieldSkillsActions.FetchFieldSkills),
    mergeMap(() => callWithLoader$(
      'Fetching Field Skills',
      from(client.resource('fieldSkill').find())
        .pipe(mergeMap((fieldSkills) => of(setFieldSkills(fieldSkills))))
    ))
  )

const saveFieldSkillLevelUnlockedEffect:Epic<AnyAction, AnyAction> = (action$) =>
  action$.pipe(
    ofType(FieldSkillsActions.SaveFieldSkillLevelUnlocked),
    mergeMap((action) => callWithLoader$(
      'Updating Field Skills',
      from(client.resource('fieldSkill')
        .update(
          action.payload.id,
          { CommonBladeContribution: action.payload.CommonBladeContribution }
        ))
        .pipe(mergeMap(() => EMPTY))
    ))
  )

export const effects = combineEpics(
  fetchFieldSkillsEffect,
  saveFieldSkillLevelUnlockedEffect
)