import CollapsibleComponent from 'components/CommonComponents/Containers/CollapsibleComponent';
import { HoverContainer } from 'components/CommonComponents/Containers/HoverContainer';
import { OptionsCheckbox } from 'components/CommonComponents/FormComponents/OptionsCheckbox';
import OrderBy from 'components/CommonComponents/OrderBy';
import { RequirementList } from 'components/CommonComponents/RequirementList';
import { sortFunction } from 'helpers';
import { IStoryProgress } from 'interfaces'
import { RequirementArea } from 'interfaces/common';
import path from 'path';
import { useEffect, useState } from 'react';
import { IMercMissionAvailability } from 'reduxState/interfaces/availabilityState';
import { IUpdateDevelopmentLevel } from 'reduxState/interfaces/locations';
import { MercMissionDetails } from './MercMissionDetails';
import { ISelectedState } from 'reduxState/interfaces/reduxState';

interface IDispatchProps {
  setStoryProgress:(payload:IStoryProgress) => void;
  updateDevelopmentLevel: (payload:IUpdateDevelopmentLevel) => void;
}

interface IOwnProps {
  location: string;
  mercMissions: IMercMissionAvailability[];
  storyProgress: React.MutableRefObject<IStoryProgress>;
  updatedLocDevLevel: React.MutableRefObject<IUpdateDevelopmentLevel[]>;
  selected?: ISelectedState;
  updateMMStatus: (mmId: number, completed: boolean) => void;
}

export const MercMissionListView = (props: IOwnProps & IDispatchProps) => {
  const [orderType, setOrderType] = useState('default');
  const [sortOrderAsc, setSortOrderAsc] = useState(true);
  const [focused, setFocused] = useState(0)

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

  const selectMercMission = (index: number) => {
    setFocused(index)
    const header = document.getElementById(props.location)?.getBoundingClientRect();
    const body = document.body.getBoundingClientRect();
    window.scroll({
      top: header && body ? header?.top - body?.top : 0,
      behavior: 'smooth'
    })
  }
  
  const updateRequirementProgress = (id:number, progress:number, area?:string | undefined) => {
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

    else if (area === RequirementArea['Story Progress']) {
      props.setStoryProgress({
        ...props.storyProgress.current,
        Chapter: progress
      });
      props.storyProgress.current = {
        ...props.storyProgress.current,
        Chapter: progress
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
  }

  useEffect(() => {
    if (props.selected && props.selected.area === 'mercMission') {
      const foundMM = props.mercMissions.find((mm) => mm.id === props.selected?.id)
      if (foundMM && (foundMM.Available || !props.storyProgress.current.OnlyShowAvailable)) {
        selectMercMission(foundMM.id);
      }
    }
  }, [props.selected])

  return <CollapsibleComponent header={props.location}>
    {
      focused !== 0 ?
        <MercMissionDetails
          mercMission={props.mercMissions.find((mm) => mm.id === focused)}
          setFocus={selectMercMission}
          updateMMStatus={props.updateMMStatus}
          updateRequirementProgress={updateRequirementProgress}          
        />
        : <div />
    }
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
            {props.mercMissions.sort((mmA, mmB) => {
              const mmAValue = mmA[getOrderTypeColumn(orderType)]
              const mmBValue = mmB[getOrderTypeColumn(orderType)]
              return sortFunction(mmAValue, mmBValue, sortOrderAsc)
            }).map((mm:IMercMissionAvailability) =>
              <div
                className={`row text-list-entry ${
                  mm.Available ? 'hoverPointer' : ''} ${
                  mm.id === focused ? 'selected-row' : ''}`}
                key={mm.id}
              >
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
                  <div className="text-list-link" onClick={() => selectMercMission(mm.id)}>
                    {mm.Name}
                  </div>
                  : <div className='text-list-link'><i>Merc Mission {mm.id}</i></div>
                }
                {
                  mm.Prerequisites &&
                    <HoverContainer>
                      <RequirementList
                        requirements={mm.Prerequisites}
                        updateReqProgress={updateRequirementProgress}
                      />
                    </HoverContainer>
                }
              </div>
            )}
          </div>
        </div>
      </>
    }
  </CollapsibleComponent>
}