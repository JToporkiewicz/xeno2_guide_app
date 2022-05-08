import { createSelector } from 'reselect';
import { getHeart2Heart } from '../../../redux/selectors';

export default createSelector(
  getHeart2Heart,
  (heart2Hearts) => ({heart2Hearts})
)