import { IAffinityChart, IAffinityChartBranch, IAffinityChartNode, IBlade } from '../../interfaces';
import { IBladeState, IUpdateShow } from '../interfaces/reduxState';
import { IFluxAction, IFluxPayloadAction } from './fluxActions';

export enum BladeActions {
  FetchBladePrerequisites = 'FETCH_BLADE_PREREQUISITES',
  FetchAllBlades = 'FETCH_ALL_BLADES',
  FetchBlade = 'FETCH_BLADE',
  FetchBladesByWeapon = 'FETCH_BLADES_BY_WEAPON',
  SetBlade = 'SET_BLADE',
  FetchAllBladeSkillTrees = 'FETCH_ALL_BLADE_SKILL_TREES',
  FetchBladeSkillTree = 'FETCH_BLADE_SKILL_TREE',
  SetBladeSkillTree = 'SET_BLADE_SKILL_TREE',
  FetchAllBladeSkillBranches = 'FETCH_ALL_BLADE_SKILL_BRANCHES',
  FetchBladeSkillBranch = 'FETCH_BLADE_SKILL_BRANCH',
  SetBladeSkillBranch = 'SET_BLADE_SKILL_BRANCH',
  FetchAllBladeSkillNodes = 'FETCH_ALL_BLADE_SKILL_NODES',
  FetchBladeSkillNode = 'FETCH_BLADE_SKILL_NODE',
  SetBladeSkillNode = 'SET_BLADE_SKILL_NODE',
  UpdateShowBlade = 'UPDATE_SHOW_BLADE',
  UpdateBladeUnlocked = 'UPDATE_BLADE_UNLOCKED',
  SaveBladeSkillNode = 'SAVE_BLADE_SKILL_NODE',
  SaveBladeStatus = 'SAVE_BLADE_STATUS'
}

export type ActionTypes =
  | IFluxAction<BladeActions.FetchAllBlades>
  | IFluxPayloadAction<BladeActions.FetchBlade, number>
  | IFluxPayloadAction<BladeActions.FetchBladesByWeapon, string>
  | IFluxPayloadAction<BladeActions.SetBlade, IBlade[]>
  | IFluxPayloadAction<BladeActions.UpdateShowBlade, IUpdateShow>
  | IFluxAction<BladeActions.FetchAllBladeSkillTrees>
  | IFluxPayloadAction<BladeActions.FetchBladeSkillTree, number>
  | IFluxPayloadAction<BladeActions.SetBladeSkillTree, IAffinityChart[]>
  | IFluxAction<BladeActions.FetchAllBladeSkillBranches>
  | IFluxPayloadAction<BladeActions.FetchBladeSkillBranch, number>
  | IFluxPayloadAction<BladeActions.SetBladeSkillBranch, IAffinityChartBranch[]>
  | IFluxAction<BladeActions.FetchAllBladeSkillNodes>
  | IFluxPayloadAction<BladeActions.FetchBladeSkillNode, number>
  | IFluxPayloadAction<BladeActions.SetBladeSkillNode, IAffinityChartNode[]>
  | IFluxPayloadAction<BladeActions.UpdateBladeUnlocked, IBladeState>
  | IFluxPayloadAction<BladeActions.SaveBladeSkillNode, IAffinityChartNode>
  | IFluxPayloadAction<BladeActions.SaveBladeStatus, IBladeState>;

export const fetchAllBlades = ():ActionTypes => ({
  type: BladeActions.FetchAllBlades
});

export const fetchBlade = (payload: number):ActionTypes => ({
  type: BladeActions.FetchBlade,
  payload
})

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

export const fetchAllBladeSkillTrees = ():ActionTypes => ({
  type: BladeActions.FetchAllBladeSkillTrees
})

export const fetchBladeSkillTree = (payload: number):ActionTypes => ({
  type: BladeActions.FetchBladeSkillTree,
  payload
});

export const setBladeSkillTree = (payload: IAffinityChart[]):ActionTypes => ({
  type: BladeActions.SetBladeSkillTree,
  payload
});

export const fetchAllBladeSkillBranches = ():ActionTypes => ({
  type: BladeActions.FetchAllBladeSkillBranches
})

export const fetchBladeSkillBranch = (payload: number):ActionTypes => ({
  type: BladeActions.FetchBladeSkillBranch,
  payload
});

export const setBladeSkillBranch = (payload: IAffinityChartBranch[]):ActionTypes => ({
  type: BladeActions.SetBladeSkillBranch,
  payload
});

export const fetchAllBladeSkillNode = ():ActionTypes => ({
  type: BladeActions.FetchAllBladeSkillNodes
})

export const fetchBladeSkillNode = (payload: number):ActionTypes => ({
  type: BladeActions.FetchBladeSkillNode,
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

export const saveBladeSkillNode = (payload: IAffinityChartNode):ActionTypes => ({
  type: BladeActions.SaveBladeSkillNode,
  payload
});

export const saveBladeStatus = (payload: IBladeState):ActionTypes => ({
  type: BladeActions.SaveBladeStatus,
  payload
});
