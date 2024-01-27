import { checkAllAvailability } from 'helpers/checkAvailability';
import {
  getLocations,
  getMercMissions,
  getStoryProgress,
  getBlades,
  getMonsters,
  getQuests,
  getFieldSkills,
  getHeart2Heart,
  getSelected
} from 'reduxState/selectors';
import { createSelector } from 'reselect';

export default createSelector(
  getMercMissions,
  getStoryProgress,
  getLocations,
  getBlades,
  getMonsters,
  getFieldSkills,
  getHeart2Heart,
  getQuests,
  getSelected,
  (
    mercMissions,
    storyProgress,
    locations,
    blades,
    monsters,
    fieldSkills,
    heart2Hearts,
    quests,
    selected
  ) => ({
    mercMissions: checkAllAvailability(
      storyProgress,
      locations,
      monsters,
      blades,
      fieldSkills,
      heart2Hearts,
      quests,
      mercMissions
    ).mercMissions,
    storyProgress,
    locations,
    selected
  })
)