import createReducer from 'redux-action-reducer';
import { IQuest } from 'interfaces';
import { QuestsActions } from '../actions/quests';
import { IQuestState } from '../interfaces/reduxState';

export const questsReducer = createReducer<IQuestState[]>(
  [QuestsActions.SetQuests,
    (questState: IQuestState[], quests: IQuest[]) => {
      const questIds = quests.map((q) => q.id);
      return questState.filter((old) => !questIds.includes(old.id))
        .concat(
          quests.map((quest) => ({
            ...quest,
            Location: String(quest.Location),
            Steps: []
          }))
        )
    }
  ],
  [QuestsActions.UpdateQuestStatus,
    (state:IQuestState[], newQuest: IQuestState) =>
      state.filter((quest) => quest.id !== newQuest.id)
        .concat([newQuest]).sort((questA, questB) =>
          questA.id < questB.id ? -1 : 1
        )
  ]
)([]);
