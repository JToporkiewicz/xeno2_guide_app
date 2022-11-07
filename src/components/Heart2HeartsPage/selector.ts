import { getHeart2Heart, getLocations, getStoryProgress } from 'reduxState/selectors';
import { createSelector } from 'reselect';

export default createSelector(
  getHeart2Heart,
  getStoryProgress,
  getLocations,
  (heart2Hearts, storyProgress, locations) => ({heart2Hearts, storyProgress, locations})
)