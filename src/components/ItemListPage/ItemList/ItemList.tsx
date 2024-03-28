import CollapsibleComponent from 'components/CommonComponents/Containers/CollapsibleComponent'
import { IItem, IStoryProgress } from 'interfaces'
import { useEffect, useState } from 'react'
import { ItemDetails } from './ItemDetails'
import OrderBy from 'components/CommonComponents/OrderBy'
import { separateMajorArea, separateMinorArea, sortFunction } from 'helpers'
import path from 'path'
import { IMajorLocations, ISelectedState } from 'reduxState/interfaces/reduxState'
import Table from 'components/CommonComponents/Table'

interface IOwnProps {
  items: IItem[],
  title: string,
  selected?: ISelectedState
}

interface IProps {
  locations: IMajorLocations[];
  storyProgress: IStoryProgress;
}

export const ItemListView = (props: IOwnProps & IProps) => {
  const [focused, setFocused] = useState(0)
  const [orderType, setOrderType] = useState('default');
  const [sortOrderAsc, setSortOrderAsc] = useState(true);

  const findItemAvailability = (item: IItem) => {
    const foundLoc = props.locations.find((loc) =>
      loc.Name === separateMinorArea(item.Area)
      || loc.Name === separateMajorArea(item.Area))
    return props.storyProgress.OnlyShowAvailable && foundLoc ?
      foundLoc.StoryProgress <= props.storyProgress.Chapter
      : true
  }

  const selectItem = (index: number) => {
    setFocused(index)
    const header = document.getElementById(props.title)?.getBoundingClientRect();
    const body = document.body.getBoundingClientRect();
    window.scroll({
      top: header && body ? header.top - body.top : 0,
      behavior: 'smooth'
    })
  }

  useEffect(() => {
    if (props.selected && props.selected.area === 'itemType') {
      setOrderType('type')
    }
    if (props.selected && props.selected.area === 'item') {
      const foundItem = props.items.find((i) => i.id === props.selected?.id)
      if (foundItem && findItemAvailability(foundItem)) {
        selectItem(props.selected.id)
      }
    }
  }, [props.selected])
  
  const orderOptions: {[key:string]: keyof IItem} = {
    default: 'id',
    alphabetically: 'Name',
    type: 'ItemTypeID',
    location: 'Area'
  }

  const getOrderTypeColumn = (order: string): keyof IItem => {
    return orderOptions[order] || orderOptions.default
  }

  return <CollapsibleComponent header={props.title}>
    {focused !== 0 ?
      <ItemDetails item={props.items.find((i) => i.id === focused)} setFocus={setFocused} />
      : <div />
    }
    {props.items.length === 0 ?
      <>No items found.</>
      : <>
        <OrderBy
          orderOptions={Object.keys(orderOptions)}
          chosenOrder={orderType}
          changeOrder={setOrderType}
          sortOrderAsc={sortOrderAsc}
          changeSortOrderAsc={setSortOrderAsc.bind(this, !sortOrderAsc)}
        />
        <Table
          columns={['Name', 'Type', 'Location', 'Area']}
          rows={props.items.sort((itemA, itemB) => {
            const itemAValue = itemA[getOrderTypeColumn(orderType)]
            const itemBValue = itemB[getOrderTypeColumn(orderType)]
            return sortFunction(itemAValue, itemBValue, sortOrderAsc)
          }).map((item:IItem) => {
            const itemAvailable = findItemAvailability(item)
            return {
              id: item.id,
              'Name':
                <div className="column-wide text-list-status">
                  {itemAvailable ? item.Name : <i>Item {item.id}</i>}
                </div>,
              'Type':
                <div className="column-narrow text-list-status">
                  <img
                    src={path.resolve(`images/itemTypes/${item.ItemType.replaceAll(' ', '')}.webp`)}
                    alt={item.Name}
                    className="availability-small-image"
                  />
                </div>,
              'Location':
                <div className="column-wide text-list-status">
                  {itemAvailable ? item.Location : '????'}
                </div>,
              'Area':
                <div className="column-wide">
                  {itemAvailable ? separateMajorArea(item.Area) : '????'}
                </div>,
              available: itemAvailable
            }})}
          headerStyles={{
            'Name': 'column-wide order-title',
            'Type': 'column-unrestricted order-title-available',
            'Location': 'column-wide order-title',
            'Area': 'column-wide order-title'
          }}
          rowClickable
          onClick={selectItem}
        />
      </>
    }
  </CollapsibleComponent>
}