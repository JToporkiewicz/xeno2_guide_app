import { checkAllAvailability } from 'helpers/checkAvailability';
import {
  getHeart2Heart,
  getLocations,
  getStoryProgress,
  getBlades,
  getMercMissions,
  getMonsters,
  getQuests,
  getFieldSkills
} from 'reduxState/selectors';
import { createSelector } from 'reselect';

export default createSelector(
  getHeart2Heart,
  getStoryProgress,
  getLocations,
  getBlades,
  getMonsters,
  getFieldSkills,
  getMercMissions,
  getQuests,
  (
    heart2Hearts,
    storyProgress,
    locations,
    blades,
    monsters,
    fieldSkills,
    mercMissions,
    quests
  ) => ({
    heart2Hearts: checkAllAvailability(
      storyProgress,
      locations,
      monsters,
      blades,
      fieldSkills,
      heart2Hearts,
      quests,
      mercMissions
    ).heart2Hearts,
    storyProgress,
    locations})
)