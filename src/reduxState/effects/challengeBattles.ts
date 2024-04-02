import { AnyAction } from 'redux';
import { Epic, combineEpics, ofType } from 'redux-observable';
import { ChallengeBattleActions, setChallengeBattles } from 'reduxState/actions/challengeBattles';
import { EMPTY, concat, filter, from, mergeMap, of } from 'rxjs';
import { callWithLoader$, callWithSmallLoader$ } from '.';
import { getChallengeBattles, updateChallengeBattlesBeaten } from 'services/challengeBattles';
import { IChallengeBattle } from 'interfaces/ChallengeBattle';

const fetchChallengeBattlesEffect:Epic<AnyAction, AnyAction> = (action$) =>
  action$.pipe(
    ofType(ChallengeBattleActions.FetchChallengeBattles),
    mergeMap(() => callWithLoader$(
      'Fetching challenge battles',
      from(getChallengeBattles())
        .pipe(mergeMap((challenges:IChallengeBattle[]) => concat(
          of(setChallengeBattles(challenges))
        )))
    ))
  )

const saveChallengeBattlesEffect:Epic<AnyAction, AnyAction> = (action$) =>
  action$.pipe(
    ofType(ChallengeBattleActions.SaveChallengeBattlesBeaten),
    filter((action) => action.payload.unlocked?.length
      || action.payload.locked?.length),
    mergeMap((action) => callWithSmallLoader$(
      'Saving challenge battles',
      from(updateChallengeBattlesBeaten(action.payload))
        .pipe(mergeMap(() => EMPTY))
    ))
  )

export const effects = combineEpics(
  fetchChallengeBattlesEffect,
  saveChallengeBattlesEffect
)