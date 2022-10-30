import CollapsibleComponent from 'components/CommonComponents/Containers/CollapsibleComponent'
import HeaderContainer from 'components/CommonComponents/Containers/HeaderContainer'
import { OptionsCheckbox } from 'components/CommonComponents/FormComponents/OptionsCheckbox'
import OrderBy from 'components/CommonComponents/OrderBy'
import { sortFunction } from 'helpers'
import { IStoryProgress } from 'interfaces'
import path from 'path'
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { IUpdateMMStatus } from 'reduxState/interfaces/mercMission'
import { IMercMissionState } from 'reduxState/interfaces/reduxState'

interface IProps {
  mercMissions: IMercMissionState[],
  storyProgress: IStoryProgress
}

interface IDispatchProps {
  updateMercMissionStatus: (input:IUpdateMMStatus) => void;
  saveMercMissionStatus: (input:IUpdateMMStatus) => void;
}

export const MercMissionListPageView = (props: IProps & IDispatchProps) => {
  const [orderType, setOrderType] = useState('default');
  const [sortOrderAsc, setSortOrderAsc] = useState(true);

  const toUpdate = useRef([] as IUpdateMMStatus[]);

  useEffect(() => {
    return () => {
      toUpdate.current.map((mm) =>
        props.saveMercMissionStatus(mm)
      )
    }
  }, [])
  const orderOptions: {[key:string]: keyof IMercMissionState} = {
    default: 'id',
    alphabetically: 'Name',
    location: 'MissionNation',
    available: 'Available',
    completed: 'Completed',
    type: 'Type',
    missable: 'Missable'
  }

  const getOrderTypeColumn = (order: string): keyof IMercMissionState => {
    return orderOptions[order] || orderOptions.default
  }

  return <>
    <HeaderContainer title="Merc Missions" />
    <CollapsibleComponent header="Merc Missions">
      {props.mercMissions.length === 0 ?
        <>No merc missions found.</>
        : <>
          <OrderBy
            orderOptions={Object.keys(orderOptions)}
            chosenOrder={orderType}
            changeOrder={setOrderType}
            sortOrderAsc={sortOrderAsc}
            changeSortOrderAsc={setSortOrderAsc.bind(this, !sortOrderAsc)}
          />
          <div className='row'>
            <b className='column-narrow order-title'>Done</b>
            <b className='column-unrestricted order-title-available'>Available</b>
            <b className="column-unrestricted order-title-available">Missable</b>
            <b className="column-medium order-title">Type</b>
            <b className="column-wide order-title">Location</b>
            <b className="column-unrestricted order-title">Name</b>
          </div>
          <div className='table-outline'>
            {props.mercMissions.sort((mmA, mmB) => {
              const mmAValue = mmA[getOrderTypeColumn(orderType)]
              const mmBValue = mmB[getOrderTypeColumn(orderType)]
              return sortFunction(mmAValue, mmBValue, sortOrderAsc)
            }).map((mm:IMercMissionState) =>
              <div className="row text-list-entry" key={mm.id}>
                <div className='column-narrow text-list-status'>
                  <OptionsCheckbox
                    hideAvailable={true}
                    available={mm.Available}
                    unlocked={mm.Completed}
                    onClick={(completed) => {
                      if (typeof completed === 'boolean') {
                        props.updateMercMissionStatus({
                          id: mm.id,
                          completed: completed
                        });
                        toUpdate.current = toUpdate.current
                          .filter((updateMM) => updateMM.id !== mm.id)
                          .concat([{
                            id: mm.id,
                            completed: completed
                          }])
                      }
                    }}
                    size='small'
                  />
                </div>
                <div className='column-narrow text-list-status'>
                  <img 
                    src={path.resolve(`images/helper/${mm.Available ?
                      'GreenCheckmark' : 'RedX'}.svg`)}
                    alt={mm.Name}
                    className="availability-small-image"
                  />
                </div>
                <div
                  className="column-narrow text-list-status"
                >
                  <img 
                    src={path.resolve(`images/helper/${mm.Missable ?
                      'GreenCheckmark' : 'RedX'}.svg`)}
                    alt={mm.Name+'Missability'}
                    className="availability-small-image"
                  />
                </div>
                <div
                  className="column-medium text-list-status"
                >
                  {mm.Type}
                </div>
                <div
                  className="column-wide text-list-status"
                >
                  {mm.MissionNation}
                </div>
                <Link
                  className="text-list-link"
                  to={`/mercMission/${mm.id}`}
                >
                  {mm.Name}
                </Link>
              </div>
            )}
          </div>
        </>}
    </CollapsibleComponent>
  </>
}