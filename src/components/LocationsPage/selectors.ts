import { getLocations, getStoryProgress } from 'reduxState/selectors';
import { createSelector } from 'reselect';

export default createSelector(
  getLocations,
  getStoryProgress,
  (majorAreas, storyProgress) => ({
    majorAreas,
    storyProgress
  })
)