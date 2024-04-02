import { createSelector } from 'reselect';
import { defaultBladeAvailability } from 'reduxState/interfaces/blades';
import {
  getBlades,
  getChallenges,
  getFieldSkills,
  getHeart2Heart,
  getItems,
  getItemTypes,
  getLocations,
  getMercMissions,
  getMonsters,
  getQuests,
  getSelected,
  getStoryProgress
} from 'reduxState/selectors';
import { defaultStoryProgress } from 'interfaces';
import { checkAllAvailability } from 'helpers/checkAvailability';

export default createSelector(
  getBlades,
  getItems,
  getItemTypes,
  getSelected,
  getHeart2Heart,
  getQuests,
  getStoryProgress,
  getLocations,
  getMonsters,
  getFieldSkills,
  getMercMissions,
  getChallenges,
  (
    blades,
    items,
    itemTypes,
    selected,
    heart2Hearts,
    quests,
    storyProgress,
    locations,
    monsters,
    fieldSkills,
    mercMissions,
    challenges
  ) => {
    const foundBlade = blades.find((blade) =>
      blade.id === selected.id && selected.area === 'blade')
    if (foundBlade) {
      const availability = checkAllAvailability(
        storyProgress,
        locations,
        monsters,
        blades,
        fieldSkills,
        heart2Hearts,
        quests,
        mercMissions,
        challenges
      )
      return {
        bladeDetails: availability.blades.find((blade) =>
          blade.id === selected.id) || defaultBladeAvailability,
        item1: items.find((item) => item.id === foundBlade.favItem1),
        item2: items.find((item) => item.id === foundBlade.favItem2),
        itemType1: itemTypes.find((item) => item.id === foundBlade.favItemType1),
        itemType2: itemTypes.find((item) => item.id === foundBlade.favItemType2),
        heart2Heart: availability.heart2Hearts.find((h2h) => h2h.id === foundBlade.heart2heartId),
        quest: availability.sideQuests.find((q) => q.id === foundBlade.bladeQuestId),
        storyProgress
      }
    }
    return {
      bladeDetails: defaultBladeAvailability,
      storyProgress: defaultStoryProgress
    }
  }
)