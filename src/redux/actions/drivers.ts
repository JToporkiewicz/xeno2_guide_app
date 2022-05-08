import { IDriver } from '../../interfaces';
import {
  IDriverArtUpdateData,
  IDriverSkillNodeRequest,
  IDriverSkillNodeResponse,
  IDriverSkillNodeUpdate,
  IDriverArtListResponse,
  IDriverArtNodeRequest,
  IDriverArtNodeResponse,
  IDriverArtOneListUpdate
} from '../interfaces/drivers';
import { IUpdateShow } from '../interfaces/reduxState';
import { IFluxAction, IFluxPayloadAction } from './fluxActions';

export enum DriverActions {
  FetchAllDrivers = 'FETCH_ALL_DRIVERS',
  FetchDriverDetails = 'FETCH_DRIVER_DETAILS',
  SetDriverDetails = 'SET_DRIVER_DETAILS',
  UpdateShowDriver = 'UPDATE_SHOW_DRIVER',
  FetchDriverSkillTree = 'FETCH_DRIVER_SKILL_TREE',
  FetchDriverSkillNodes = 'FETCH_DRIVER_SKILL_NODES',
  SetDriverSkillNode = 'SET_DRIVER_SKILL_NODE',
  SaveDriverSkillNode = 'SAVE_DRIVER_SKILL_NODE',
  FetchDriverArtList = 'FETCH_DRIVER_ART_LIST',
  SetDriverArtAllLists = 'SET_DRIVER_ART_ALL_LISTS',
  SetDriverArtOneList = 'SET_DRIVER_ART_ONE_LIST',
  SaveDriverArtLevel = 'SAVE_DRIVER_ART_LEVEL',
  FetchDriverArtNode = 'FETCH_DRIVER_ART_NODE',
  SetDriverArtNode = 'SET_DRIVER_ART_NODE',
}

export type ActionTypes =
  | IFluxAction<DriverActions.FetchAllDrivers>
  | IFluxPayloadAction<DriverActions.FetchDriverDetails, number>
  | IFluxPayloadAction<DriverActions.SetDriverDetails, IDriver[]>
  | IFluxPayloadAction<DriverActions.UpdateShowDriver, IUpdateShow>
  | IFluxPayloadAction<DriverActions.FetchDriverSkillTree, number>
  | IFluxPayloadAction<DriverActions.FetchDriverSkillNodes, IDriverSkillNodeRequest>
  | IFluxPayloadAction<DriverActions.SetDriverSkillNode, IDriverSkillNodeResponse>
  | IFluxPayloadAction<DriverActions.SaveDriverSkillNode, IDriverSkillNodeUpdate>
  | IFluxPayloadAction<DriverActions.FetchDriverSkillNodes, number>
  | IFluxPayloadAction<DriverActions.FetchDriverArtList, number>
  | IFluxPayloadAction<DriverActions.SetDriverArtAllLists, IDriverArtListResponse>
  | IFluxPayloadAction<DriverActions.SetDriverArtOneList, IDriverArtOneListUpdate>
  | IFluxPayloadAction<DriverActions.SaveDriverArtLevel, IDriverArtUpdateData>
  | IFluxPayloadAction<DriverActions.FetchDriverArtNode, IDriverArtNodeRequest>
  | IFluxPayloadAction<DriverActions.SetDriverArtNode, IDriverArtNodeResponse>;

export const fetchAllDrivers = ():ActionTypes => ({
  type: DriverActions.FetchAllDrivers
})

export const fetchDriverDetails = (payload:number):ActionTypes => ({
  type: DriverActions.FetchDriverDetails,
  payload
});

export const setDriverDetails = (payload:IDriver[]):ActionTypes => ({
  type: DriverActions.SetDriverDetails,
  payload
});

export const updateShowDriver = (payload:IUpdateShow):ActionTypes => ({
  type: DriverActions.UpdateShowDriver,
  payload
})

export const fetchDriverSkillTree = (payload:number):ActionTypes => ({
  type: DriverActions.FetchDriverSkillTree,
  payload
});

export const fetchDriverSkillNodes = (payload:IDriverSkillNodeRequest):ActionTypes => ({
  type: DriverActions.FetchDriverSkillNodes,
  payload
});

export const setDriverSkillNode = (payload:IDriverSkillNodeResponse):ActionTypes => ({
  type: DriverActions.SetDriverSkillNode,
  payload
});

export const saveDriverSkillNode = (payload:IDriverSkillNodeUpdate):ActionTypes => ({
  type: DriverActions.SaveDriverSkillNode,
  payload
});

export const fetchDriverArtList = (payload:number):ActionTypes => ({
  type: DriverActions.FetchDriverArtList,
  payload
});

export const setDriverArtAllLists = (payload:IDriverArtListResponse):ActionTypes => ({
  type: DriverActions.SetDriverArtAllLists,
  payload
});

export const setDriverArtOneList = (payload:IDriverArtOneListUpdate):ActionTypes => ({
  type: DriverActions.SetDriverArtOneList,
  payload
});

export const saveDriverArtLevel = (payload:IDriverArtUpdateData):ActionTypes => ({
  type: DriverActions.SaveDriverArtLevel,
  payload
});

export const fetchDriverArtNode = (payload:IDriverArtNodeRequest):ActionTypes => ({
  type: DriverActions.FetchDriverArtNode,
  payload
});

export const setDriverArtNode = (payload:IDriverArtNodeResponse):ActionTypes => ({
  type: DriverActions.SetDriverArtNode,
  payload
});
