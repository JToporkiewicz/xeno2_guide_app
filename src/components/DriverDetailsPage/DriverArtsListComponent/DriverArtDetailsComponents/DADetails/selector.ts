import { getBlades } from 'reduxState/selectors';
import { createSelector } from 'reselect';

export default createSelector(getBlades, (blades) => ({blades}))