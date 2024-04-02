import { checkAllAvailability } from 'helpers/checkAvailability';
import {
  getHeart2Heart,
  getLocations,
  getStoryProgress,
  getBlades,
  getMercMissions,
  getMonsters,
  getQuests,
  getFieldSkills,
  getChallenges
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
  getChallenges,
  (
    heart2Hearts,
    storyProgress,
    locations,
    blades,
    monsters,
    fieldSkills,
    mercMissions,
    quests,
    challenges
  ) => ({
    heart2Hearts: checkAllAvailability(
      storyProgress,
      locations,
      monsters,
      blades,
      fieldSkills,
      heart2Hearts,
      quests,
      mercMissions,
      challenges
    ).heart2Hearts,
    storyProgress,
    locations})
)