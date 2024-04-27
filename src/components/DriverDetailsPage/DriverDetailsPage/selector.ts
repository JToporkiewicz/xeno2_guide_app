import { createSelector } from 'reselect';
import { defaultDriverState } from 'reduxState/interfaces/drivers';
import {
  getDrivers,
  getHeart2Heart,
  getItems,
  getItemTypes,
  getSelected,
  getStoryProgress,
  getLocations,
  getBlades,
  getMercMissions,
  getMonsters,
  getQuests,
  getFieldSkills,
  getChallenges

} from 'reduxState/selectors';
import { checkAllAvailability } from 'helpers/checkAvailability';
import { Routes } from 'helpers/routesConst';

export default createSelector(
  getDrivers,
  getStoryProgress,
  getSelected,
  getItems,
  getItemTypes,
  getHeart2Heart,
  getLocations,
  getBlades,
  getMonsters,
  getFieldSkills,
  getMercMissions,
  getQuests,
  getChallenges,
  (
    drivers,
    storyProgress,
    selected,
    items,
    itemTypes,
    heart2Hearts,
    locations,
    blades,
    monsters,
    fieldSkills,
    mercMissions,
    quests,
    challenges
  ) => {
    const foundDriver = drivers.find((driver) =>
      driver.id === selected.id && selected.area === 'driver')
    if (foundDriver) {
      const nextDriver = drivers.find((d) =>
        d.id === (foundDriver.id === drivers.length ? 1 : foundDriver.id + 1))
      let nextNavigation = {}
      if ((nextDriver?.chapterUnlocked || 10) <= storyProgress.Chapter
      || storyProgress.NewGamePlus
      || !storyProgress.OnlyShowAvailable) {
        nextNavigation = {
          nextLink: nextDriver ? Routes.DRIVER + nextDriver.id : undefined,        
          nextId: nextDriver?.id,
          nextTitle: nextDriver?.name,
        }
      }
      
      const previousDriver = drivers.find((d) =>
        d.id === (foundDriver.id === 1 ? drivers.length : foundDriver.id - 1))
      let previousNavigation = {}
      if ((previousDriver?.chapterUnlocked || 10) <= storyProgress.Chapter
      || storyProgress.NewGamePlus
      || !storyProgress.OnlyShowAvailable) {
        previousNavigation = {
          previousLink: previousDriver ? Routes.DRIVER + previousDriver.id : undefined,        
          previousId: previousDriver?.id,
          previousTitle: previousDriver?.name
        }
      }
      return {
        driverDetails: foundDriver,
        headerNavigation: {
          area: 'driver',
          ...nextNavigation,
          ...previousNavigation
        },
        item1: items.find((item) => item.id === foundDriver.favItem1),
        item2: items.find((item) => item.id === foundDriver.favItem2),
        itemType1: itemTypes.find((itemType) => itemType.id === foundDriver.favItemType1),
        itemType2: itemTypes.find((itemType) => itemType.id === foundDriver.favItemType2),
        storyProgress,
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
        ).heart2Hearts
      }
    }
    return {
      driverDetails: defaultDriverState,
      storyProgress,
      heart2Hearts: []
    }
  }
)