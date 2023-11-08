import CollapsibleComponent from 'components/CommonComponents/Containers/CollapsibleComponent'
import { IItem, IStoryProgress } from 'interfaces'
import { useEffect, useState } from 'react'
import { ItemDetails } from './ItemDetails'
import OrderBy from 'components/CommonComponents/OrderBy'
import { separateMajorArea, separateMinorArea, sortFunction } from 'helpers'
import path from 'path'
import { IMajorLocations, ISelectedState } from 'reduxState/interfaces/reduxState'

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

  useEffect(() => {
    if (props.selected && props.selected.area === 'itemType') {
      setOrderType('type')
    }
    if (props.selected && props.selected.area === 'item') {
      const foundItem = props.items.find((i) => i.id === props.selected?.id)
      if (foundItem && findItemAvailability(foundItem)) {
        setFocused(props.selected.id)       
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
        <div className='data-table'>
          <div className='row table-header'>
            <b className='column-wide order-title'>Name</b>
            <b className="column-unrestricted order-title-available">Type</b>
            <b className='column-wide order-title'>Location</b>
            <b className='column-wide order-title'>Area</b>
          </div>
        </div>
        <div className='table-outline'>
          {props.items.sort((itemA, itemB) => {
            const itemAValue = itemA[getOrderTypeColumn(orderType)]
            const itemBValue = itemB[getOrderTypeColumn(orderType)]
            return sortFunction(itemAValue, itemBValue, sortOrderAsc)
          }).map((item:IItem) => {
            const itemAvailable = findItemAvailability(item)
            return <div
            // ------------------------ check availability ------------------------
              className={`row text-list-entry ${itemAvailable ? 'hoverPointer' : ''}`}
              key={item.id}
              onClick={() => itemAvailable ? setFocused(item.id) : null}
            >
              <div
                className="column-wide text-list-status"
              >
                {itemAvailable ? item.Name : <i>Item {item.id}</i>}
              </div>
              <div
                className="column-narrow text-list-status"
              >
                <img
                  src={path.resolve(`images/itemTypes/${item.ItemType.replaceAll(' ', '')}.webp`)}
                  alt={item.Name}
                  className="availability-small-image"
                />
              </div>
              <div
                className="column-wide text-list-status"
              >
                {itemAvailable ? item.Location : '????'}
              </div>
              <div
                className="column-wide"
              >
                {itemAvailable ? separateMajorArea(item.Area) : '????'}
              </div>
            </div>
          }
            
          )}
        </div>
      </>
    }
  </CollapsibleComponent>
}