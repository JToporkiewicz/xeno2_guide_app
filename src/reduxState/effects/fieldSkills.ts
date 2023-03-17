import { AnyAction } from 'redux'
import { combineEpics, Epic, ofType } from 'redux-observable'
import { mergeMap, from, of, EMPTY } from 'rxjs'
import { callWithLoader$ } from '.'
import { FieldSkillsActions, setFieldSkills } from '../actions/fieldSkills'
import { getFieldSkills, updateSkills } from 'services/fieldSkills';

const fetchFieldSkillsEffect:Epic<AnyAction, AnyAction> = (action$) =>
  action$.pipe(
    ofType(FieldSkillsActions.FetchFieldSkills),
    mergeMap(() => callWithLoader$(
      'Fetching Field Skills',
      from(getFieldSkills())
        .pipe(mergeMap((fieldSkills) => of(setFieldSkills(fieldSkills))))
    ))
  )

const saveFieldSkillLevelUnlockedEffect:Epic<AnyAction, AnyAction> = (action$) =>
  action$.pipe(
    ofType(FieldSkillsActions.SaveFieldSkillLevelUnlocked),
    mergeMap((action) => callWithLoader$(
      'Updating Field Skills',
      from(updateSkills(action.payload))
        .pipe(mergeMap(() => EMPTY))
    ))
  )

export const effects = combineEpics(
  fetchFieldSkillsEffect,
  saveFieldSkillLevelUnlockedEffect
)