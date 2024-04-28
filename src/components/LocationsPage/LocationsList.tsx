import CollapsibleComponent from 'components/CommonComponents/Containers/CollapsibleComponent'
import { OptionsCheckbox } from 'components/CommonComponents/FormComponents/OptionsCheckbox'
import OrderBy from 'components/CommonComponents/OrderBy'
import Table from 'components/CommonComponents/Table'
import { sortFunction } from 'helpers'
import { IStoryProgress } from 'interfaces'
import { useState } from 'react'
import { IInnerMajorArea, ILocationState } from 'reduxState/interfaces/reduxState'

interface ILocationTableRow extends ILocationState {
  InnerArea: string,
  InnerAreaId: number,
}

interface IOwnProps {
  title: string,
  innerAreas: IInnerMajorArea[],
  storyProgress: IStoryProgress,
  updateLocation: (
    innerAreaId: number,
    locId: number,
    mapped: boolean
  ) => void
}

export const LocationsList = (props: IOwnProps) => {
  const [orderType, setOrderType] = useState('default');
  const [sortOrderAsc, setSortOrderAsc] = useState(true);

  const orderOptions: {[key:string]: keyof ILocationTableRow} = {
    default: 'id',
    alphabetically: 'Location',
    type: 'Type',
    chapter: 'StoryProgress',
    'inner area': 'InnerAreaId',
    mapped: 'Mapped'
  }

  const getOrderTypeColumn = (order: string): keyof ILocationTableRow => {
    return orderOptions[order] || orderOptions.default
  }

  return (
    <CollapsibleComponent header={props.title}>
      <OrderBy
        orderOptions={Object.keys(orderOptions)}
        chosenOrder={orderType}
        changeOrder={setOrderType}
        sortOrderAsc={sortOrderAsc}
        changeSortOrderAsc={setSortOrderAsc.bind(this, !sortOrderAsc)}
      />
      <Table
        columns={['Mapped', 'Chapter', 'Location', 'Location Type', 'Inner Area']}
        headerStyles={{
          'Mapped': 'column-narrow',
          'Chapter': 'column-narrow',
          'Location': 'column-medium',
          'Location Type': 'column-medium',
          'Inner Area': 'column-unrestricted',
        }}
        rows={props.innerAreas.reduce((locations, ia) => {
          return locations.concat(ia.Locations.map((loc: ILocationState) => ({
            ...loc,
            InnerArea: ia.Name,
            InnerAreaId: ia.id
          })))
        }, [] as ILocationTableRow[])
          .sort((locA, locB) => {
            const locAValue = locA[getOrderTypeColumn(orderType)]
            const locBValue = locB[getOrderTypeColumn(orderType)]
            return sortFunction(locAValue, locBValue, sortOrderAsc)
          })
          .map((loc) => ({
            id: loc.id,
            'Mapped':
              <div className='column-narrow text-list-status'>
                <OptionsCheckbox
                  hideAvailable={true}
                  available={loc.StoryProgress <= props.storyProgress.Chapter}
                  unlocked={loc.Mapped}
                  onClick={(mapped) => {
                    if (typeof mapped === 'boolean') {
                      props.updateLocation(loc.InnerAreaId, loc.id, mapped)
                    }
                  }}
                  size='small'
                />
              </div>,
            'Chapter':
              <div className='column-narrow available-column text-list-status'>
                {loc.StoryProgress}
              </div>,
            'Location':
              <div className="column-medium text-list-status">
                {loc.StoryProgress <= props.storyProgress.Chapter
                  || !props.storyProgress.OnlyShowAvailable ? loc.Location : '????'}
              </div>,
            'Location Type':
              <div className="column-medium text-list-status">
                {loc.Type}
              </div>,
            'Inner Area':
              <div className="column-wide">
                {loc.InnerArea}
              </div>,
          }))}
      />
    </CollapsibleComponent>
  )
}