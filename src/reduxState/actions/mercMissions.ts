import { IMercMission } from 'interfaces';
import { IMMReqUpdate, IUpdateMMStatus } from 'reduxState/interfaces/mercMission';
import { IFluxAction, IFluxPayloadAction } from './fluxActions';

export enum MercMissionsActions {
  FetchAllMercMissionPrerequisites = 'FETCH_ALL_MERC_MISSION_PREREQUISITES',
  SetMercMissionPrerequisites = 'SET_MERC_MISSION_PREREQUISITES',
  FetchAllMercMissions = 'FETCH_ALL_MERC_MISSIONS',
  SetMercMissions = 'SET_MERC_MISSIONS',
  FetchAllMercMissionRequirements = 'FETCH_ALL_MERC_MISSION_REQUIREMENTS',
  SetMercMissionRequirements = 'SET_MERC_MISSION_REQUIREMENTS',
  UpdateMercMissionStatus = 'UPDATE_MERC_MISSION_STATUS',
  SaveMercMissionStatus = 'SAVE_MERC_MISSION_STATUS'
}

export type ActionTypes =
  | IFluxAction<MercMissionsActions.FetchAllMercMissions>
  | IFluxPayloadAction<MercMissionsActions.SetMercMissions, IMercMission[]>
  | IFluxAction<MercMissionsActions.FetchAllMercMissionRequirements>
  | IFluxPayloadAction<MercMissionsActions.SetMercMissionRequirements, IMMReqUpdate>
  | IFluxPayloadAction<MercMissionsActions.UpdateMercMissionStatus, IUpdateMMStatus>
  | IFluxPayloadAction<MercMissionsActions.SaveMercMissionStatus, IUpdateMMStatus>;

export const fetchAllMercMissions = ():ActionTypes => ({
  type: MercMissionsActions.FetchAllMercMissions
});

export const setMercMissions = (payload:IMercMission[]):ActionTypes => ({
  type: MercMissionsActions.SetMercMissions,
  payload
});

export const fetchAllMercMissionRequirements = ():ActionTypes => ({
  type: MercMissionsActions.FetchAllMercMissionRequirements
});

export const setMercMissionRequirements = (payload:IMMReqUpdate):ActionTypes => ({
  type: MercMissionsActions.SetMercMissionRequirements,
  payload
});

export const updateMercMissionStatus = (payload:IUpdateMMStatus):ActionTypes => ({
  type: MercMissionsActions.UpdateMercMissionStatus,
  payload
});

export const saveMercMissionStatus = (payload:IUpdateMMStatus):ActionTypes => ({
  type: MercMissionsActions.SaveMercMissionStatus,
  payload
});
