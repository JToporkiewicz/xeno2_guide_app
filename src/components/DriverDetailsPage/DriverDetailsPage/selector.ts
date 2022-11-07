import { createSelector } from 'reselect';
import { defaultDriverState } from 'reduxState/interfaces/drivers';
import {
  getDrivers,
  getHeart2Heart,
  getItems,
  getItemTypes,
  getSelected,
  getStoryProgress
} from 'reduxState/selectors';

export default createSelector(
  getDrivers,
  getStoryProgress,
  getSelected,
  getItems,
  getItemTypes,
  getHeart2Heart,
  (drivers, storyProgress, selected, items, itemTypes, heart2Hearts) => {
    const foundDriver = drivers.find((driver) =>
      driver.id === selected.id && selected.area === 'driver')
    if (foundDriver) {
      return {
        driverDetails: foundDriver,
        item1: items.find((item) => item.id === foundDriver.favItem1),
        item2: items.find((item) => item.id === foundDriver.favItem2),
        itemType1: itemTypes.find((itemType) => itemType.id === foundDriver.favItemType1),
        itemType2: itemTypes.find((itemType) => itemType.id === foundDriver.favItemType2),
        storyProgress,
        heart2Hearts
      }
    }
    return {
      driverDetails: defaultDriverState,
      storyProgress,
      heart2Hearts: []
    }
  }
)