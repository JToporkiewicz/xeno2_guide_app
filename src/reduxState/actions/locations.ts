import { ILocations, IMajorAreas } from 'interfaces';
import { IUpdateDevelopmentLevel, IUpdateLocationMapped } from 'reduxState/interfaces/locations';
import { IMajorLocations, IUpdateUnlocked } from 'reduxState/interfaces/reduxState';
import { IFluxAction, IFluxPayloadAction } from './fluxActions';

export enum LocationActions {
  FetchAllMajorAreas = 'FETCH_ALL_MAJOR_AREAS',
  SetMajorAreas = 'SET_MAJOR_AREAS',
  FetchAllMinorLocations = 'FETCH_ALL_MINOR_LOCATIONS',
  SetMinorLocations = 'SET_MINOR_LOCATIONS',
  UpdateDevelopmentLevel = 'UPDATE_DEVELOPMENT_LEVEL',
  SaveDevelopmentLevel = 'SAVE_DEVELOPMENT_LEVEL',
  SetDependentMajorAreas = 'SET_DEPENDENT_MAJOR_AREAS',
  UpdateMappedLocation = 'UPDATE_MAPPED_LOCATION',
  SaveMappedLocations = 'SAVE_MAPPED_LOCATIONS'
}

export type ActionType =
  | IFluxAction<LocationActions.FetchAllMajorAreas>
  | IFluxPayloadAction<LocationActions.SetMajorAreas, IMajorAreas[]>
  | IFluxAction<LocationActions.FetchAllMinorLocations>
  | IFluxPayloadAction<LocationActions.SetMinorLocations, ILocations[]>
  | IFluxPayloadAction<LocationActions.UpdateDevelopmentLevel, IUpdateDevelopmentLevel>
  | IFluxPayloadAction<LocationActions.SaveDevelopmentLevel, IUpdateDevelopmentLevel>
  | IFluxPayloadAction<LocationActions.SetDependentMajorAreas, IMajorLocations[]>
  | IFluxPayloadAction<LocationActions.UpdateMappedLocation, IUpdateLocationMapped>
  | IFluxPayloadAction<LocationActions.SaveMappedLocations, IUpdateUnlocked>;

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

export const setDependentMajorAreas = (payload: IMajorLocations[]) => ({
  type: LocationActions.SetDependentMajorAreas,
  payload
});

export const updateMappedLocation = (payload: IUpdateLocationMapped) => ({
  type: LocationActions.UpdateMappedLocation,
  payload
});

export const saveMappedLocations = (payload: IUpdateUnlocked) => ({
  type: LocationActions.SaveMappedLocations,
  payload
});
