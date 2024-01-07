import { IMercMissionAvailability } from './availabilityState';

export const defaultMercMission:IMercMissionAvailability = {
  id: -1,
  Name: '',
  MissionNation: '',
  Giver: '',
  GiverLocation: '',
  Duration: '',
  Type: '',
  Missable: false,
  Completed: false,
  Requirements: [],
  Available: false
}

export interface IUpdateMMStatus {
  id: number,
  completed: boolean
}