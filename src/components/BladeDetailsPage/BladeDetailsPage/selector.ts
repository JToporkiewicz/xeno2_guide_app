import { createSelector } from 'reselect';
import { defaultBladeState } from 'reduxState/interfaces/blades';
import {
  getBlades,
  getHeart2Heart,
  getItems,
  getItemTypes,
  getQuests,
  getSelected,
  getStoryProgress
} from 'reduxState/selectors';
import { defaultStoryProgress } from 'interfaces';

export default createSelector(
  getBlades,
  getItems,
  getItemTypes,
  getSelected,
  getHeart2Heart,
  getQuests,
  getStoryProgress,
  (blades, items, itemTypes, selected, heart2Hearts, quests, storyProgress) => {
    const foundBlade = blades.find((blade) =>
      blade.id === selected.id && selected.area === 'blade')
    if (foundBlade) {
      return {
        bladeDetails: foundBlade,
        item1: items.find((item) => item.id === foundBlade.favItem1),
        item2: items.find((item) => item.id === foundBlade.favItem2),
        itemType1: itemTypes.find((item) => item.id === foundBlade.favItemType1),
        itemType2: itemTypes.find((item) => item.id === foundBlade.favItemType2),
        heart2Heart: heart2Hearts.find((h2h) => h2h.id === foundBlade.heart2heartId),
        quest: quests.find((q) => q.id === foundBlade.bladeQuestId),
        storyProgress
      }
    }
    return {
      bladeDetails: defaultBladeState,
      storyProgress: defaultStoryProgress
    }
  }
)