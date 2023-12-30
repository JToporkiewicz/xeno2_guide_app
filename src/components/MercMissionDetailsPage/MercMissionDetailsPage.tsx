import CollapsibleComponent from 'components/CommonComponents/Containers/CollapsibleComponent'
import HeaderContainer from 'components/CommonComponents/Containers/HeaderContainer'
import { OptionsCheckbox } from 'components/CommonComponents/FormComponents/OptionsCheckbox'
import { RequirementList } from 'components/CommonComponents/RequirementList'
import { IMercMission, IStoryProgress } from 'interfaces'
import { RequirementArea } from 'interfaces/common'
import path from 'path'
import { useEffect, useRef } from 'react'
import { IUpdateDevelopmentLevel } from 'reduxState/interfaces/locations'
import { IUpdateMMStatus } from 'reduxState/interfaces/mercMission'
import { IUpdateUnlocked } from 'reduxState/interfaces/reduxState'

interface IProps {
  mercMission: IMercMission;
  storyProgress: IStoryProgress;
}

interface IDispatchProps {
  updateMercMissionStatus: (input:IUpdateMMStatus) => void;
  saveMercMissionStatus: (input:IUpdateUnlocked) => void;
  fetchMercMission: (input: string) => void;
  setStoryProgress:(payload:IStoryProgress) => void;
  updateDevelopmentLevel: (payload:IUpdateDevelopmentLevel) => void;
  saveStoryProgress: (input:IStoryProgress) => void;
  saveDevelopmentLevel: (payload:IUpdateDevelopmentLevel) => void;
}

export const MercMissionDetailsPageView = (props:IProps & IDispatchProps) => {
  const mmToUpdate = useRef(undefined as IMercMission | undefined);
  const updatedLocDevLevel = useRef([] as IUpdateDevelopmentLevel[])
  const updatedProgress = useRef(props.storyProgress as IStoryProgress);

  useEffect(() => {
    return () => {
      if (updatedProgress.current !== props.storyProgress) {
        props.saveStoryProgress(updatedProgress.current)
      }
      if (updatedLocDevLevel.current.length !== 0) {
        updatedLocDevLevel.current.forEach((loc) =>
          props.saveDevelopmentLevel(loc)
        )
      }
    }
  }, [])


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
    {props.mercMission.Prerequisites ?
      <CollapsibleComponent header='Prerequisites'>
        <RequirementList
          requirements={props.mercMission.Prerequisites}
          updateReqProgress={(id, progress, area) => {
            if (area === RequirementArea['Merc Level']) {
              props.setStoryProgress({
                ...updatedProgress.current,
                MercLevel: progress
              });
              updatedProgress.current = {
                ...updatedProgress.current,
                MercLevel: progress
              };
            }

            else if (area === RequirementArea['Nation Dev Level']) {
              props.updateDevelopmentLevel({
                id,
                level: progress
              })
              updatedLocDevLevel.current = updatedLocDevLevel.current
                .filter((loc) => loc.id !== id)
                .concat({ id, level: progress })
                .sort((idA, idB) => Number(idA.id) < Number(idB.id) ? -1 : 1)
            }
          }}
        />
      </CollapsibleComponent> : ''
    }
    <CollapsibleComponent header='Requirements'>
      <RequirementList requirements={props.mercMission.Requirements} />
    </CollapsibleComponent>
  </>
}