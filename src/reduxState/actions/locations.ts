import { ILocations, IMajorAreas } from 'interfaces';
import { IUpdateDevelopmentLevel } from 'reduxState/interfaces/locations';
import { IFluxAction, IFluxPayloadAction } from './fluxActions';

export enum LocationActions {
  FetchAllMajorAreas = 'FETCH_ALL_MAJOR_AREAS',
  SetMajorAreas = 'SET_MAJOR_AREAS',
  FetchAllMinorLocations = 'FETCH_ALL_MINOR_LOCATIONS',
  SetMinorLocations = 'SET_MINOR_LOCATIONS',
  UpdateDevelopmentLevel = 'UPDATE_DEVELOPMENT_LEVEL',
  SaveDevelopmentLevel = 'SAVE_DEVELOPMENT_LEVEL'
}

export type ActionType =
  | IFluxAction<LocationActions.FetchAllMajorAreas>
  | IFluxPayloadAction<LocationActions.SetMajorAreas, IMajorAreas[]>
  | IFluxAction<LocationActions.FetchAllMinorLocations>
  | IFluxPayloadAction<LocationActions.SetMinorLocations, ILocations[]>
  | IFluxPayloadAction<LocationActions.UpdateDevelopmentLevel, IUpdateDevelopmentLevel>
  | IFluxPayloadAction<LocationActions.SaveDevelopmentLevel, IUpdateDevelopmentLevel>;

export const fetchAllMajorAreas = () => ({
  type: LocationActions.FetchAllMajorAreas
});

export const setMajorAreas = (payload: IMajorAreas[]) => ({
  type: LocationActions.SetMajorAreas,
  payload
});

export const fetchAllMinorLocations = () => ({
  type: LocationActions.FetchAllMinorLocations
});

export const setMinorLocations = (payload: ILocations[]) => ({
  type: LocationActions.SetMinorLocations,
  payload
});

export const updateDevelopmentLevel = (payload: IUpdateDevelopmentLevel) => ({
  type: LocationActions.UpdateDevelopmentLevel,
  payload
});

export const saveDevelopmentLevel = (payload: IUpdateDevelopmentLevel) => ({
  type: LocationActions.SaveDevelopmentLevel,
  payload
});
