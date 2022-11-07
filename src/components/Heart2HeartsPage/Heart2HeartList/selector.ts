import { getStoryProgress } from 'reduxState/selectors';
import { createSelector } from 'reselect';

export default createSelector(
  getStoryProgress,
  (storyProgress) => ({storyProgress})
);
