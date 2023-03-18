import createReducer from 'redux-action-reducer';
import { IMonster } from 'interfaces';
import { MonstersActions } from 'reduxState/actions/monsters';
import { IUpdateMonster } from 'reduxState/interfaces/monsters';

export const monstersReducer = createReducer<IMonster[]>(
  [MonstersActions.SetMonsters, (state: IMonster[], payload:IMonster[]) => {
    const foundMonsters = payload.map((mon) => mon.id);

    return state.filter((oldMon) => !foundMonsters.includes(oldMon.id))
      .concat(payload)
      .sort((monA, monB) => monA.id < monB.id ? -1 : 1)
  }],
  [MonstersActions.UpdateMonsterStatus,
    (state: IMonster[], updateMon: IUpdateMonster) => {
      const foundMon = state.find((old) => old.id === updateMon.id);

      if (!foundMon) {
        return state;
      }

      return state.filter((old) => old.id !== foundMon.id)
        .concat({
          ...foundMon,
          Beaten: updateMon.beaten
        })
        .sort((monA, monB) => monA.id < monB.id ? -1 : 1)
    }]
)([]);
