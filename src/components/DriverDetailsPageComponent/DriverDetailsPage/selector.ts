import { createSelector } from 'reselect';
import { defaultDriverState } from 'reduxState/interfaces/drivers';
import {
  getDrivers,
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
  (drivers, storyProgress, selected, items, itemTypes) => {
    const foundDriver = drivers.find((driver) => driver.id === selected.id)
    if (foundDriver) {
      return {
        driverDetails: foundDriver,
        item1: items.find((item) => item.id === foundDriver.favItem1),
        item2: items.find((item) => item.id === foundDriver.favItem2),
        itemType1: itemTypes.find((itemType) => itemType.id === foundDriver.favItemType1),
        itemType2: itemTypes.find((itemType) => itemType.id === foundDriver.favItemType2),
        storyProgress
      }
    }
    return {
      driverDetails: defaultDriverState,
      storyProgress
    }
  }
)