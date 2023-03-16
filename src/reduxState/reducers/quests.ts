import createReducer from 'redux-action-reducer';
import { IQuest, IQuestStep } from 'interfaces';
import { QuestsActions } from '../actions/quests';
import {
  IUpdateQuestStatus,
  IUpdateQuestStepStatus,
  IUpdateQuestSubStepStatus
} from 'reduxState/interfaces/quest';

export const questsReducer = createReducer<IQuest[]>(
  [QuestsActions.SetQuests,
    (questState: IQuest[], quests: IQuest[]) => {
      const questIds = quests.map((q) => q.id);
      return questState.filter((old) => !questIds.includes(old.id))
        .concat(quests)
        .sort((questA, questB) => questA.id < questB.id ? -1 : 1)
    }
  ],
  [QuestsActions.UpdateQuestStatus,
    (state:IQuest[], update: IUpdateQuestStatus) => {
      const foundQuest = state.find((quest) => quest.id === update.questId)
      
      if(!foundQuest) {
        return state;
      }
      const startedRoute = foundQuest.Steps.find((step) => step.Description.startsWith('Route ')
        && step.Completed)

      let lastStepInRoute: IQuestStep | undefined;
      if (!foundQuest.Steps.at(-1)?.Description.startsWith('Route ')) {
        lastStepInRoute = foundQuest.Steps.at(-1)
      }
      if (startedRoute?.Description.slice(0, 8) === 'Route A:') {
        lastStepInRoute = foundQuest.Steps
          .filter((step) => !step.Description.startsWith('Route B:'))
          .sort((stepA, stepB) =>
            stepA.StepNumber < stepB.StepNumber ? -1 :
              stepA.StepNumber > stepB.StepNumber ? 1 : 0)
          .at(-1)
      } else if (startedRoute?.Description.slice(0, 8) === 'Route B:') {
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
            const inRoute = !step.Description.startsWith('Route ')
            || step.Description.startsWith(startedRoute?.Description.slice(0, 8) || 'Route A');
            if (update.status === 'NOT STARTED') {
              return {
                ...step,
                Completed: false,
                SubSteps: step.SubSteps?.map((sub) => ({
                  ...sub,
                  CompletionProgress: 0
                }))
              }
            } else if (update.status === 'FINISHED' && inRoute) {
              return {
                ...step,
                Completed: true,
                SubSteps: step.SubSteps?.map((sub) => ({
                  ...sub,
                  CompletionProgress: sub.Count
                }))
              }
            } else if (step.id === lastStepInRoute?.id && step.Completed) {
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
  [QuestsActions.UpdateQuestStepStatus,
    (state:IQuest[], update:IUpdateQuestStepStatus) => {
      const foundQuest = state.find((quest) =>
        quest.Steps.map((step) => step.id).includes(update.stepId))

      const foundStep = foundQuest?.Steps.find((step) => step.id === update.stepId)
      
      if(!foundQuest || !foundStep) {
        return state;
      }

      const startedRoute = foundQuest.Steps.find((step) => step.Description.startsWith('Route ')
        && step.Completed)

      return state.filter((quest) => quest.id !== foundQuest.id)
        .concat({
          ...foundQuest,
          Steps: foundQuest.Steps.map((step) => {
            const inRoute = !step.Description.startsWith('Route ')
              || !foundStep.Description.startsWith('Route ')
                && foundStep.id > step.id
                && step.Description.startsWith(startedRoute?.Description.slice(0, 8) || 'Route A')
              || foundStep.Description.startsWith('Route A')
                && step.Description.startsWith('Route A')
              || foundStep.Description.startsWith('Route B')
              && step.Description.startsWith('Route B')
            if (update.status && update.stepId === step.id 
              || step.id < update.stepId && inRoute) {
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
            } if (!update.status && update.stepId === step.id
              || step.id > update.stepId || !inRoute) {
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
    (state:IQuest[], update:IUpdateQuestSubStepStatus) => {
      const foundQuest = state.find((quest) =>
        quest.Steps.map((step) => step.id).includes(update.stepId))

      const foundStep = foundQuest?.Steps.find((step) => step.id === update.stepId);
      
      const foundSubStep = foundStep?.SubSteps?.find(
        (substep) => substep.id === update.substepId);

      if(!foundQuest  || !foundStep || !foundSubStep) {
        return state;
      }

      const uncompletedSubSteps = foundStep.SubSteps?.filter(
        (sub) => sub.CompletionProgress !== sub.Count)

      const stepCompleted = foundSubStep.Count === update.progress &&
        (uncompletedSubSteps === undefined || uncompletedSubSteps.length === 0
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
      const startedRoute = foundQuest.Steps.find((step) => step.Description.startsWith('Route ')
        && step.Completed)

      return state.filter((quest) => quest.id !== foundQuest.id)
        .concat({
          ...foundQuest,
          Steps: foundQuest.Steps.map((step) => {
            const inRoute = !step.Description.startsWith('Route ')
              || !foundStep.Description.startsWith('Route ')
                && foundStep.id > step.id
                && step.Description.startsWith(startedRoute?.Description.slice(0, 8) || 'Route A')
              || foundStep.Description.startsWith('Route A')
                && step.Description.startsWith('Route A')
              || foundStep.Description.startsWith('Route B')
              && step.Description.startsWith('Route B')

            if (inRoute && step.id < foundStep.id && update.progress > 0) {
              return {
                ...step,
                SubSteps: step.SubSteps?.map((sub) => ({
                  ...sub,
                  CompletionProgress: sub.Count
                })),
                Completed: true
              }
            } else if (step.id > foundStep.id || !inRoute) {
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
