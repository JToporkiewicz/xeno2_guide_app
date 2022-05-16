import { createSelector } from 'reselect';
import { getDrivers, getStoryProgress } from '../../redux/selectors';

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