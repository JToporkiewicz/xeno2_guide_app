import {
  IDriver,
  IDriverArtDetails,
  IDriverArts,
  IDriverSkillNode,
  IDriverSkillTree
} from '../../interfaces';
import {
  IDriverArtUpdateData,
  IDriverSkillNodeUpdate,
  IDriverArtNodeRequest,
  IDriverArtUpdateLevelUnlocked
} from '../interfaces/drivers';
import { IUpdateShow } from '../interfaces/reduxState';
import { IFluxAction, IFluxPayloadAction } from './fluxActions';

export enum DriverActions {
  FetchAllDrivers = 'FETCH_ALL_DRIVERS',
  FetchDriverDetails = 'FETCH_DRIVER_DETAILS',
  SetDriverDetails = 'SET_DRIVER_DETAILS',
  UpdateShowDriver = 'UPDATE_SHOW_DRIVER',
  FetchAllDriverSkillTrees = 'FETCH_ALL_DRIVER_SKILL_TREES',
  FetchDriverSkillTree = 'FETCH_DRIVER_SKILL_TREE',
  SetDriverSkillTree = 'SET_DRIVER_SKILL_TREE',
  FetchAllDriverSkillNodes = 'FETCH_ALL_DRIVER_SKILL_NODES',
  FetchDriverSkillNodes = 'FETCH_DRIVER_SKILL_NODES',
  SetDriverSkillNode = 'SET_DRIVER_SKILL_NODE',
  SaveDriverSkillNode = 'SAVE_DRIVER_SKILL_NODE',
  FetchAllDriverArtLists = 'FETCH_ALL_DRIVER_ART_LISTS',
  FetchDriverArtList = 'FETCH_DRIVER_ART_LIST',
  SetDriverArtList = 'SET_DRIVER_ART_LIST',
  UpdateDriverArtLevelUnlocked = 'UPDATE_DRIVER_ART_LEVEL_UNLOCKED',
  SaveDriverArtLevel = 'SAVE_DRIVER_ART_LEVEL',
  FetchAllDriverArtNodes = 'FETCH_ALL_DRIVER_ART_NODES',
  FetchDriverArtNode = 'FETCH_DRIVER_ART_NODE',
  SetDriverArtNode = 'SET_DRIVER_ART_NODE',
}

export type ActionTypes =
  | IFluxAction<DriverActions.FetchAllDrivers>
  | IFluxPayloadAction<DriverActions.FetchDriverDetails, number>
  | IFluxPayloadAction<DriverActions.SetDriverDetails, IDriver[]>
  | IFluxPayloadAction<DriverActions.UpdateShowDriver, IUpdateShow>
  | IFluxAction<DriverActions.FetchAllDriverSkillTrees>
  | IFluxPayloadAction<DriverActions.FetchDriverSkillTree, number>
  | IFluxPayloadAction<DriverActions.SetDriverSkillTree, IDriverSkillTree[]>
  | IFluxAction<DriverActions.FetchAllDriverSkillNodes>
  | IFluxPayloadAction<DriverActions.FetchDriverSkillNodes, number>
  | IFluxPayloadAction<DriverActions.SetDriverSkillNode, IDriverSkillNode[]>
  | IFluxPayloadAction<DriverActions.SaveDriverSkillNode, IDriverSkillNodeUpdate>
  | IFluxAction<DriverActions.FetchAllDriverArtLists>
  | IFluxPayloadAction<DriverActions.FetchDriverArtList, number>
  | IFluxPayloadAction<DriverActions.SetDriverArtList, IDriverArts[]>
  | IFluxPayloadAction<DriverActions.UpdateDriverArtLevelUnlocked, IDriverArtUpdateLevelUnlocked>
  | IFluxPayloadAction<DriverActions.SaveDriverArtLevel, IDriverArtUpdateData>
  | IFluxAction<DriverActions.FetchAllDriverArtNodes>
  | IFluxPayloadAction<DriverActions.FetchDriverArtNode, IDriverArtNodeRequest>
  | IFluxPayloadAction<DriverActions.SetDriverArtNode, IDriverArtDetails[]>;

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

export const fetchAllDriverSkillTrees = ():ActionTypes => ({
  type: DriverActions.FetchAllDriverSkillTrees
});

export const fetchDriverSkillTree = (payload:number):ActionTypes => ({
  type: DriverActions.FetchDriverSkillTree,
  payload
});

export const setDriverSkillTree = (payload:IDriverSkillTree[]):ActionTypes => ({
  type: DriverActions.SetDriverSkillTree,
  payload
});

export const fetchAllDriverSkillNodes = ():ActionTypes => ({
  type: DriverActions.FetchAllDriverSkillNodes
});

export const fetchDriverSkillNodes = (payload:number):ActionTypes => ({
  type: DriverActions.FetchDriverSkillNodes,
  payload
});

export const setDriverSkillNode = (payload:IDriverSkillNode[]):ActionTypes => ({
  type: DriverActions.SetDriverSkillNode,
  payload
});

export const saveDriverSkillNode = (payload:IDriverSkillNodeUpdate):ActionTypes => ({
  type: DriverActions.SaveDriverSkillNode,
  payload
});

export const fetchAllDriverArtLists = ():ActionTypes => ({
  type: DriverActions.FetchAllDriverArtLists
})

export const fetchDriverArtList = (payload:number):ActionTypes => ({
  type: DriverActions.FetchDriverArtList,
  payload
});

export const setDriverArtList = (payload:IDriverArts[]):ActionTypes => ({
  type: DriverActions.SetDriverArtList,
  payload
})

export const updateDriverArtLevelUnlocked = (
  payload:IDriverArtUpdateLevelUnlocked
):ActionTypes => ({
  type: DriverActions.UpdateDriverArtLevelUnlocked,
  payload
});

export const saveDriverArtLevel = (payload:IDriverArtUpdateData):ActionTypes => ({
  type: DriverActions.SaveDriverArtLevel,
  payload
});

export const fetchAllDriverArtNodes = ():ActionTypes => ({
  type: DriverActions.FetchAllDriverArtNodes
})

export const fetchDriverArtNode = (payload:IDriverArtNodeRequest):ActionTypes => ({
  type: DriverActions.FetchDriverArtNode,
  payload
});

export const setDriverArtNode = (payload:IDriverArtDetails[]):ActionTypes => ({
  type: DriverActions.SetDriverArtNode,
  payload
});
