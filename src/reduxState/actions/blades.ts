import { IAffinityChartNode, IBlade } from 'interfaces';
import { IBladeState, IUpdateShow, IUpdateUnlocked } from '../interfaces/reduxState';
import { IFluxAction, IFluxPayloadAction } from './fluxActions';

export enum BladeActions {
  FetchBladePrerequisites = 'FETCH_BLADE_PREREQUISITES',
  FetchAllBlades = 'FETCH_ALL_BLADES',
  FetchBlade = 'FETCH_BLADE',
  SetBlade = 'SET_BLADE',
  SetBladeSkillNode = 'SET_BLADE_SKILL_NODE',
  UpdateShowBlade = 'UPDATE_SHOW_BLADE',
  UpdateBladeUnlocked = 'UPDATE_BLADE_UNLOCKED',
  SaveBladeSkillNode = 'SAVE_BLADE_SKILL_NODE',
  SaveBladeStatus = 'SAVE_BLADE_STATUS'
}

export type ActionTypes =
  | IFluxAction<BladeActions.FetchAllBlades>
  | IFluxPayloadAction<BladeActions.FetchBlade, number>
  | IFluxPayloadAction<BladeActions.SetBlade, IBlade[]>
  | IFluxPayloadAction<BladeActions.UpdateShowBlade, IUpdateShow>
  | IFluxPayloadAction<BladeActions.SetBladeSkillNode, IAffinityChartNode[]>
  | IFluxPayloadAction<BladeActions.UpdateBladeUnlocked, IBladeState>
  | IFluxPayloadAction<BladeActions.SaveBladeSkillNode, IUpdateUnlocked>
  | IFluxPayloadAction<BladeActions.SaveBladeStatus, IUpdateUnlocked>;

export const fetchAllBlades = ():ActionTypes => ({
  type: BladeActions.FetchAllBlades
});

export const fetchBlade = (payload: number):ActionTypes => ({
  type: BladeActions.FetchBlade,
  payload
})

export const setBlade = (payload: IBlade[]):ActionTypes => ({
  type: BladeActions.SetBlade,
  payload
});

export const updateShowBlade = (payload:IUpdateShow):ActionTypes => ({
  type: BladeActions.UpdateShowBlade,
  payload
});

export const setBladeSkillNode = (payload: IAffinityChartNode[]):ActionTypes => ({
  type: BladeActions.SetBladeSkillNode,
  payload
});

export const updateBladeUnlocked = (payload: IBladeState):ActionTypes => ({
  type: BladeActions.UpdateBladeUnlocked,
  payload
});

export const saveBladeSkillNode = (payload: IUpdateUnlocked):ActionTypes => ({
  type: BladeActions.SaveBladeSkillNode,
  payload
});

export const saveBladeStatus = (payload: IUpdateUnlocked):ActionTypes => ({
  type: BladeActions.SaveBladeStatus,
  payload
});
