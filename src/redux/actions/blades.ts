import { IBlade } from '../../interfaces';
import { IUpdateShow } from '../interfaces/reduxState';
import { IFluxAction, IFluxPayloadAction } from './fluxActions';

export enum BladeActions {
  FetchBladePrerequisites = 'FETCH_BLADE_PREREQUISITES',
  FetchAllBlades = 'FETCH_ALL_BLADES',
  FetchBladesByWeapon = 'FETCH_BLADES_BY_WEAPON',
  SetBlade = 'SET_BLADE',
  FetchBladeSkillTree = 'FETCH_BLADE_SKILL_TREE',
  UpdateShowBlade = 'UPDATE_SHOW_BLADE'
}

export type ActionTypes =
  | IFluxAction<BladeActions.FetchAllBlades>
  | IFluxPayloadAction<BladeActions.FetchBladesByWeapon, string>
  | IFluxPayloadAction<BladeActions.SetBlade, IBlade[]>
  | IFluxPayloadAction<BladeActions.UpdateShowBlade, IUpdateShow>;

export const fetchAllBlades = ():ActionTypes => ({
  type: BladeActions.FetchAllBlades
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
})
