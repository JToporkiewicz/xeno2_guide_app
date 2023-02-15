import { IDriver } from 'interfaces';
import {
  IDriverSkillNodeUpdate,
  IDriverArtUpdateLevelUnlocked,
  IUpdateArtLevel
} from '../interfaces/drivers';
import { IUpdateShow, IUpdateUnlocked } from '../interfaces/reduxState';
import { IFluxAction, IFluxPayloadAction } from './fluxActions';

export enum DriverActions {
  FetchAllDrivers = 'FETCH_ALL_DRIVERS',
  FetchDriverDetails = 'FETCH_DRIVER_DETAILS',
  SetDriverDetails = 'SET_DRIVER_DETAILS',
  UpdateShowDriver = 'UPDATE_SHOW_DRIVER',
  SetDriverSkillNode = 'SET_DRIVER_SKILL_NODE',
  SaveDriverSkillNode = 'SAVE_DRIVER_SKILL_NODE',
  UpdateDriverArtLevelUnlocked = 'UPDATE_DRIVER_ART_LEVEL_UNLOCKED',
  SaveDriverArtLevel = 'SAVE_DRIVER_ART_LEVEL',
}

export type ActionTypes =
  | IFluxAction<DriverActions.FetchAllDrivers>
  | IFluxPayloadAction<DriverActions.FetchDriverDetails, number>
  | IFluxPayloadAction<DriverActions.SetDriverDetails, IDriver[]>
  | IFluxPayloadAction<DriverActions.UpdateShowDriver, IUpdateShow>
  | IFluxPayloadAction<DriverActions.SetDriverSkillNode, IDriverSkillNodeUpdate>
  | IFluxPayloadAction<DriverActions.SaveDriverSkillNode, IUpdateUnlocked>
  | IFluxPayloadAction<DriverActions.UpdateDriverArtLevelUnlocked, IDriverArtUpdateLevelUnlocked>
  | IFluxPayloadAction<DriverActions.SaveDriverArtLevel, IUpdateArtLevel[]>;

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

export const setDriverSkillNode = (payload:IDriverSkillNodeUpdate):ActionTypes => ({
  type: DriverActions.SetDriverSkillNode,
  payload
});

export const saveDriverSkillNode = (payload:IUpdateUnlocked):ActionTypes => ({
  type: DriverActions.SaveDriverSkillNode,
  payload
});

export const updateDriverArtLevelUnlocked = (
  payload:IDriverArtUpdateLevelUnlocked
):ActionTypes => ({
  type: DriverActions.UpdateDriverArtLevelUnlocked,
  payload
});

export const saveDriverArtLevel = (payload:IUpdateArtLevel[]):ActionTypes => ({
  type: DriverActions.SaveDriverArtLevel,
  payload
});
