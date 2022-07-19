import { createSelector } from 'reselect';
import { getHeart2Heart } from 'reduxState/selectors';

export default createSelector(
  getHeart2Heart,
  (heart2Hearts) => ({heart2Hearts})
)