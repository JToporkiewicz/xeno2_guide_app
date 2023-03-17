import { IMercMission } from 'interfaces';

export const defaultMercMission:IMercMission = {
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

export interface IUpdateMMStatus {
  id: number,
  completed: boolean
}