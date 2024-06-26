import { bladeFilter } from 'helpers/bladeFilter';
import { checkAllAvailability } from 'helpers/checkAvailability';
import {
  getBlades,
  getDrivers,
  getSelected,
  getStoryProgress,
  getLocations,
  getMercMissions,
  getMonsters,
  getQuests,
  getFieldSkills,
  getHeart2Heart,
  getChallenges
} from 'reduxState/selectors';
import { createSelector } from 'reselect';

export default createSelector(
  getBlades,
  getDrivers,
  getStoryProgress,
  getSelected,
  getLocations,
  getMonsters,
  getFieldSkills,
  getMercMissions,
  getHeart2Heart,
  getQuests,
  getChallenges,
  (
    blades,
    drivers,
    storyProgress,
    selected,
    locations,
    monsters,
    fieldSkills,
    mercMissions,
    heart2Hearts,
    quests,
    challenges
  ) =>
  {
    const foundDriver = drivers.find((driver) =>
      driver.id === selected.id && selected.area === 'driver')
    if (foundDriver) {
      return {
        blades: bladeFilter(checkAllAvailability(
          storyProgress,
          locations,
          monsters,
          blades,
          fieldSkills,
          heart2Hearts,
          quests,
          mercMissions,
          challenges
        ).blades, quests),
        driverUnlocked: foundDriver.chapterUnlocked <= storyProgress.Chapter
      }
    }
    return {
      blades: [],
      driverUnlocked: false
    }
  }
)