import { createSelector } from 'reselect';
import { getLoaderState, getSavingStatus } from 'reduxState/selectors';

export default createSelector(
  getLoaderState,
  getSavingStatus,
  (loaderState, saving) => ({loaderState, saving})
)