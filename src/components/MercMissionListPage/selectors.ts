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
  getSelected,
  getChallenges
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
  getChallenges,
  (
    mercMissions,
    storyProgress,
    locations,
    blades,
    monsters,
    fieldSkills,
    heart2Hearts,
    quests,
    selected,
    challenges
  ) => ({
    mercMissions: checkAllAvailability(
      storyProgress,
      locations,
      monsters,
      blades,
      fieldSkills,
      heart2Hearts,
      quests,
      mercMissions,
      challenges
    ).mercMissions,
    storyProgress,
    locations,
    selected
  })
)