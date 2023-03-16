import { getQuests, getSelected } from 'reduxState/selectors';
import { createSelector } from 'reselect';
import { defaultSideQuest } from 'reduxState/interfaces/quest';
import { IQuest } from 'interfaces';

export default createSelector(
  getQuests,
  getSelected,
  (quests, selected) => {
    const foundQuest: IQuest = quests.find((q) =>
      q.id === selected.id && selected.area === 'sideQuest')
      || defaultSideQuest
    return {
      quest: foundQuest
    }
  }
)