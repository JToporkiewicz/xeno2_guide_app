import { createSelector } from 'reselect';
import { getBlades, getStoryProgress } from '../../redux/selectors';

export default createSelector(
  getBlades,
  getStoryProgress,
  (blades, storyProgress) => ({
    blades,
    storyProgress
  })
)