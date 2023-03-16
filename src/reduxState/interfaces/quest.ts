import { IQuest } from 'interfaces'

export const defaultSideQuest: IQuest = {
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

export interface ISaveQuestStepStatus {
  lastCompletedStep: number,
  questId: number,
  startedRoute: string
}

export interface IUpdateQuestSubStepStatus {
  stepId: number,
  substepId: number,
  progress: number
}

export interface ISaveQuestSubStepStatus {
  subSteps: {
    subStepId: number,
    progress: number,
  }[],
  stepId: number,
  questId: number,
  startedRoute: string
}
