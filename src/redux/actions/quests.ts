import { IQuest } from '../../interfaces';
import { IFluxAction, IFluxPayloadAction } from './fluxActions';

export enum QuestsActions {
  FetchQuestPrerequisites = 'FETCH_QUEST_PREREQUISITES',
  FetchQuests = 'FETCH_QUESTS',
  SetQuests = 'SET_QUESTS',
  FetchQuestSteps = 'FETCH_QUEST_STEPS',
  FetchQuestSubSteps = 'FETCH_QUEST_SUBSTEPS'
}

export type ActionTypes =
| IFluxAction<QuestsActions.FetchQuests>
| IFluxPayloadAction<QuestsActions.SetQuests, IQuest[]>;

export const fetchQuests = ():ActionTypes => ({
  type: QuestsActions.FetchQuests
});

export const setQuests = (payload:IQuest[]):ActionTypes => ({
  type: QuestsActions.SetQuests,
  payload
})
