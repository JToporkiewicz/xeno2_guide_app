import { OptionsCheckbox } from 'components/CommonComponents/FormComponents/OptionsCheckbox'
import { RequirementList } from 'components/CommonComponents/RequirementList'
import path from 'path'
import { IMercMissionAvailability } from 'reduxState/interfaces/availabilityState'

interface IOwnProps {
    mercMission: IMercMissionAvailability | undefined,
    setFocus: (id: number) => void,
    updateMMStatus: (mmId: number, completed: boolean) => void,
    updateRequirementProgress: (id:number, progress:number, area?:string | undefined) => void
}

export const MercMissionDetails = (props: IOwnProps) => {
  if (!props.mercMission) {
    return <div />
  }

  const mm = props.mercMission;

  return <>
    <div>
      <img
        src={path.resolve('images/helper/Close.svg')}
        alt="close"
        className="close-details"
        onClick={() => props.setFocus(0)}
      />
      <h3>{mm.Name}</h3>
      <div className='row'>
        <div className='col-sm-4'>
          <OptionsCheckbox
            title='Completed: '
            available={mm.Available}
            unlocked={mm.Completed}
            onClick={(completed) => {
              if (typeof completed === 'boolean') {
                props.updateMMStatus(mm.id, completed)
              }
            }}
          />
        </div>
        <div className='col-sm-4'>
          <div className='centered'>
            <p>
              <b>Missable: </b>
              <img 
                src={path.resolve(`images/helper/${mm.Missable ?
                  'GreenCheckmark' : 'RedX'}.svg`)}
                alt={'Missability'}
                className="availability-small-image inline-image"
              />
            </p>
            <p>
              <b>Type: </b>
              {mm.Type}
            </p>
            <p>
              <b>Duration: </b>
              {mm.Duration}
            </p>
          </div>
        </div>
        <div className='col-sm-4'>
          <div className='centered'>
            <p>
              <b>Nation: </b>
              {mm.MissionNation}
            </p>
            {mm.Giver !== 'None' &&
              <p>
                <b>Giver: </b>
                {mm.Giver}
              </p>
            }
            {mm.Giver !== 'None' &&
              <p>
                <b>Giver Location: </b>
                {mm.GiverLocation}
              </p>
            }
          </div>
        </div>
      </div>
      <hr className='item-details-line' />
      {
        mm.Prerequisites ?
          <>
            <b>Prerequisites:</b>
            <RequirementList
              requirements={mm.Prerequisites}
              updateReqProgress={props.updateRequirementProgress}
            />
          </>
          : ''
      }
      <hr className='item-details-line' />
      <b>Requirements:</b>
      <RequirementList requirements={props.mercMission.Requirements} />
    </div>
    <hr />
  </>
}