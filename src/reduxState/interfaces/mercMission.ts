import { IFieldSkills, IRequirementsMM } from 'interfaces';
import { IBladeState, IMercMissionState } from './reduxState';

export const defaultMercMission:IMercMissionState = {
  id: -1,
  Name: '',
  MissionNation: '',
  Giver: '',
  GiverLocation: '',
  Duration: '',
  Type: '',
  Missable: false,
  Completed: false,
  Available: false,
  Requirements: []
}

export interface IMMReqUpdate {
  requirements: IRequirementsMM[],
  blades: IBladeState[],
  fieldSkills: IFieldSkills[]
}

export interface IUpdateMMStatus {
  id: number,
  completed: boolean
}