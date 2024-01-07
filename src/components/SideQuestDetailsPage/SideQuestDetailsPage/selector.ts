import {
  getQuests,
  getSelected,
  getBlades,
  getStoryProgress,
  getLocations,
  getMercMissions,
  getMonsters,
  getFieldSkills,
  getHeart2Heart
} from 'reduxState/selectors';
import { createSelector } from 'reselect';
import { defaultSideQuest } from 'reduxState/interfaces/quest';
import { checkAllAvailability } from 'helpers/checkAvailability';
import { IQuestAvailability } from 'reduxState/interfaces/availabilityState';

export default createSelector(
  getQuests,
  getSelected,
  getBlades,
  getStoryProgress,
  getLocations,
  getMonsters,
  getFieldSkills,
  getMercMissions,
  getHeart2Heart,
  (
    quests,
    selected,
    blades,
    storyProgress,
    locations,
    monsters,
    fieldSkills,
    mercMissions,
    heart2Hearts,
  ) => {
    const foundQuest: IQuestAvailability = checkAllAvailability(
      storyProgress,
      locations,
      monsters,
      blades,
      fieldSkills,
      heart2Hearts,
      quests,
      mercMissions
    ).sideQuests.find((q) =>
      q.id === selected.id && selected.area === 'sideQuest')
      || defaultSideQuest
    return {
      quest: foundQuest
    }
  }
)