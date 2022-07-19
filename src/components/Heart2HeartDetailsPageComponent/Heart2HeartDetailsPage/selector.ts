import { getHeart2Heart, getSelected } from '../../../redux/selectors';
import { createSelector } from 'reselect';
import { defaultHeart2HeartState } from 'redux/interfaces/heart2Hearts';

export default createSelector(
  getHeart2Heart,
  getSelected,
  (heart2Hearts, selected) => {
    const foundH2H = heart2Hearts.find((h2h) => h2h.id === selected.id)
    if (foundH2H) {
      return {
        heart2Heart: foundH2H
      }
    }
    return {
      heart2Heart: defaultHeart2HeartState
    }
  }
)