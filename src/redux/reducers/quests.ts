import createReducer from 'redux-action-reducer';
import { IQuest } from '../../interfaces';
import { QuestsActions } from '../actions/quests';
import { IQuestState } from '../interfaces/reduxState';

export const questsReducer = createReducer<IQuestState[]>(
  [QuestsActions.SetQuests,
    (_: IQuestState[], quests: IQuest[]) =>
      quests.map((quest) => ({
        ...quest,
        Steps: [],
        SubSteps: []
      }))],
)([]);
