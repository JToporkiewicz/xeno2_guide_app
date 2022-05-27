import { IBlade } from '../../interfaces';
import {
  IBladeBranchRequest,
  IBladeBranchResponse,
  IBladeNodeRequest,
  IBladeNodeResponse,
  IBladeTreeResponse
} from '../interfaces/blades';
import { IUpdateShow } from '../interfaces/reduxState';
import { IFluxAction, IFluxPayloadAction } from './fluxActions';

export enum BladeActions {
  FetchBladePrerequisites = 'FETCH_BLADE_PREREQUISITES',
  FetchAllBlades = 'FETCH_ALL_BLADES',
  FetchBladesByWeapon = 'FETCH_BLADES_BY_WEAPON',
  SetBlade = 'SET_BLADE',
  FetchBladeSkillTree = 'FETCH_BLADE_SKILL_TREE',
  SetBladeSkillTree = 'SET_BLADE_SKILL_TREE',
  FetchBladeSkillBranch = 'FETCH_BLADE_SKILL_BRANCH',
  SetBladeSkillBranch = 'SET_BLADE_SKILL_BRANCH',
  FetchBladeSkillNode = 'FETCH_BLADE_SKILL_NODE',
  SetBladeSkillNode = 'SET_BLADE_SKILL_NODE',
  UpdateShowBlade = 'UPDATE_SHOW_BLADE'
}

export type ActionTypes =
  | IFluxAction<BladeActions.FetchAllBlades>
  | IFluxPayloadAction<BladeActions.FetchBladesByWeapon, string>
  | IFluxPayloadAction<BladeActions.SetBlade, IBlade[]>
  | IFluxPayloadAction<BladeActions.UpdateShowBlade, IUpdateShow>
  | IFluxPayloadAction<BladeActions.FetchBladeSkillTree, number>
  | IFluxPayloadAction<BladeActions.SetBladeSkillTree, IBladeTreeResponse>
  | IFluxPayloadAction<BladeActions.FetchBladeSkillBranch, IBladeBranchRequest>
  | IFluxPayloadAction<BladeActions.SetBladeSkillBranch, IBladeBranchResponse>
  | IFluxPayloadAction<BladeActions.FetchBladeSkillNode, IBladeNodeRequest>
  | IFluxPayloadAction<BladeActions.SetBladeSkillNode, IBladeNodeResponse>;

export const fetchAllBlades = ():ActionTypes => ({
  type: BladeActions.FetchAllBlades
});

export const fetchBladesByWeapon = (payload: string):ActionTypes => ({
  type: BladeActions.FetchBladesByWeapon,
  payload
});

export const setBlade = (payload: IBlade[]):ActionTypes => ({
  type: BladeActions.SetBlade,
  payload
});

export const updateShowBlade = (payload:IUpdateShow):ActionTypes => ({
  type: BladeActions.UpdateShowBlade,
  payload
});

export const fetchBladeSkillTree = (payload: number):ActionTypes => ({
  type: BladeActions.FetchBladeSkillTree,
  payload
});

export const setBladeSkillTree = (payload: IBladeTreeResponse):ActionTypes => ({
  type: BladeActions.SetBladeSkillTree,
  payload
});

export const fetchBladeSkillBranch = (payload: IBladeBranchRequest):ActionTypes => ({
  type: BladeActions.FetchBladeSkillBranch,
  payload
});

export const setBladeSkillBranch = (payload: IBladeBranchResponse):ActionTypes => ({
  type: BladeActions.SetBladeSkillBranch,
  payload
});

export const fetchBladeSkillNode = (payload: IBladeNodeRequest):ActionTypes => ({
  type: BladeActions.FetchBladeSkillNode,
  payload
});

export const setBladeSkillNode = (payload: IBladeNodeResponse):ActionTypes => ({
  type: BladeActions.SetBladeSkillNode,
  payload
});
