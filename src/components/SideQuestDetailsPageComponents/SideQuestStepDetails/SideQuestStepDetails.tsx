import CollapsibleComponent from 'components/CommonComponents/Containers/CollapsibleComponent'
import { OptionsCheckbox } from 'components/CommonComponents/FormComponents/OptionsCheckbox'
import { IUpdateQuestStepStatus, IUpdateQuestSubStepStatus } from 'reduxState/interfaces/quest'
import { IQuestState, IQuestStepState } from 'reduxState/interfaces/reduxState'

interface IProps {
  quest: IQuestState
}

interface IDispatchProps {
  updateQuestStepStatus: (payload: IUpdateQuestStepStatus) => void,
  updateQuestSubStepStatus: (payload: IUpdateQuestSubStepStatus) => void
}

const QuestStep = (
  step: IQuestStepState,
  questAvailable: boolean,
  actions: IDispatchProps
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
  routeA: IQuestStepState[],
  routeB: IQuestStepState[],
  questAvailable: boolean,
  actions: IDispatchProps) => 
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

  return <CollapsibleComponent header="Quest Steps">
    <>
      Completed steps: {completedStepNumber} / {lastStepNumber}
      {allRoutes.map((step) =>
        <div key={`step${step.StepNumber}`}>
          {QuestStep(
            step,
            props.quest.Available,
            {
              updateQuestStepStatus: props.updateQuestStepStatus,
              updateQuestSubStepStatus: props.updateQuestSubStepStatus
            }
          )}
          {step.StepNumber === (routeA.at(0)?.StepNumber || 0) - 1
          && step.StepNumber === (routeB.at(0)?.StepNumber || 0) - 1 ?
            QuestRoutes(
              routeA,
              routeB,
              props.quest.Available,
              {
                updateQuestStepStatus: props.updateQuestStepStatus,
                updateQuestSubStepStatus: props.updateQuestSubStepStatus
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
          updateQuestStepStatus: props.updateQuestStepStatus,
          updateQuestSubStepStatus: props.updateQuestSubStepStatus
        }
      )}
    </>
  </CollapsibleComponent>
}