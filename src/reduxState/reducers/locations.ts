import createReducer from 'redux-action-reducer';
import { IMajorLocations } from '../interfaces/reduxState';

export const locationsReducer = createReducer<IMajorLocations[], IMajorLocations>()([]);
