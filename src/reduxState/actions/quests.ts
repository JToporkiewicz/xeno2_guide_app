import { IQuest } from 'interfaces';
import { IQuestState } from '../interfaces/reduxState';
import { IFluxAction, IFluxPayloadAction } from './fluxActions';

export enum QuestsActions {
  FetchQuestPrerequisites = 'FETCH_QUEST_PREREQUISITES',
  FetchQuests = 'FETCH_QUESTS',
  FetchQuest = 'FETCH_QUEST',
  SetQuests = 'SET_QUESTS',
  FetchQuestSteps = 'FETCH_QUEST_STEPS',
  FetchQuestSubSteps = 'FETCH_QUEST_SUBSTEPS',
  UpdateQuestStatus = 'UPDATE_QUEST_STATUS',
  SaveQuestStatus = 'SAVE_QUEST_STATUS'
}

export type ActionTypes =
| IFluxAction<QuestsActions.FetchQuests>
| IFluxPayloadAction<QuestsActions.FetchQuest, number>
| IFluxPayloadAction<QuestsActions.SetQuests, IQuest[]>
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

export const updateQuestStatus = (payload:IQuestState) => ({
  type: QuestsActions.UpdateQuestStatus,
  payload
});

export const saveQuestStatus = (payload:IQuestState) => ({
  type: QuestsActions.SaveQuestStatus,
  payload
});
