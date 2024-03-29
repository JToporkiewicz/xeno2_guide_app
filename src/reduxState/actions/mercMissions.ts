import { IMercMission } from 'interfaces';
import { IUpdateMMStatus } from 'reduxState/interfaces/mercMission';
import { IUpdateUnlocked } from 'reduxState/interfaces/reduxState';
import { IFluxAction, IFluxPayloadAction } from './fluxActions';

export enum MercMissionsActions {
  FetchAllMercMissionPrerequisites = 'FETCH_ALL_MERC_MISSION_PREREQUISITES',
  SetMercMissionPrerequisites = 'SET_MERC_MISSION_PREREQUISITES',
  FetchAllMercMissions = 'FETCH_ALL_MERC_MISSIONS',
  SetMercMissions = 'SET_MERC_MISSIONS',
  FetchAllMercMissionRequirements = 'FETCH_ALL_MERC_MISSION_REQUIREMENTS',
  SetMercMissionRequirements = 'SET_MERC_MISSION_REQUIREMENTS',
  UpdateMercMissionStatus = 'UPDATE_MERC_MISSION_STATUS',
  SaveMercMissionStatus = 'SAVE_MERC_MISSION_STATUS',
  FetchMercMission = 'FETCH_MERC_MISSION',
  FetchMercMissionRequirements = 'FETCH_MERC_MISSION_REQUIREMENTS'
}

export type ActionTypes =
  | IFluxAction<MercMissionsActions.FetchAllMercMissions>
  | IFluxPayloadAction<MercMissionsActions.SetMercMissions, IMercMission[]>
  | IFluxPayloadAction<MercMissionsActions.UpdateMercMissionStatus, IUpdateMMStatus>
  | IFluxPayloadAction<MercMissionsActions.SaveMercMissionStatus, IUpdateUnlocked>
  | IFluxPayloadAction<MercMissionsActions.FetchMercMission, string>;

export const fetchAllMercMissions = ():ActionTypes => ({
  type: MercMissionsActions.FetchAllMercMissions
});

export const setMercMissions = (payload:IMercMission[]):ActionTypes => ({
  type: MercMissionsActions.SetMercMissions,
  payload
});

export const updateMercMissionStatus = (payload:IUpdateMMStatus):ActionTypes => ({
  type: MercMissionsActions.UpdateMercMissionStatus,
  payload
});

export const saveMercMissionStatus = (payload:IUpdateUnlocked):ActionTypes => ({
  type: MercMissionsActions.SaveMercMissionStatus,
  payload
});

export const fetchMercMission = (payload:string):ActionTypes => ({
  type: MercMissionsActions.FetchMercMission,
  payload
});
