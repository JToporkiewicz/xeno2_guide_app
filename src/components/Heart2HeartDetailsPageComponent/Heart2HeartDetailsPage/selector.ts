import { getHeart2Heart, getSelected } from 'reduxState/selectors';
import { createSelector } from 'reselect';
import { defaultHeart2HeartState } from 'reduxState/interfaces/heart2Hearts';

export default createSelector(
  getHeart2Heart,
  getSelected,
  (heart2Hearts, selected) => {
    const foundH2H = heart2Hearts.find((h2h) =>
      h2h.id === selected.id && selected.area === 'heart2Heart')
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