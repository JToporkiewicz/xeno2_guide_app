import { getSelected } from 'reduxState/selectors';
import { createSelector } from 'reselect';

export default createSelector(
  getSelected,
  (selected) => {
    return {
      selected: selected
    }
  }
)