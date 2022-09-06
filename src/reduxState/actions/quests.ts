import { IQuest, IQuestStep, IQuestSubStep } from 'interfaces';
import {
  IUpdateQuestStepStatus,
  IUpdateQuestSubStepStatus,
  IUpdateQuestStatus
} from 'reduxState/interfaces/quest';
import { IQuestState } from '../interfaces/reduxState';
import { IFluxAction, IFluxPayloadAction } from './fluxActions';

export enum QuestsActions {
  FetchQuestPrerequisites = 'FETCH_QUEST_PREREQUISITES',
  FetchQuests = 'FETCH_QUESTS',
  FetchQuest = 'FETCH_QUEST',
  SetQuests = 'SET_QUESTS',
  FetchQuestSteps = 'FETCH_QUEST_STEPS',
  FetchQuestStepsForQuest = 'FETCH_QUEST_STEPS_FOR_QUEST',
  SetQuestSteps = 'SET_QUEST_STEPS',
  FetchQuestSubSteps = 'FETCH_QUEST_SUBSTEPS',
  FetchQuestSubStepsForQuest = 'FETCH_QUEST_SUB_STEPS_FOR_QUEST',
  SetQuestSubSteps = 'SET_QUEST_SUBSTEPS',
  UpdateQuestStatus = 'UPDATE_QUEST_STATUS',
  SaveQuestStatus = 'SAVE_QUEST_STATUS',
  UpdateQuestStepStatus = 'UPDATE_QUEST_STEP_STATUS',
  UpdateQuestSubStepStatus = 'UPDATE_QUEST_SUBSTEP_STATUS',
  SaveQuestStepStatus = 'SAVE_QUEST_STEP_STATUS',
  SaveQuestSubStepStatus = 'SAVE_QUEST_SUBSTEP_STATUS',
}

export type ActionTypes =
| IFluxAction<QuestsActions.FetchQuests>
| IFluxPayloadAction<QuestsActions.FetchQuest, number>
| IFluxPayloadAction<QuestsActions.SetQuests, IQuest[]>
| IFluxAction<QuestsActions.FetchQuestSteps>
| IFluxPayloadAction<QuestsActions.FetchQuestStepsForQuest, number>
| IFluxPayloadAction<QuestsActions.SetQuestSteps, IQuestStep[]>
| IFluxAction<QuestsActions.FetchQuestSubSteps>
| IFluxPayloadAction<QuestsActions.FetchQuestSubStepsForQuest, number>
| IFluxPayloadAction<QuestsActions.SetQuestSubSteps, IQuestSubStep[]>
| IFluxPayloadAction<QuestsActions.UpdateQuestStatus, IUpdateQuestStatus>
| IFluxPayloadAction<QuestsActions.SaveQuestStatus, IQuestState>
| IFluxPayloadAction<QuestsActions.UpdateQuestStepStatus, IUpdateQuestStepStatus>
| IFluxPayloadAction<QuestsActions.UpdateQuestSubStepStatus, IUpdateQuestSubStepStatus>
| IFluxPayloadAction<QuestsActions.SaveQuestStepStatus, IUpdateQuestStepStatus>
| IFluxPayloadAction<QuestsActions.SaveQuestSubStepStatus, IUpdateQuestSubStepStatus>;

export const fetchQuests = ():ActionTypes => ({
  type: QuestsActions.FetchQuests
});

export const fetchQuest = (payload:number):ActionTypes => ({
  type: QuestsActions.FetchQuest,
  payload
});

export const setQuests = (payload:IQuest[]):ActionTypes => ({
  type: QuestsActions.SetQuests,
  payload
});

export const fetchQuestSteps = ():ActionTypes => ({
  type: QuestsActions.FetchQuestSteps
});

export const fetchQuestStepsForQuest = (payload:number):ActionTypes => ({
  type: QuestsActions.FetchQuestStepsForQuest,
  payload
});

export const setQuestSteps = (payload:IQuestStep[]):ActionTypes => ({
  type: QuestsActions.SetQuestSteps,
  payload
});

export const fetchQuestSubSteps = ():ActionTypes => ({
  type: QuestsActions.FetchQuestSubSteps
});

export const fetchQuestSubStepsForQuest = (payload:number):ActionTypes => ({
  type: QuestsActions.FetchQuestSubStepsForQuest,
  payload
});

export const setQuestSubSteps = (payload:IQuestSubStep[]):ActionTypes => ({
  type: QuestsActions.SetQuestSubSteps,
  payload
});

export const updateQuestStatus = (payload:IUpdateQuestStatus) => ({
  type: QuestsActions.UpdateQuestStatus,
  payload
});

export const saveQuestStatus = (payload:IQuestState) => ({
  type: QuestsActions.SaveQuestStatus,
  payload
});

export const updateQuestStepStatus = (payload:IUpdateQuestStepStatus) => ({
  type: QuestsActions.UpdateQuestStepStatus,
  payload
});

export const saveQuestStepStatus = (payload:IUpdateQuestStepStatus) => ({
  type: QuestsActions.SaveQuestStepStatus,
  payload
});

export const updateQuestSubStepStatus = (payload:IUpdateQuestSubStepStatus) => ({
  type: QuestsActions.UpdateQuestSubStepStatus,
  payload
});

export const saveQuestSubStepStatus = (payload:IUpdateQuestSubStepStatus) => ({
  type: QuestsActions.UpdateQuestSubStepStatus,
  payload
});
