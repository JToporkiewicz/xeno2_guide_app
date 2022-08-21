import createReducer from 'redux-action-reducer';
import { ILocations, IQuest, IQuestStep, IQuestSubStep } from 'interfaces';
import { QuestsActions } from '../actions/quests';
import { IMajorLocations, IQuestState, IQuestStepState } from '../interfaces/reduxState';
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
  [QuestsActions.SetQuestSteps,
    (questState: IQuestState[], questStep: IQuestStep[]) => {
      const steps = questStep.reduce((group, step) => ({
        ...group,
        [step.Quest]: (group[step.Quest] || []).concat({
          ...step,
          SubSteps: []
        })
      }), {} as {[id:number]: IQuestStepState[]});

      const questsToUpdate = questState.filter((quest) =>
        Object.keys(steps).includes(String(quest.id)));

      return questState.filter((old) => !questsToUpdate.map((quest) => quest.id).includes(old.id))
        .concat(
          questsToUpdate.map((quest) => {
            const updatedSteps = Object.entries(steps).find((step) => step[0] === String(quest.id))
            return {
              ...quest,
              Steps: updatedSteps ? updatedSteps[1].sort((stepA, stepB) =>
                stepA.StepNumber < stepB.StepNumber ? -1 :
                  stepA.StepNumber > stepB.StepNumber ? 1 : 0) : []
            }})
        )
        .sort((questA, questB) => questA.id < questB.id ? -1 : 1)
    }
  ],
  [QuestsActions.SetQuestSubSteps,
    (questState: IQuestState[], questSubStep: IQuestSubStep[]) => {
      const subSteps = questSubStep.reduce((group, subStep) => ({
        ...group,
        [subStep.QuestStep]: (group[subStep.QuestStep] || []).concat({
          ...subStep
        })
      }), {} as {[id:number]: IQuestSubStep[]});

      let questStepsToUpdate: IQuestStepState[] = [];

      const questsToUpdate = questState.filter((quest) =>
        quest.Steps.filter((step) => {
          const toUpdate = Object.keys(subSteps).includes(String(step.id));

          if (toUpdate) {
            questStepsToUpdate = questStepsToUpdate.filter((updateStep) =>
              updateStep.id !== step.id)
              .concat(step);
          }

          return toUpdate;
        }).length > 0);

      return questState.filter((old) => !questsToUpdate.map((quest) => quest.id).includes(old.id))
        .concat(
          questsToUpdate.map((quest) => ({
            ...quest,
            Steps: quest.Steps.filter((oldStep) =>
              !questStepsToUpdate.map((newStep) => newStep.id).includes(oldStep.id))
              .concat(questStepsToUpdate
                .filter((newSteps) => newSteps.Quest === quest.id)
                .map((newStep) => {
                  const updatedSubSteps = Object.entries(subSteps)
                    .find((step) => step[0] === String(quest.id))
                  return {
                    ...newStep,
                    SubSteps: updatedSubSteps ? updatedSubSteps[1].sort((stepA, stepB) =>
                      stepA.SubStepNumber < stepB.SubStepNumber ? -1 :
                        stepA.SubStepNumber > stepB.SubStepNumber ? 1 : 0) : []
                  }}))
              .sort((stepA, stepB) =>
                stepA.StepNumber < stepB.StepNumber ? -1 :
                  stepA.StepNumber > stepB.StepNumber ? 1 : 0)
          })
          ))
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
