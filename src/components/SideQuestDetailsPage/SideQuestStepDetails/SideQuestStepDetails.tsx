import CollapsibleComponent from 'components/CommonComponents/Containers/CollapsibleComponent'
import { OptionsCheckbox } from 'components/CommonComponents/FormComponents/OptionsCheckbox'
import { IQuest, IQuestStep, IQuestSubStep } from 'interfaces'
import { useEffect, useRef } from 'react'
import {
  ISaveQuestStepStatus,
  ISaveQuestSubStepStatus,
  IUpdateQuestStepStatus,
  IUpdateQuestSubStepStatus
} from 'reduxState/interfaces/quest'

interface IProps {
  quest: IQuest
}

interface IInnerDispatchProps {
  updateQuestStepStatus: (payload: IUpdateQuestStepStatus) => void,
  updateQuestSubStepStatus: (payload: IUpdateQuestSubStepStatus) => void,
}

interface IDispatchProps extends IInnerDispatchProps {
  saveQuestStepStatus: (payload: ISaveQuestStepStatus) => void,
  saveQuestSubStepStatus: (payload: ISaveQuestSubStepStatus) => void
}

const QuestStep = (
  step: IQuestStep,
  questAvailable: boolean,
  actions: IInnerDispatchProps
) => 
  <div
    className={`questStep${step.Completed ? ' stepCompleted' : ''}`}
  >
    <div className={'questDetails'}>
      <div className="stepBasics">
        <OptionsCheckbox
          hideAvailable={true}
          available={questAvailable}
          unlocked={step.Completed}
          onClick={() => actions.updateQuestStepStatus({
            stepId: step.id,
            status: !step.Completed
          })}
          size='medium'
        />
      </div>
      <b className="stepBasics">{step.StepNumber}. </b>
      <div className="stepDetails">{step.Description}</div>
    </div>
    {step.SubSteps && step.SubSteps.length > 0 && step.SubSteps.map((subStep, subIndex) =>
      <div key={`step${step.StepNumber}-substep${subIndex}`} className={'questDetails'}>
        <div className="stepBasics"/>
        <div className="stepBasics">
          {step.SubSteps && step.SubSteps.length > 1 ?
            <div>
              <div className='questDetails'>
                <OptionsCheckbox
                  hideAvailable={true}
                  available={questAvailable}
                  unlocked={subStep.Count === 1 ?
                    subStep.CompletionProgress === subStep.Count : undefined}
                  states={subStep.Count === 1 ?
                    undefined : Array.from(Array(subStep.Count + 1).keys()).map((count) => (
                      {
                        text: String(count),
                        active: count === subStep.CompletionProgress
                      }
                    ))
                  }
                  onClick={(progress) => actions.updateQuestSubStepStatus({
                    stepId: step.id,
                    substepId: subStep.id,
                    progress: Number(progress)
                  })}
                  size='medium'
                />
                {subStep.Count > 1 && <p>/{subStep.Count}</p>}
              </div>
            </div> : <div />
          }
        </div>
        <b className="stepBasics">
          {step.SubSteps && step.SubSteps.length > 1 ?
            `${subStep.SubStepNumber}.` : '' }
        </b>
        <div className="stepDetails">
          {step.SubSteps && step.SubSteps.length > 1 ?
            subStep.Description : <i>{subStep.Description}</i>
          }
        </div>
      </div>
    )}
  </div>

const QuestRoutes = (
  routeA: IQuestStep[],
  routeB: IQuestStep[],
  questAvailable: boolean,
  actions: IInnerDispatchProps) => 
  <div className='row'>
    <div className='col-sm-6'>
      <b className='questRouteHeader'>Route A:</b>
      {routeA.map((stepA) => QuestStep(stepA, questAvailable, actions))}
    </div>
    <div className='col-sm-6'>
      <b className='questRouteHeader'>Route B:</b>
      {routeB.map((stepB) => QuestStep(stepB, questAvailable, actions))}
    </div>
  </div>

export const SideQuestStepDetailsView = (props:IProps & IDispatchProps) => {
  const saveSteps = useRef(false);
  const currentStep = useRef(undefined as undefined |
    {stepId: number, startedRoute: string });

  const saveSubSteps = useRef(false);
  const currentSubStep = useRef(undefined as undefined |
    { stepId: number, subSteps: IQuestSubStep[], startedRoute: string })

  const routeA = props.quest.Steps
    .filter((step) => step.Description.startsWith('Route A:'))
    .map((step) => ({...step, Description: step.Description.replace('Route A: ', '')}))
    .sort((stepA, stepB) => stepA.StepNumber < stepB.StepNumber ? -1 : 1);
  const routeB = props.quest.Steps
    .filter((step) => step.Description.startsWith('Route B:'))
    .map((step) => ({...step, Description: step.Description.replace('Route B: ', '')}))
    .sort((stepA, stepB) => stepA.StepNumber < stepB.StepNumber ? -1 : 1);
  const allRoutes = props.quest.Steps
    .filter((step) => !routeA.map((A) => A.id).includes(step.id) &&
      !routeB.map((B) => B.id).includes(step.id))
    .sort((stepA, stepB) => stepA.StepNumber < stepB.StepNumber ? -1 : 1);

  const completedStepNumber = props.quest.Steps
    .filter((steps) => steps.Completed)
    .sort((stepA, stepB) => stepA.StepNumber < stepB.StepNumber ? -1 : 1)
    .at(-1)?.StepNumber || 0;
  const lastStepNumber = props.quest.Steps
    .sort((stepA, stepB) => stepA.StepNumber < stepB.StepNumber ? -1 : 1)
    .at(-1)?.StepNumber || 0;

  useEffect(() => {
    return () => {
      if (saveSteps.current) {
        props.saveQuestStepStatus({
          lastCompletedStep: currentStep.current?.stepId || 0,
          questId: props.quest.id,
          startedRoute: currentStep.current?.startedRoute || 'Route A'
        })
      }
      if (saveSubSteps.current) {
        props.saveQuestSubStepStatus({
          stepId: currentSubStep.current?.stepId || 0,
          questId: props.quest.id,
          subSteps: currentSubStep.current?.subSteps
            .map((ss) => ({ subStepId: ss.id, progress: ss.CompletionProgress || 0})) || [],
          startedRoute: currentSubStep.current?.startedRoute || 'Route A'
        })
      }
    }
  }, [])

  useEffect(() => {
    if (props.quest.Steps && saveSteps.current) {
      currentStep.current ={
        stepId: props.quest.Steps.filter((steps) => steps.Completed)
          .sort((stepA, stepB) => stepA.StepNumber < stepB.StepNumber ? -1 : 1)
          .at(-1)?.id || 0,
        startedRoute: props.quest.Steps.find((step) =>
          step.Description.startsWith('Route ') && step.Completed
        )?.Description.slice(0, 8) || 'Route A'
      };
    } else if (props.quest.Steps && saveSubSteps.current) {
      const stepWithSubStep = props.quest.Steps
        .filter((steps) => steps.SubSteps
          && steps.SubSteps
            .filter((sub) => sub.CompletionProgress && sub.CompletionProgress > 0)?.length > 0)
        .sort((stepA, stepB) => stepA.StepNumber < stepB.StepNumber ? -1 : 1)
        .at(-1);
      currentSubStep.current = {
        stepId: stepWithSubStep?.id || 0,
        subSteps: stepWithSubStep?.SubSteps || [],
        startedRoute: props.quest.Steps.find((step) =>
          step.Description.startsWith('Route ') && step.Completed
        )?.Description.slice(0, 8) || 'Route A'
      }
    }
  }, [props.quest.Steps.map((step) => step.Completed),
    props.quest.Steps.map((step) => step.SubSteps?.filter((sub) =>
      sub.CompletionProgress))])

  const updateStep = (payload: IUpdateQuestStepStatus) => {
    props.updateQuestStepStatus(payload)
    saveSteps.current = true
    saveSubSteps.current = false
  }

  const updateSubStep = (payload: IUpdateQuestSubStepStatus) => {
    props.updateQuestSubStepStatus(payload)
    saveSteps.current = false
    saveSubSteps.current = true
  }

  return <CollapsibleComponent header="Quest Steps">
    <>
      Completed steps: {completedStepNumber} / {lastStepNumber}
      {allRoutes.map((step) =>
        <div key={`step${step.StepNumber}`}>
          {QuestStep(
            step,
            props.quest.Available,
            {
              updateQuestStepStatus: updateStep,
              updateQuestSubStepStatus: updateSubStep
            }
          )}
          {step.StepNumber === (routeA.at(0)?.StepNumber || 0) - 1
          && step.StepNumber === (routeB.at(0)?.StepNumber || 0) - 1 ?
            QuestRoutes(
              routeA,
              routeB,
              props.quest.Available,
              {
                updateQuestStepStatus: updateStep,
                updateQuestSubStepStatus: updateSubStep
              }
            ) : <div />
          }
        </div>
      )}
      {allRoutes.length === 0 && QuestRoutes(
        routeA,
        routeB,
        props.quest.Available,
        {
          updateQuestStepStatus: updateStep,
          updateQuestSubStepStatus: updateSubStep
        }
      )}
    </>
  </CollapsibleComponent>
}