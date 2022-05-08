import { createSelector } from 'reselect';
import { getLoaderState } from '../../../redux/selectors';

export default createSelector(
  getLoaderState,
  (loaderState) => ({loaderState})
)