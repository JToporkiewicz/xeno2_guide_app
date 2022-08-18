import createReducer from 'redux-action-reducer';
import { ILocations, IQuest } from 'interfaces';
import { QuestsActions } from '../actions/quests';
import { IMajorLocations, IQuestState } from '../interfaces/reduxState';
import { LocationActions } from 'reduxState/actions/locations';
import { findAreaName, findLocationName } from 'helpers/commonReducers';

export const questsReducer = createReducer<IQuestState[]>(
  [QuestsActions.SetQuests,
    (questState: IQuestState[], quests: IQuest[]) => {
      const questIds = quests.map((q) => q.id);
      return questState.filter((old) => !questIds.includes(old.id))
        .concat(
          quests.map((quest) => {
            const foundQuest = questState.find((old) => old.id === quest.id);
            return {
              ...quest,
              Available: quest.Available === 1,
              Area: foundQuest && foundQuest.Area !== 'Unknown' ? foundQuest.Area
                : '',
              Location: foundQuest && foundQuest.Location !== 'Unknown' ? foundQuest.Location
                : String(quest.Location),
              Steps: []
            }
          })
        )
        .sort((questA, questB) => questA.id < questB.id ? -1 : 1)
    }
  ],
  [QuestsActions.UpdateQuestStatus,
    (state:IQuestState[], newQuest: IQuestState) =>
      state.filter((quest) => quest.id !== newQuest.id)
        .concat([newQuest]).sort((questA, questB) =>
          questA.id < questB.id ? -1 : 1
        )
  ],
  [LocationActions.SetMinorLocations,
    (state:IQuestState[], locations:ILocations[]) => {
      const updatedQuests:IQuestState[] = findLocationName(state, locations);
      return state.filter((quest) => !updatedQuests.map((updated)=> updated.id).includes(quest.id))
        .concat(updatedQuests)
        .sort((questA, questB) => questA.id < questB.id ? -1 : 1)
    }],
  [LocationActions.SetDependentMajorAreas,
    (state:IQuestState[], areas:IMajorLocations[]) => {
      const updatedQuests:IQuestState[] = findAreaName(state, areas);
      return state.filter((quest) => !updatedQuests.map((updated)=> updated.id).includes(quest.id))
        .concat(updatedQuests)
        .sort((questA, questB) => questA.id < questB.id ? -1 : 1)
    }]
)([]);
