import CollapsibleComponent from 'components/CommonComponents/Containers/CollapsibleComponent'
import HeaderContainer from 'components/CommonComponents/Containers/HeaderContainer'
import { OptionsCheckbox } from 'components/CommonComponents/FormComponents/OptionsCheckbox'
import path from 'path'
import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { IUpdateMMStatus } from 'reduxState/interfaces/mercMission'
import { IMercMissionState } from 'reduxState/interfaces/reduxState'

interface IProps {
  mercMission: IMercMissionState
}

interface IDispatchProps {
  updateMercMissionStatus: (input:IUpdateMMStatus) => void;
  saveMercMissionStatus: (input:IUpdateMMStatus) => void;
  fetchMercMission: (input: string) => void;
}

export const MercMissionDetailsPageView = (props:IProps & IDispatchProps) => {
  const mmToUpdate = useRef(undefined as IMercMissionState | undefined);

  const updateMMCompleted = () => {
    if(props.mercMission) {
      mmToUpdate.current = {
        ...props.mercMission,
        Completed: !props.mercMission.Completed
      }

      props.updateMercMissionStatus({
        id: props.mercMission.id,
        completed: !props.mercMission.Completed
      })
    }
  }

  useEffect(() => {
    return () => {
      if(mmToUpdate.current) {
        props.saveMercMissionStatus({
          id: mmToUpdate.current.id,
          completed: mmToUpdate.current.Completed
        })
      }
    }
  })
  return <>
    <HeaderContainer
      title={props.mercMission.Name}
      refreshData={props.fetchMercMission}
      refreshDataId={props.mercMission.id}
    />
    <CollapsibleComponent header='Mission Details'>
      <div className='row'>
        <div className='col-sm-4'>
          <OptionsCheckbox
            title='Completed: '
            available={props.mercMission.Available}
            unlocked={props.mercMission.Completed}
            onClick={updateMMCompleted}
          />
        </div>
        <div className='col-sm-4'>
          <div className='centered'>
            <p>
              <b>Missable: </b>
              <img 
                src={path.resolve(`images/helper/${props.mercMission.Missable ?
                  'GreenCheckmark' : 'RedX'}.svg`)}
                alt={'Missability'}
                className="availability-small-image inline-image"
              />
            </p>
            <p>
              <b>Type: </b>
              {props.mercMission.Type}
            </p>
            <p>
              <b>Duration: </b>
              {props.mercMission.Duration}
            </p>
          </div>
        </div>
        <div className='col-sm-4'>
          <div className='centered'>
            <p>
              <b>Nation: </b>
              {props.mercMission.MissionNation}
            </p>
            {props.mercMission.Giver !== 'None' &&
              <p>
                <b>Giver: </b>
                {props.mercMission.Giver}
              </p>
            }
            {props.mercMission.Giver !== 'None' &&
              <p>
                <b>Giver Location: </b>
                {props.mercMission.GiverLocation}
              </p>
            }
          </div>
        </div>
      </div>
    </CollapsibleComponent>
    <CollapsibleComponent header='Requirements'>
      <ul>
        {props.mercMission.Requirements.map((req) =>
          <li>
            <div className='row'>
              <div className='col-sm-5'>
                <b>
                  {req.area === 'Blade' || req.area === 'Field Skills' ?
                    <Link to={'/bladeList'}>{req.area}
                    </Link> : req.area
                  }
                : </b>{req.requirement}
              </div>
              {req.requirementCount &&
                <div className='col-sm-2'>
                  Number: {req.requirementCount}
                </div>
              }
              {req.available !== undefined &&
              <div className='col-sm-2'>Available:
                <img 
                  src={path.resolve(`images/helper/${req.available ?
                    'GreenCheckmark' : 'RedX'}.svg`)}
                  alt={'Available'}
                  className="availability-small-image inline-image"
                />
              </div>}
              {req.completed !== undefined &&
              <div className='col-sm-3'>Achieved:<img 
                src={path.resolve(`images/helper/${req.completed ?
                  'GreenCheckmark' : 'RedX'}.svg`)}
                alt={'Completed'}
                className="availability-small-image inline-image"
              /></div>}
            </div></li>
        )}
      </ul>
    </CollapsibleComponent>
  </>
}