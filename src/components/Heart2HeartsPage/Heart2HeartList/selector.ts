import { getSelected, getStoryProgress } from 'reduxState/selectors';
import { createSelector } from 'reselect';

export default createSelector(
  getStoryProgress,
  getSelected,
  (storyProgress, selected) => ({storyProgress, selected})
);
