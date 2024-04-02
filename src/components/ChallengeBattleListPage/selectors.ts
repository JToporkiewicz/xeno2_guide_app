import { checkAllAvailability } from 'helpers/checkAvailability';
import {
  getQuests,
  getStoryProgress,
  getBlades,
  getLocations,
  getMercMissions,
  getMonsters,
  getFieldSkills,
  getHeart2Heart,
  getChallenges
} from 'reduxState/selectors';
import { createSelector } from 'reselect';

export default createSelector(
  getQuests,
  getStoryProgress,
  getBlades,
  getLocations,
  getMonsters,
  getFieldSkills,
  getMercMissions,
  getHeart2Heart,
  getChallenges,
  (
    quests,
    storyProgress,
    blades,
    locations,
    monsters,
    fieldSkills,
    mercMissions,
    heart2Hearts,
    challenges
  ) => ({
    challengeBattles: checkAllAvailability(
      storyProgress,
      locations,
      monsters,
      blades,
      fieldSkills,
      heart2Hearts,
      quests,
      mercMissions,
      challenges
    ).challengeBattles,
    storyProgress
  })
)