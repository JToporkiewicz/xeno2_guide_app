import { checkAllAvailability } from 'helpers/checkAvailability';
import { IMercMissionAvailability } from 'reduxState/interfaces/availabilityState';
import { defaultMercMission } from 'reduxState/interfaces/mercMission';
import {
  getMercMissions,
  getSelected,
  getStoryProgress,
  getBlades,
  getLocations,
  getMonsters,
  getQuests,
  getFieldSkills,
  getHeart2Heart
} from 'reduxState/selectors';
import { createSelector } from 'reselect';

export default createSelector(
  getMercMissions,
  getSelected,
  getStoryProgress,
  getBlades,
  getLocations,
  getMonsters,
  getFieldSkills,
  getHeart2Heart,
  getQuests,
  (
    mercMissions,
    selected,
    storyProgress,
    blades,
    locations,
    monsters,
    fieldSkills,
    heart2Hearts,
    quests
  ) => {
    const foundMM: IMercMissionAvailability = checkAllAvailability(
      storyProgress,
      locations,
      monsters,
      blades,
      fieldSkills,
      heart2Hearts,
      quests,
      mercMissions
    ).mercMissions.find((mm) =>
      mm.id === selected.id && selected.area === 'mercMission'
    ) || defaultMercMission
    return {
      mercMission: foundMM,
      storyProgress
    }
  }
)