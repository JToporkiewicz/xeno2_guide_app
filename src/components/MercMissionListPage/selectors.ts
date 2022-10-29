import { getMercMissions, getStoryProgress } from 'reduxState/selectors';
import { createSelector } from 'reselect';

export default createSelector(
  getMercMissions,
  getStoryProgress,
  (mercMissions, storyProgress) => ({
    mercMissions,
    storyProgress
  })
)