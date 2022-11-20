import { getLocations, getMercMissions, getStoryProgress } from 'reduxState/selectors';
import { createSelector } from 'reselect';

export default createSelector(
  getMercMissions,
  getStoryProgress,
  getLocations,
  (mercMissions, storyProgress, locations) => ({
    mercMissions,
    storyProgress,
    locations
  })
)