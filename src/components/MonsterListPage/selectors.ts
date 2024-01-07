import { checkMonsterAvailability } from 'helpers/checkAvailability';
import { getLocations, getMonsters, getStoryProgress } from 'reduxState/selectors';
import { createSelector } from 'reselect';

export default createSelector(
  getMonsters,
  getStoryProgress,
  getLocations,
  (monsters, storyProgress, locations) => ({
    monsters: monsters.map((mon) => ({
      ...mon,
      Available: checkMonsterAvailability(mon.LocationId, locations, storyProgress)
    })),
    storyProgress,
    locations
  })
)