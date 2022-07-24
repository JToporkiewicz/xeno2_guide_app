import { getHeart2Heart, getSelected } from 'reduxState/selectors';
import { createSelector } from 'reselect';
import { defaultHeart2HeartState } from 'reduxState/interfaces/heart2Hearts';
import { IHeart2HeartState } from 'reduxState/interfaces/reduxState';

export default createSelector(
  getHeart2Heart,
  getSelected,
  (heart2Hearts, selected) => {
    const foundH2H: IHeart2HeartState = heart2Hearts.find((h2h) =>
      h2h.id === selected.id && selected.area === 'heart2Heart')
      || defaultHeart2HeartState
    return {
      heart2Heart: foundH2H
    }
  }
)