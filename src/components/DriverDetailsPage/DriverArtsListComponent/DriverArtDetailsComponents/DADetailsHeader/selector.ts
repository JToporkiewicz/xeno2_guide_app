import { createSelector } from 'reselect';
import { getBlades, getStoryProgress } from 'reduxState/selectors';

export default createSelector(
  getBlades,
  getStoryProgress,
  (blades, storyProgress) => ({
    blades,
    storyProgress
  })
)