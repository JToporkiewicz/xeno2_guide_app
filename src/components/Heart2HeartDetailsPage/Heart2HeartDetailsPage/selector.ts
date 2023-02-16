import { getHeart2Heart, getSelected } from 'reduxState/selectors';
import { createSelector } from 'reselect';
import { defaultHeart2HeartState } from 'reduxState/interfaces/heart2Hearts';
import { IHeart2Heart } from 'interfaces';

export default createSelector(
  getHeart2Heart,
  getSelected,
  (heart2Hearts, selected) => {
    const foundH2H: IHeart2Heart = heart2Hearts.find((h2h) =>
      h2h.id === selected.id && selected.area === 'heart2Heart')
      || defaultHeart2HeartState
    return {
      heart2Heart: foundH2H
    }
  }
)