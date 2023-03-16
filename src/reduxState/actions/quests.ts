import { IQuest } from 'interfaces';
import {
  IUpdateQuestStepStatus,
  IUpdateQuestSubStepStatus,
  IUpdateQuestStatus,
  ISaveQuestStepStatus,
  ISaveQuestSubStepStatus
} from 'reduxState/interfaces/quest';
import { IFluxAction, IFluxPayloadAction } from './fluxActions';

export enum QuestsActions {
  FetchQuestPrerequisites = 'FETCH_QUEST_PREREQUISITES',
  FetchQuests = 'FETCH_QUESTS',
  FetchQuest = 'FETCH_QUEST',
  SetQuests = 'SET_QUESTS',
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
| IFluxPayloadAction<QuestsActions.UpdateQuestStatus, IUpdateQuestStatus>
| IFluxPayloadAction<QuestsActions.SaveQuestStatus, IUpdateQuestStatus[]>
| IFluxPayloadAction<QuestsActions.UpdateQuestStepStatus, IUpdateQuestStepStatus>
| IFluxPayloadAction<QuestsActions.UpdateQuestSubStepStatus, IUpdateQuestSubStepStatus>
| IFluxPayloadAction<QuestsActions.SaveQuestStepStatus, ISaveQuestStepStatus>
| IFluxPayloadAction<QuestsActions.SaveQuestSubStepStatus, ISaveQuestSubStepStatus>;

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

export const updateQuestStatus = (payload:IUpdateQuestStatus) => ({
  type: QuestsActions.UpdateQuestStatus,
  payload
});

export const saveQuestStatus = (payload:IUpdateQuestStatus[]) => ({
  type: QuestsActions.SaveQuestStatus,
  payload
});

export const updateQuestStepStatus = (payload:IUpdateQuestStepStatus) => ({
  type: QuestsActions.UpdateQuestStepStatus,
  payload
});

export const saveQuestStepStatus = (payload:ISaveQuestStepStatus) => ({
  type: QuestsActions.SaveQuestStepStatus,
  payload
});

export const updateQuestSubStepStatus = (payload:IUpdateQuestSubStepStatus) => ({
  type: QuestsActions.UpdateQuestSubStepStatus,
  payload
});

export const saveQuestSubStepStatus = (payload:ISaveQuestSubStepStatus) => ({
  type: QuestsActions.SaveQuestSubStepStatus,
  payload
});
