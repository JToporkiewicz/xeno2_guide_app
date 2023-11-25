import { getBlades, getDrivers, getSelected, getStoryProgress } from 'reduxState/selectors';
import { createSelector } from 'reselect';

export default createSelector(
  getBlades,
  getDrivers,
  getStoryProgress,
  getSelected,
  (blades, drivers, storyProgress, selected) =>
  {
    const foundDriver = drivers.find((driver) =>
      driver.id === selected.id && selected.area === 'driver')
    if (foundDriver) {
      return {
        blades,
        driverUnlocked: foundDriver.chapterUnlocked <= storyProgress.Chapter
      }
    }
    return {
      blades: [],
      driverUnlocked: false
    }
  }
)