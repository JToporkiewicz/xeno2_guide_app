import { createSelector } from 'reselect';
import { getDrivers, getStoryProgress, getLoaderState } from '../../redux/selectors';

export default createSelector(
  getDrivers,
  getStoryProgress,
  getLoaderState,
  (drivers, storyProgress, loaderState) => (
    {
      drivers,
      storyProgress,
      loaderState
    }
  )
)