import { createSelector } from 'reselect';
import {
  getBlades,
  getStoryProgress,
  getLocations,
  getMercMissions,
  getMonsters,
  getQuests,
  getFieldSkills,
  getHeart2Heart,
  getChallenges
} from 'reduxState/selectors';
import { checkAllAvailability } from 'helpers/checkAvailability';

export default createSelector(
  getBlades,
  getStoryProgress,
  getLocations,
  getMonsters,
  getFieldSkills,
  getMercMissions,
  getHeart2Heart,
  getQuests,
  getChallenges,
  (
    blades,
    storyProgress,
    locations,
    monsters,
    fieldSkills,
    mercMissions,
    heart2Hearts,
    quests,
    challenges
  ) => ({
    fieldSkills: checkAllAvailability(
      storyProgress,
      locations,
      monsters,
      blades,
      fieldSkills,
      heart2Hearts,
      quests,
      mercMissions,
      challenges
    ).fieldSkills,
  })
)