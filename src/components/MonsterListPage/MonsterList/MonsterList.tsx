import { OptionsCheckbox } from 'components/CommonComponents/FormComponents/OptionsCheckbox';
import CollapsibleComponent from 'components/CommonComponents/Containers/CollapsibleComponent';
import OrderBy from 'components/CommonComponents/OrderBy';
import { separateMajorArea, sortFunction } from 'helpers';
import { IStoryProgress } from 'interfaces';
import path from 'path';
import { useEffect, useState } from 'react';
import './MonsterList.scss';
import { IMonsterAvailability } from 'reduxState/interfaces/availabilityState';
import { MonsterDetails } from './MonsterDetails';
import { ISelectedState } from 'reduxState/interfaces/reduxState';

interface IOwnProps {
    monsterCategory: string;
    monsters: IMonsterAvailability[];
    storyProgress: IStoryProgress;
    selected?: ISelectedState;
    updateMonStatus: (monId: number, beaten: boolean) => void;
}

export const MonsterListView = (props: IOwnProps) => {
  const [orderType, setOrderType] = useState('default');
  const [sortOrderAsc, setSortOrderAsc] = useState(true);
  const [focus, setFocused] = useState(0);

  const selectMonster = (index: number) => {
    setFocused(index)
    const header = document
      .getElementById(props.monsterCategory + ' Monsters')?.getBoundingClientRect();
    const body = document.body.getBoundingClientRect();
    window.scroll({
      top: header && body ? header.top - body.top : 0,
      behavior: 'smooth'
    })
  }
  
  const orderOptions: {[key:string]: keyof IMonsterAvailability} = {
    default: 'id',
    alphabetically: 'Name',
    type: 'Type',
    level: 'LowestLevel',
    location: 'Area',
    available: 'Available',
    beaten: 'Beaten'
  }

  const getOrderTypeColumn = (order: string): keyof IMonsterAvailability => {
    return orderOptions[order] || orderOptions.default
  }

  useEffect(() => {
    if (props.selected && props.selected.area === 'monster') {
      const foundMon = props.monsters.find((i) => i.id === props.selected?.id)
      if (foundMon && (foundMon.Available || !props.storyProgress.OnlyShowAvailable)) {
        selectMonster(props.selected.id)       
      }
    }
  }, [props.selected])


  return <CollapsibleComponent header={`${props.monsterCategory} Monsters`}>
    {focus !== 0 ?
      <MonsterDetails
        monster={props.monsters.find((mon) => mon.id === focus)}
        updateMonStatus={props.updateMonStatus}
        selectMonster={selectMonster}
      />
      : <div />
    }
    {props.monsters.length === 0 ?
      <>No monsters found.</>
      : <>
        <OrderBy
          orderOptions={Object.keys(orderOptions)}
          chosenOrder={orderType}
          changeOrder={setOrderType}
          sortOrderAsc={sortOrderAsc}
          changeSortOrderAsc={setSortOrderAsc.bind(this, !sortOrderAsc)}
        />
        <div className='data-table'>
          <div className='row table-header'>
            {props.monsterCategory === 'Unique' ?
              <b className='column-narrow order-title'>Beaten</b>
              : <b className='available-column column-unrestricted order-title-available'>
                Available
              </b>
            }
            <b className='column-very-narrow order-title-available'>DLC?</b>
            <b className="column-medium order-title-available">Type</b>
            <b className="level-column column-narrow order-title-available">Level</b>
            <b className="column-medium order-title">Location</b>
            <b className="column-unrestricted order-title">Name</b>
          </div>
          <div className='table-outline monster-table'>
            {props.monsters.sort((monA, monB) => {
              const monAValue = monA[getOrderTypeColumn(orderType)]
              const monBValue = monB[getOrderTypeColumn(orderType)]
              return sortFunction(monAValue, monBValue, sortOrderAsc)
            }).map((mon:IMonsterAvailability) =>
              <div
                className={`row text-list-entry ${
                  mon.Available ? ' hoverPointer' : ''} ${
                  mon.id === focus ? ' selected-row' : ''}`}
                key={mon.id}
              >
                {props.monsterCategory === 'Unique' ?
                  <div className='column-narrow text-list-status'>
                    <OptionsCheckbox
                      hideAvailable={true}
                      available={mon.Available}
                      unlocked={mon.Beaten}
                      onClick={(completed) => {
                        if (typeof completed === 'boolean') {
                          props.updateMonStatus(mon.id, completed)
                        }
                      }}
                      size='small'
                    />
                  </div>
                  : <div className='column-narrow available-column text-list-status'>
                    <img
                      src={path.resolve(`images/helper/${mon.Available ?
                        'GreenCheckmark' : 'RedX'}.svg`)}
                      alt={mon.Name}
                      className="availability-small-image"
                    />
                  </div>
                }
                <div className='column-very-narrow text-list-status'>
                  <img
                    src={path.resolve(`images/helper/${mon.DLCRequired ?
                      'GreenCheckmark' : 'RedX'}.svg`)}
                    alt={mon.Name}
                    className="availability-small-image"
                  />
                </div>
                <div
                  className="column-medium text-list-status"
                >
                  {mon.Type}
                </div>
                <div className='level-column column-narrow text-list-status'>
                  {mon.LowestLevel}{mon.HighestLevel ? ` - ${mon.HighestLevel}` : ''}
                </div>
                <div
                  className="column-medium text-list-status"
                >
                  {!props.storyProgress.OnlyShowAvailable || mon.Available ?
                    separateMajorArea(mon.Area) : '????'}
                </div>
                {!props.storyProgress.OnlyShowAvailable || mon.Available ?
                  <div className="text-list-link" onClick={() => selectMonster(mon.id)}>
                    {mon.Name}
                  </div>
                  : <div className='text-list-link'><i>Monster {mon.id}</i></div>
                }
              </div>
            )}
          </div>
        </div>
      </>}
  </CollapsibleComponent>
}