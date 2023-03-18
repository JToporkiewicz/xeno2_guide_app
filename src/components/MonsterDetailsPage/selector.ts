import { IMonster } from 'interfaces';
import { defaultMonster } from 'reduxState/interfaces/monsters';
import { getMonsters, getSelected } from 'reduxState/selectors';
import { createSelector } from 'reselect';

export default createSelector(
  getMonsters,
  getSelected,
  (monsters, selected) => {
    const foundMon: IMonster = monsters.find((mon) =>
      mon.id === selected.id && selected.area === 'monster'
    ) || defaultMonster
    return {
      monster: foundMon
    }
  }
)