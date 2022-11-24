import createReducer from 'redux-action-reducer';
import { ILocations, IMonster, IMonsterDrops, IMonsterType } from 'interfaces';
import { MonstersActions } from 'reduxState/actions/monsters';
import { IMajorLocations, IMonsterState } from 'reduxState/interfaces/reduxState';
import { LocationActions } from 'reduxState/actions/locations';
import { findLocationName, findAreaName } from 'helpers/commonReducers';
import { IUpdateMonster } from 'reduxState/interfaces/monsters';

export const monstersReducer = createReducer<IMonsterState[]>(
  [MonstersActions.SetMonsters, (state: IMonsterState[], payload:IMonster[]) => {
    const foundMonsters = payload.map((mon) => mon.id);

    return state.filter((oldMon) => !foundMonsters.includes(oldMon.id))
      .concat(payload.map((mon) => {
        const foundMon: IMonsterState | undefined = state.find((old) => old.id === mon.id);
        return {
          ...mon,
          Type: foundMon && foundMon.Type !== 'Unknown' ? foundMon.Type : `${mon.Type}`,
          Area: foundMon && foundMon.Area !== 'Unknown' ?
            foundMon.Area : 'Unknown',
          Location: foundMon && foundMon.Location !== 'Unknown' ?
            foundMon.Location : `${mon.Location}`,
          Drops: foundMon && foundMon.Drops ? foundMon.Drops : 
            JSON.parse(mon.Drops).map((drop: IMonsterDrops) => ({
              name: drop.Name,
              type: drop.Type,
              rarity: drop.Rarity,
              dropRate: drop.Rate
            }))
        }}))
      .sort((monA, monB) => monA.id < monB.id ? -1 : 1)
  }],
  [MonstersActions.SetMonsterTypes, (state: IMonsterState[], payload:IMonsterType[]) => {
    return state.map((old) => ({
      ...old,
      Type: Number(old.Type) ?
        payload.find((type) => type.id === Number(old.Type))?.MonsterType || 'Unknown'
        : old.Type
    })
    ).sort((monA, monB) => monA.id < monB.id ? -1 : 1)
  }],
  [LocationActions.SetMinorLocations,
    (state:IMonsterState[], locations:ILocations[]) => {
      const updatedMon:IMonsterState[] = findLocationName(state, locations);
      return state.filter((mon) => !updatedMon.map((updated)=> updated.id).includes(mon.id))
        .concat(updatedMon)
        .sort((monA, monB) => monA.id < monB.id ? -1 : 1)
    }],
  [LocationActions.SetDependentMajorAreas,
    (state:IMonsterState[], areas:IMajorLocations[]) => {
      const updatedMon:IMonsterState[] = findAreaName(state, areas);
      return state.filter((mon) => !updatedMon.map((updated)=> updated.id).includes(mon.id))
        .concat(updatedMon)
        .sort((monA, monB) => monA.id < monB.id ? -1 : 1)
    }],
  [MonstersActions.UpdateMonsterStatus,
    (state: IMonsterState[], updateMon: IUpdateMonster) => {
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
