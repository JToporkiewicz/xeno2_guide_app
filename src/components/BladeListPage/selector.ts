import { createSelector } from 'reselect';
import {
  getBlades,
  getStoryProgress,
  getLocations,
  getMercMissions,
  getMonsters,
  getQuests,
  getFieldSkills,
  getHeart2Heart
} from 'reduxState/selectors';
import { checkAllAvailability } from 'helpers/checkAvailability';
import { bladeFilter } from 'helpers/bladeFilter';

export default createSelector(
  getBlades,
  getStoryProgress,
  getLocations,
  getMonsters,
  getFieldSkills,
  getMercMissions,
  getHeart2Heart,
  getQuests,
  (
    blades,
    storyProgress,
    locations,
    monsters,
    fieldSkills,
    mercMissions,
    heart2Hearts,
    quests
  ) => ({
    blades: bladeFilter(checkAllAvailability(
      storyProgress,
      locations,
      monsters,
      blades,
      fieldSkills,
      heart2Hearts,
      quests,
      mercMissions
    ).blades, quests),
    storyProgress,
  })
)