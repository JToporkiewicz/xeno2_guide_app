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
import Table from 'components/CommonComponents/Table';

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
        <Table
          columns={[
            props.monsterCategory === 'Unique' ? 'Beaten' : 'Available',
            'DLC?', 'Type', 'Level', 'Location', 'Name'
          ]}
          headerStyles={{
            'Beaten': 'column-narrow',
            'Available': 'column-unrestricted order-title-available',
            'DLC?': 'column-very-narrow order-title-available',
            'Type': 'column-medium order-title-available',
            'Level': 'level-column column-narrow order-title-available',
            'Location': 'column-medium order-title',
            'Name': 'column-unrestricted order-title'
          }}
          rows={props.monsters.sort((monA, monB) => {
            const monAValue = monA[getOrderTypeColumn(orderType)]
            const monBValue = monB[getOrderTypeColumn(orderType)]
            return sortFunction(monAValue, monBValue, sortOrderAsc)
          }).map((mon:IMonsterAvailability) => ({
            id: mon.id,
            'Beaten':
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
              </div>,
            'Available':
              <div className='column-narrow available-column text-list-status'>
                <img
                  src={path.resolve(`images/helper/${mon.Available ?
                    'GreenCheckmark' : 'RedX'}.svg`)}
                  alt={mon.Name}
                  className="availability-small-image"
                />
              </div>,
            'DLC?':
              <div className='column-very-narrow text-list-status'>
                <img
                  src={path.resolve(`images/helper/${mon.DLCRequired ?
                    'GreenCheckmark' : 'RedX'}.svg`)}
                  alt={mon.Name}
                  className="availability-small-image"
                />
              </div>,
            'Type': <div className="column-medium text-list-status">{mon.Type}</div>,
            'Level':
              <div className='level-column column-narrow text-list-status'>
                {mon.LowestLevel}{mon.HighestLevel ? ` - ${mon.HighestLevel}` : ''}
              </div>,
            'Location':
              <div className="column-medium text-list-status">
                {!props.storyProgress.OnlyShowAvailable || mon.Available ?
                  separateMajorArea(mon.Area) : '????'}
              </div>,
            'Name': !props.storyProgress.OnlyShowAvailable || mon.Available ?
              <div className="text-list-link hoverPointer" onClick={() => selectMonster(mon.id)}>
                {mon.Name}
              </div>
              : <div className='text-list-link'><i>Monster {mon.id}</i></div>,
            available: mon.Available,
            focused: focus === mon.id
          }))}
        />
      </>}
  </CollapsibleComponent>
}