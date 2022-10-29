import { IFieldSkills, IRequirementsMM } from 'interfaces';
import { IBladeState } from './reduxState';

export interface IMMReqUpdate {
  requirements: IRequirementsMM[],
  blades: IBladeState[],
  fieldSkills: IFieldSkills[]
}