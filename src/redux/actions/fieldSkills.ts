import { IFieldSkills } from '../../interfaces'
import { IFluxAction, IFluxPayloadAction } from './fluxActions'

export enum FieldSkillsActions {
  FetchFieldSkills = 'FETCH_FIELD_SKILLS',
  SetFieldSkills = 'SET_FIELD_SKILLS',
  UpdateFieldSkillLevelUnlocked = 'UDPATE_FIELD_SKILL_LEVEL_UNLOCKED',
  SaveFieldSkillLevelUnlocked = 'SAVE_FIELD_SKILL_LEVEL_UNLOCKED'
}

export type ActionTypes =
  | IFluxAction<FieldSkillsActions.FetchFieldSkills>
  | IFluxPayloadAction<FieldSkillsActions.SetFieldSkills, IFieldSkills[]>
  | IFluxPayloadAction<FieldSkillsActions.UpdateFieldSkillLevelUnlocked, IFieldSkills>
  | IFluxPayloadAction<FieldSkillsActions.SaveFieldSkillLevelUnlocked, IFieldSkills>;

export const fetchFieldSkills = ():ActionTypes => ({
  type: FieldSkillsActions.FetchFieldSkills
});

export const setFieldSkills = (payload:IFieldSkills[]):ActionTypes => ({
  type: FieldSkillsActions.SetFieldSkills,
  payload
});

export const updateFieldSkillLevelUnlocked = (payload:IFieldSkills):ActionTypes => ({
  type: FieldSkillsActions.UpdateFieldSkillLevelUnlocked,
  payload
});

export const saveFieldSkillLevelUnlocked = (payload:IFieldSkills):ActionTypes => ({
  type: FieldSkillsActions.SaveFieldSkillLevelUnlocked, 
  payload
});
