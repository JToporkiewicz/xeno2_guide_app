import { createSelector } from 'reselect';
import { getStoryProgress } from 'reduxState/selectors';

export default createSelector(
  getStoryProgress,
  (storyProgress) => ({storyProgress})
)