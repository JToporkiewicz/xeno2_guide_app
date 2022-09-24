import { IQuestState } from './reduxState';

export const defaultSideQuest: IQuestState = {
  id:0,
  Name:'',
  Type:'',
  Client:'',
  Area:'',
  Location:'',
  Rewards:[],
  Available:false,
  Status:'',
  Steps: []
}

export interface IUpdateQuestStatus {
  questId: number,
  status: string
}

export interface IUpdateQuestStepStatus {
  stepId: number,
  status: boolean
}

export interface IUpdateQuestSubStepStatus {
  stepId: number,
  substepId: number,
  progress: number
}
