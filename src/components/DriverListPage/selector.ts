import { createSelector } from 'reselect';
import { getDrivers, getStoryProgress } from 'reduxState/selectors';

export default createSelector(
  getDrivers,
  getStoryProgress,
  (drivers, storyProgress) => (
    {
      drivers,
      storyProgress
    }
  )
)