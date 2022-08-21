import { IQuest, IQuestStep, IQuestSubStep } from 'interfaces';
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
  SaveQuestStatus = 'SAVE_QUEST_STATUS'
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
| IFluxPayloadAction<QuestsActions.UpdateQuestStatus, IQuestState>
| IFluxPayloadAction<QuestsActions.SaveQuestStatus, IQuestState>;

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

export const updateQuestStatus = (payload:IQuestState) => ({
  type: QuestsActions.UpdateQuestStatus,
  payload
});

export const saveQuestStatus = (payload:IQuestState) => ({
  type: QuestsActions.SaveQuestStatus,
  payload
});
