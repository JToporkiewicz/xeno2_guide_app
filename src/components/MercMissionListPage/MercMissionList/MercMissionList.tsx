import CollapsibleComponent from 'components/CommonComponents/Containers/CollapsibleComponent';
import { HoverContainer } from 'components/CommonComponents/Containers/HoverContainer';
import { OptionsCheckbox } from 'components/CommonComponents/FormComponents/OptionsCheckbox';
import { LinkSelected } from 'components/CommonComponents/LinkSelected';
import OrderBy from 'components/CommonComponents/OrderBy';
import { RequirementList } from 'components/CommonComponents/RequirementList';
import { sortFunction } from 'helpers';
import { Routes } from 'helpers/routesConst';
import { IStoryProgress } from 'interfaces'
import { RequirementArea } from 'interfaces/common';
import path from 'path';
import { ReactChild, useEffect, useState } from 'react';
import { IMercMissionAvailability } from 'reduxState/interfaces/availabilityState';
import { IUpdateDevelopmentLevel } from 'reduxState/interfaces/locations';

interface IDispatchProps {
  setStoryProgress:(payload:IStoryProgress) => void;
  updateDevelopmentLevel: (payload:IUpdateDevelopmentLevel) => void;
}

interface IOwnProps {
  location: string;
  mercMissions: IMercMissionAvailability[];
  storyProgress: React.MutableRefObject<IStoryProgress>;
  updatedLocDevLevel: React.MutableRefObject<IUpdateDevelopmentLevel[]>;
  updateMMStatus: (mmId: number, completed: boolean) => void;
}

export const MercMissionListView = (props: IOwnProps & IDispatchProps) => {
  const [orderType, setOrderType] = useState('default');
  const [sortOrderAsc, setSortOrderAsc] = useState(true);

  const [mercMissionEntries, setMMEntries] = useState([] as ReactChild[])

  const orderOptions: {[key:string]: keyof IMercMissionAvailability} = {
    default: 'id',
    alphabetically: 'Name',
    location: 'MissionNation',
    available: 'Available',
    completed: 'Completed',
    type: 'Type',
    missable: 'Missable'
  }

  const getOrderTypeColumn = (order: string): keyof IMercMissionAvailability => {
    return orderOptions[order] || orderOptions.default
  }

  useEffect(() => {
    if(props.storyProgress.current) {
      setMMEntries(
        props.mercMissions.sort((mmA, mmB) => {
          const mmAValue = mmA[getOrderTypeColumn(orderType)]
          const mmBValue = mmB[getOrderTypeColumn(orderType)]
          return sortFunction(mmAValue, mmBValue, sortOrderAsc)
        }).map((mm:IMercMissionAvailability) =>
          <div className="row text-list-entry" key={mm.id}>
            <div className='column-narrow text-list-status'>
              <OptionsCheckbox
                hideAvailable={true}
                available={mm.Available}
                unlocked={mm.Completed}
                onClick={(completed) => {
                  if (typeof completed === 'boolean') {
                    props.updateMMStatus(mm.id, completed)
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
            {!props.storyProgress.current.OnlyShowAvailable || mm.Available ?
              <LinkSelected
                className="text-list-link"
                to={Routes.MERC_MISSION + mm.id}
                area='mercMission'
                id={mm.id}
              >
                {mm.Name}
              </LinkSelected>
              : <div className='text-list-link'><i>Merc Mission {mm.id}</i></div>
            }
            {
              mm.Prerequisites &&
                <HoverContainer>
                  <RequirementList
                    requirements={mm.Prerequisites}
                    updateReqProgress={(id, progress, area) => {
                      if (area === RequirementArea['Merc Level']) {
                        props.setStoryProgress({
                          ...props.storyProgress.current,
                          MercLevel: progress
                        });
                        props.storyProgress.current = {
                          ...props.storyProgress.current,
                          MercLevel: progress
                        };
                      }

                      else if (area === RequirementArea['Nation Dev Level']) {
                        props.updateDevelopmentLevel({
                          id,
                          level: progress
                        })
                        props.updatedLocDevLevel.current = props.updatedLocDevLevel.current
                          .filter((loc) => loc.id !== id)
                          .concat({ id, level: progress })
                          .sort((idA, idB) => idA.id < idB.id ? -1 : 1)
                      }
                    }}
                  />
                </HoverContainer>
            }
          </div>
        )
      )
    }
  }, [props.storyProgress.current, props.mercMissions, orderType, sortOrderAsc])

  return <CollapsibleComponent header={props.location}>
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
        <div className='data-table'>
          <div className='row'>
            <b className='column-narrow order-title'>Done</b>
            <b className='column-unrestricted order-title-available'>Available</b>
            <b className="column-unrestricted order-title-available">Missable</b>
            <b className="column-medium order-title">Type</b>
            <b className="column-unrestricted order-title">Name</b>
          </div>
          <div className='table-outline'>
            {mercMissionEntries}
          </div>
        </div>
      </>
    }
  </CollapsibleComponent>
}