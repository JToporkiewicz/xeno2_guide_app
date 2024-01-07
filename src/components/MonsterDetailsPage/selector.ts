import { checkMonsterAvailability } from 'helpers/checkAvailability';
import { IMonster } from 'interfaces';
import { defaultMonster } from 'reduxState/interfaces/monsters';
import { getMonsters, getSelected, getStoryProgress, getLocations } from 'reduxState/selectors';
import { createSelector } from 'reselect';

export default createSelector(
  getMonsters,
  getSelected,
  getStoryProgress,
  getLocations,
  (monsters, selected, storyProgress, locations ) => {
    const foundMon: IMonster | undefined = monsters.find((mon) =>
      mon.id === selected.id && selected.area === 'monster'
    )
    if (foundMon) {
      return {
        monster: {
          ...foundMon,
          Available: checkMonsterAvailability(foundMon.LocationId, locations, storyProgress)
        }
      }
    }
    return {
      monster: defaultMonster
    }
  }
)