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
import { Routes } from 'helpers/routesConst';

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

      const nextBlade = availability.blades.find((d) =>
        d.id === (foundBlade.id === blades.length ? 1 : foundBlade.id + 1))
      let nextNavigation = {}
      if (nextBlade?.available
      || storyProgress.NewGamePlus
      || !storyProgress.OnlyShowAvailable) {
        nextNavigation = {
          nextLink: nextBlade ? Routes.BLADE + nextBlade.id : undefined,        
          nextId: nextBlade?.id,
          nextTitle: nextBlade?.name.replace(' (Awakened)', ''),
        }
      }
      
      const previousBlade = availability.blades.find((d) =>
        d.id === (foundBlade.id === 1 ? blades.length : foundBlade.id - 1))
      let previousNavigation = {}
      if (previousBlade?.available
      || storyProgress.NewGamePlus
      || !storyProgress.OnlyShowAvailable) {
        previousNavigation = {
          previousLink: previousBlade ? Routes.BLADE + previousBlade.id : undefined,        
          previousId: previousBlade?.id,
          previousTitle: previousBlade?.name.replace(' (Awakened)', '')
        }
      }
      return {
        bladeDetails: availability.blades.find((blade) =>
          blade.id === selected.id) || defaultBladeAvailability,
        headerNavigation: {
          area: 'blade',
          ...nextNavigation,
          ...previousNavigation
        },
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