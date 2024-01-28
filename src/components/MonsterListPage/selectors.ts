import { checkMonsterAvailability } from 'helpers/checkAvailability';
import { getLocations, getMonsters, getSelected, getStoryProgress } from 'reduxState/selectors';
import { createSelector } from 'reselect';

export default createSelector(
  getMonsters,
  getStoryProgress,
  getLocations,
  getSelected,
  (monsters, storyProgress, locations, selected) => ({
    monsters: monsters.map((mon) => ({
      ...mon,
      Available: checkMonsterAvailability(mon.LocationId, locations, storyProgress)
    })),
    storyProgress,
    locations,
    selected
  })
)