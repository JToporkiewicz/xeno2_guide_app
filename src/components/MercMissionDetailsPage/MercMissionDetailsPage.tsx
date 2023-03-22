import CollapsibleComponent from 'components/CommonComponents/Containers/CollapsibleComponent'
import HeaderContainer from 'components/CommonComponents/Containers/HeaderContainer'
import { OptionsCheckbox } from 'components/CommonComponents/FormComponents/OptionsCheckbox'
import { RequirementList } from 'components/CommonComponents/RequirementList'
import { IMercMission } from 'interfaces'
import path from 'path'
import { useEffect, useRef } from 'react'
import { IUpdateMMStatus } from 'reduxState/interfaces/mercMission'
import { IUpdateUnlocked } from 'reduxState/interfaces/reduxState'

interface IProps {
  mercMission: IMercMission
}

interface IDispatchProps {
  updateMercMissionStatus: (input:IUpdateMMStatus) => void;
  saveMercMissionStatus: (input:IUpdateUnlocked) => void;
  fetchMercMission: (input: string) => void;
}

export const MercMissionDetailsPageView = (props:IProps & IDispatchProps) => {
  const mmToUpdate = useRef(undefined as IMercMission | undefined);

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
          [mmToUpdate.current.Completed ? 'unlocked' : 'locked']: [mmToUpdate.current.id]
        })
      }
    }
  }, [])
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
      <RequirementList requirements={props.mercMission.Requirements} />
    </CollapsibleComponent>
  </>
}