import { OptionsCheckbox } from 'components/CommonComponents/FormComponents/OptionsCheckbox';
import CollapsibleComponent from 'components/CommonComponents/Containers/CollapsibleComponent';
import OrderBy from 'components/CommonComponents/OrderBy';
import { sortFunction } from 'helpers';
import { IStoryProgress } from 'interfaces';
import path from 'path';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { IMonsterState } from 'reduxState/interfaces/reduxState';
import './MonsterList.scss';

interface IOwnProps {
    monsterCategory: string;
    monsters: IMonsterState[];
    storyProgress: IStoryProgress;
    updateMonStatus: (monId: number, beaten: boolean) => void;
}

export const MonsterListView = (props: IOwnProps) => {
  const [orderType, setOrderType] = useState('default');
  const [sortOrderAsc, setSortOrderAsc] = useState(true);
  
  const orderOptions: {[key:string]: keyof IMonsterState} = {
    default: 'id',
    alphabetically: 'Name',
    type: 'Type',
    level: 'LowestLevel',
    location: 'Area',
    available: 'Available',
    beaten: 'Beaten'
  }

  const getOrderTypeColumn = (order: string): keyof IMonsterState => {
    return orderOptions[order] || orderOptions.default
  }

  return <CollapsibleComponent header={`${props.monsterCategory} Monsters`}>
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
        <div className='row'>
          {props.monsterCategory === 'Unique' ?
            <b className='column-narrow order-title'>Beaten</b>
            : <b className='available-column column-unrestricted order-title-available'>
              Available
            </b>
          }
          <b className='column-very-narrow order-title-available'>DLC</b>
          <b className="column-medium order-title-available">Type</b>
          <b className="level-column column-narrow order-title-available">Level</b>
          <b className="column-medium order-title">Location</b>
          <b className="column-unrestricted order-title">Name</b>
        </div>
        <div className='table-outline'>
          {props.monsters.sort((monA, monB) => {
            const monAValue = monA[getOrderTypeColumn(orderType)]
            const monBValue = monB[getOrderTypeColumn(orderType)]
            return sortFunction(monAValue, monBValue, sortOrderAsc)
          }).map((mon:IMonsterState) =>
            <div className="row text-list-entry" key={mon.id}>
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
                  mon.Area.split(' -> ')[0].replace('(', '') : '????'}
              </div>
              {!props.storyProgress.OnlyShowAvailable || mon.Available ?
                <Link
                  className="text-list-link"
                  to={`/monster/${mon.id}`}
                >
                  {mon.Name}
                </Link>
                : <div className='text-list-link'>????</div>
              }
            </div>
          )}
        </div>

      </>}
  </CollapsibleComponent>
}