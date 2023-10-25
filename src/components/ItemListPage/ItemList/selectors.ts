import { getLocations, getStoryProgress } from 'reduxState/selectors';
import { createSelector } from 'reselect';

export default createSelector(
  getLocations,
  getStoryProgress,
  (locations, storyProgress) => ({storyProgress, locations})
)