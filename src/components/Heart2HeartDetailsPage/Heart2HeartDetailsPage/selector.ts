import {
  getHeart2Heart,
  getSelected,
  getBlades,
  getStoryProgress,
  getLocations,
  getMercMissions,
  getMonsters,
  getQuests,
  getFieldSkills
} from 'reduxState/selectors';
import { createSelector } from 'reselect';
import { defaultHeart2HeartState } from 'reduxState/interfaces/heart2Hearts';
import { checkAllAvailability } from 'helpers/checkAvailability';
import { IHeart2HeartAvailability } from 'reduxState/interfaces/availabilityState';

export default createSelector(
  getHeart2Heart,
  getSelected,
  getBlades,
  getStoryProgress,
  getLocations,
  getMonsters,
  getFieldSkills,
  getMercMissions,
  getQuests,
  (
    heart2Hearts,
    selected,
    blades,
    storyProgress,
    locations,
    monsters,
    fieldSkills,
    mercMissions,
    quests
  ) => {
    const foundH2H: IHeart2HeartAvailability = checkAllAvailability(
      storyProgress,
      locations,
      monsters,
      blades,
      fieldSkills,
      heart2Hearts,
      quests,
      mercMissions
    ).heart2Hearts.find((h2h) =>
      h2h.id === selected.id && selected.area === 'heart2Heart')
      || defaultHeart2HeartState
    return {
      heart2Heart: foundH2H
    }
  }
)