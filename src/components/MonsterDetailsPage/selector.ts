import { defaultMonster } from 'reduxState/interfaces/monsters';
import { IMonsterState } from 'reduxState/interfaces/reduxState';
import { getMonsters, getSelected } from 'reduxState/selectors';
import { createSelector } from 'reselect';

export default createSelector(
  getMonsters,
  getSelected,
  (monsters, selected) => {
    const foundMon: IMonsterState = monsters.find((mon) =>
      mon.id === selected.id && selected.area === 'monster'
    ) || defaultMonster
    return {
      monster: foundMon
    }
  }
)