import { createSelector } from 'reselect';
import { getLoaderState } from 'reduxState/selectors';

export default createSelector(
  getLoaderState,
  (loaderState) => ({loaderState})
)