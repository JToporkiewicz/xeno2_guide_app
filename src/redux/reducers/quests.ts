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
  [QuestsActions.UpdateQuestStatus,
    (state:IQuestState[], newQuest: IQuestState) =>
      state.filter((quest) => quest.id !== newQuest.id)
        .concat([newQuest]).sort((questA, questB) =>
          questA.id < questB.id ? -1 : 1
        )
  ]
)([]);
