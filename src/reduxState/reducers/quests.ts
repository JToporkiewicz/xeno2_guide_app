import createReducer from 'redux-action-reducer';
import { ILocations, IQuest, IQuestStep, IQuestSubStep } from 'interfaces';
import { QuestsActions } from '../actions/quests';
import { IMajorLocations, IQuestState, IQuestStepState } from '../interfaces/reduxState';
import { LocationActions } from 'reduxState/actions/locations';
import { findAreaName, findLocationName } from 'helpers/commonReducers';
import {
  IUpdateQuestStatus,
  IUpdateQuestStepStatus,
  IUpdateQuestSubStepStatus
} from 'reduxState/interfaces/quest';

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
          Completed: step.Completed > 0,
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
                    .find((step) => step[0] === String(newStep.id))
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
    (state:IQuestState[], update: IUpdateQuestStatus) => {
      const foundQuest = state.find((quest) => quest.id === update.questId)
      
      if(!foundQuest) {
        return state;
      }
      
      return state.filter((quest) => quest.id !== foundQuest.id)
        .concat({
          ...foundQuest,
          Steps: foundQuest.Steps.map((step) => {
            if (update.status === 'NOT STARTED') {
              return {
                ...step,
                Completed: false,
                SubSteps: step.SubSteps?.map((sub) => ({
                  ...sub,
                  CompletionProgress: 0
                }))
              }
            } else if (update.status === 'FINISHED') {
              return {
                ...step,
                Completed: true,
                SubSteps: step.SubSteps?.map((sub) => ({
                  ...sub,
                  CompletionProgress: sub.Count
                }))
              }
            } else if (step.id === foundQuest.Steps.at(-1)?.id && step.Completed) {
              return {
                ...step,
                Completed: false,
                SubSteps: step.SubSteps?.map((sub) => ({
                  ...sub,
                  CompletionProgress: 0
                }))
              }
            } else {
              return step
            }
          }),
          Status: update.status
        }).sort((questA, questB) =>
          questA.id < questB.id ? -1 : 1
        )
    }],
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
    }],
  [QuestsActions.UpdateQuestStepStatus,
    (state:IQuestState[], update:IUpdateQuestStepStatus) => {
      const foundQuest = state.find((quest) =>
        quest.Steps.map((step) => step.id).includes(update.stepId))
      
      if(!foundQuest) {
        return state;
      }

      return state.filter((quest) => quest.id !== foundQuest.id)
        .concat({
          ...foundQuest,
          Steps: foundQuest.Steps.map((step) => {
            if (update.status && !step.Completed && step.id <= update.stepId) {
              return {
                ...step,
                Completed: true,
                SubSteps: step.SubSteps?.map((sub) => ({
                  ...sub,
                  CompletionProgress: sub.Count
                })).sort((substepA, substepB) =>
                  substepA.SubStepNumber < substepB.SubStepNumber ? -1 :
                    substepA.SubStepNumber > substepB.SubStepNumber ? 1 : 0)
              }
            } if (!update.status && step.Completed && step.id >= update.stepId) {
              return {
                ...step,
                Completed: false,
                SubSteps: step.SubSteps?.map((sub) => ({
                  ...sub,
                  CompletionProgress: 0
                })).sort((substepA, substepB) =>
                  substepA.SubStepNumber < substepB.SubStepNumber ? -1 :
                    substepA.SubStepNumber > substepB.SubStepNumber ? 1 : 0)
              }
            } else {
              return step;
            }
          }).sort((stepA, stepB) =>
            stepA.StepNumber < stepB.StepNumber ? -1 :
              stepA.StepNumber > stepB.StepNumber ? 1 : 0),
          Status: update.status && update.stepId === foundQuest.Steps.at(-1)?.id ?
            'FINISHED' : !update.status && update.stepId === foundQuest.Steps.at(0)?.id ?
              'NOT STARTED' : 'STARTED'
        }).sort((questA, questB) => questA.id < questB.id ? -1 : 1);
    }],
  [QuestsActions.UpdateQuestSubStepStatus,
    (state:IQuestState[], update:IUpdateQuestSubStepStatus) => {
      const foundQuest = state.find((quest) =>
        quest.Steps.map((step) => step.id).includes(update.stepId))
      
      if(!foundQuest) {
        return state;
      }

      const foundStep = foundQuest.Steps.find((step) => step.id === update.stepId);

      if(!foundStep) {
        return state;
      }

      const foundSubStep = foundStep.SubSteps?.find(
        (substep) => substep.id === update.substepId);

      if(!foundSubStep) {
        return state;
      }

      const uncompletedSubSteps = foundStep.SubSteps?.filter(
        (sub) => sub.CompletionProgress !== sub.Count)

      const stepCompleted = foundSubStep.Count === update.progress &&
        (uncompletedSubSteps === undefined
        || uncompletedSubSteps?.length === 1 && uncompletedSubSteps[0].id === update.substepId);

      let lastStepInRoute;
      if (foundStep.Description.startsWith('Route A:')) {
        lastStepInRoute = foundQuest.Steps
          .filter((step) => !step.Description.startsWith('Route B:'))
          .sort((stepA, stepB) =>
            stepA.StepNumber < stepB.StepNumber ? -1 :
              stepA.StepNumber > stepB.StepNumber ? 1 : 0)
          .at(-1)
      } else if (foundStep.Description.startsWith('Route B:')) {
        lastStepInRoute = foundQuest.Steps
          .filter((step) => !step.Description.startsWith('Route A:'))
          .sort((stepA, stepB) =>
            stepA.StepNumber < stepB.StepNumber ? -1 :
              stepA.StepNumber > stepB.StepNumber ? 1 : 0)
          .at(-1)
      } else {
        lastStepInRoute = foundQuest.Steps.at(-1)
      }

      return state.filter((quest) => quest.id !== foundQuest.id)
        .concat({
          ...foundQuest,
          Steps: foundQuest.Steps.map((step) => {
            if (step.id < foundStep.id && update.progress > 0) {
              return {
                ...step,
                SubSteps: step.SubSteps?.map((sub) => ({
                  ...sub,
                  CompletionProgress: sub.Count
                })),
                Completed: true
              }
            } else if (step.id > foundStep.id && update.progress !== foundSubStep.Count) {
              return {
                ...step,
                SubSteps: step.SubSteps?.map((sub) => ({
                  ...sub,
                  CompletionProgress: 0
                })),
                Completed: false
              }
            } else if (step.id === foundStep.id) {
              return {
                ...step,
                SubSteps: step.SubSteps?.filter((sub) => sub.id !== update.substepId)
                  .concat({
                    ...foundSubStep,
                    CompletionProgress: update.progress
                  }).sort((substepA, substepB) =>
                    substepA.SubStepNumber < substepB.SubStepNumber ? -1 :
                      substepA.SubStepNumber > substepB.SubStepNumber ? 1 : 0),
                Completed: stepCompleted
              }
            } else {
              return step
            }
          }).sort((stepA, stepB) =>
            stepA.StepNumber < stepB.StepNumber ? -1 :
              stepA.StepNumber > stepB.StepNumber ? 1 : 0),
          Status: lastStepInRoute?.id === update.stepId
            && foundSubStep.Count === update.progress
            && (uncompletedSubSteps?.map((sub) => sub.id).includes(update.substepId)
              && uncompletedSubSteps.length === 1
              || !uncompletedSubSteps) ?
            'FINISHED'
            : foundQuest.Steps.at(0)?.id === update.stepId
              && update.progress === 0
              && (!uncompletedSubSteps ||
                uncompletedSubSteps.filter(
                  (sub) => sub.CompletionProgress !== 0).length <= 1
                && uncompletedSubSteps.find(
                  (sub) => sub.CompletionProgress !== 0)?.id === update.substepId
              ) ? 'NOT STARTED' : 'STARTED'
        }).sort((questA, questB) => questA.id < questB.id ? -1 : 1);
    }]
)([]);
