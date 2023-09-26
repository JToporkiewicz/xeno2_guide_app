import { getLocations, getStoryProgress } from 'reduxState/selectors';
import { createSelector } from 'reselect';

export default createSelector(
  getStoryProgress,
  getLocations,
  (storyProgress, locations) => ({
    storyProgress,
    locations
  })
)