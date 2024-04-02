import { IChallengeBattle } from 'interfaces/ChallengeBattle';
import createReducer from 'redux-action-reducer';
import { ChallengeBattleActions } from 'reduxState/actions/challengeBattles';
import { IUpdateChallengeBattle } from 'reduxState/interfaces/challengeBattles';
import { IChallengeBattleState } from 'reduxState/interfaces/reduxState';

export const challengeBattlesReducer = createReducer<IChallengeBattleState[]>(
  [ChallengeBattleActions.SetChallengeBattles,
    (challengeBattleState: IChallengeBattleState[], challenges: IChallengeBattle[]) => {
      const challengeIds = challenges.map((c) => c.id);
      return challengeBattleState.filter((old) => !challengeIds.includes(old.id))
        .concat(challenges.map((chal) => ({
          id: chal.id,
          name: chal.Name,
          difficulty: chal.Difficulty,
          timeLimit: chal.TimeLimit,
          waves: chal.Waves,
          maxLv: chal.MaxLv,
          bladePowers: chal.BladePowers,
          driverRestrictions: chal.DriverRestrictions,
          beaten: chal.Beaten,
          prerequisites: chal.Prerequisites
        }))).sort((chalA, chalB) =>
          Number(chalA.id) < Number(chalB.id) ? -1 : 1)
    }],
  [ChallengeBattleActions.UpdateChallengeBattleBeaten,
    (challengeBattleState: IChallengeBattleState[],
      challenge: IUpdateChallengeBattle) => {
      const oldChallenge = challengeBattleState.find((cb) => cb.id === challenge.id);
      if (!oldChallenge) {
        return challengeBattleState;
      }
      return challengeBattleState.filter((old) => challenge.id != old.id )
        .concat({
          ...oldChallenge,
          beaten: challenge.beaten
        }).sort((chalA, chalB) =>
          Number(chalA.id) < Number(chalB.id) ? -1 : 1)
    }]
)([]);