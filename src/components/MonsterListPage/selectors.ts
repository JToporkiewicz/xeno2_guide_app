import { getLocations, getMonsters, getStoryProgress } from 'reduxState/selectors';
import { createSelector } from 'reselect';

export default createSelector(
  getMonsters,
  getStoryProgress,
  getLocations,
  (monsters, storyProgress, locations) => ({
    monsters,
    storyProgress,
    locations
  })
)