import { getItems, getSelected } from 'reduxState/selectors';
import { createSelector } from 'reselect';

export default createSelector(
  getItems,
  getSelected,
  (items, selected) => ({
    items,
    selected
  })
)