import { createSelector } from 'reselect';
import { getStoryProgress } from '../../../redux/selectors';

export default createSelector(
  getStoryProgress,
  (storyProgress) => ({storyProgress})
)