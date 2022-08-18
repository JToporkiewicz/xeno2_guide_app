import { getQuests, getSelected } from 'reduxState/selectors';
import { createSelector } from 'reselect';
import { IQuestState } from 'reduxState/interfaces/reduxState';
import { defaultSideQuest } from 'reduxState/interfaces/quest';

export default createSelector(
  getQuests,
  getSelected,
  (quests, selected) => {
    const foundQuest: IQuestState = quests.find((q) =>
      q.id === selected.id && selected.area === 'sideQuest')
      || defaultSideQuest
    return {
      quest: foundQuest
    }
  }
)