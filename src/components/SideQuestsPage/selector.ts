import { getQuests } from 'reduxState/selectors';
import { createSelector } from 'reselect';

export default createSelector(
  getQuests,
  (quests) => ({
    quests
  })
)