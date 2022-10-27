import { getQuests, getStoryProgress } from 'reduxState/selectors';
import { createSelector } from 'reselect';

export default createSelector(
  getQuests,
  getStoryProgress,
  (quests, storyProgress) => ({
    quests,
    storyProgress
  })
)