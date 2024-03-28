import CollapsibleComponent from 'components/CommonComponents/Containers/CollapsibleComponent';
import { OptionsCheckbox } from 'components/CommonComponents/FormComponents/OptionsCheckbox';
import { LinkSelected } from 'components/CommonComponents/LinkSelected';
import OrderBy from 'components/CommonComponents/OrderBy';
import Table from 'components/CommonComponents/Table';
import { separateMajorArea, sortFunction } from 'helpers';
import { Routes } from 'helpers/routesConst';
import { IStoryProgress } from 'interfaces';
import path from 'path';
import { useState } from 'react';
import { IQuestAvailability } from 'reduxState/interfaces/availabilityState';

interface IOwnProps {
  questType: string,
  quests: IQuestAvailability[],
  storyProgress: IStoryProgress,
  updateQuestStatus: (questId: number, status: string | boolean) => void
}

export const SideQuestsList = (props: IOwnProps) => {
  const [orderType, setOrderType] = useState('default');
  const [sortOrderAsc, setSortOrderAsc] = useState(true);

  const orderOptions: {[key:string]: keyof IQuestAvailability} = {
    default: 'id',
    alphabetically: 'Name',
    type: 'Type',
    available: 'Available',
    status: 'Status',
    location: 'Area'
  }

  const getOrderTypeColumn = (order: string): keyof IQuestAvailability => {
    return orderOptions[order] || orderOptions.default
  }

  return <CollapsibleComponent header={props.questType}>
    {props.quests.length === 0 ?
      <>No heart 2 hearts found.</>
      : <>
        <OrderBy
          orderOptions={Object.keys(orderOptions)}
          chosenOrder={orderType}
          changeOrder={setOrderType}
          sortOrderAsc={sortOrderAsc}
          changeSortOrderAsc={setSortOrderAsc.bind(this, !sortOrderAsc)}
        />
        <Table
          columns={['Status', 'Available', 'Type', 'Location', 'Title']}
          headerStyles={{
            'Status': 'column-narrow',
            'Available': 'column-unrestricted order-title-available',
            'Type': 'column-wide order-title',
            'Location': 'column-wide order-title',
            'Title': 'column-unrestricted order-title'
          }}
          rows={props.quests.sort((h2hA, h2hB) => {
            const h2hAValue = h2hA[getOrderTypeColumn(orderType)]
            const h2hBValue = h2hB[getOrderTypeColumn(orderType)]
            return sortFunction(h2hAValue, h2hBValue, sortOrderAsc)
          }).map((quest:IQuestAvailability) => ({
            id: quest.id,
            'Status':
              <div
                className="column-narrow text-list-status"
              >
                <OptionsCheckbox
                  hideAvailable={true}
                  available={quest.Available}
                  states={[
                    {
                      text: 'NOT STARTED',
                      active: quest.Status === 'NOT STARTED'
                    },
                    {
                      text: 'STARTED',
                      imgName: 'Plus',
                      active: quest.Status === 'STARTED'
                    },
                    {
                      text: 'FINISHED',
                      imgName: 'Checkmark',
                      active: quest.Status === 'FINISHED'
                    }
                  ]}
                  onClick={props.updateQuestStatus.bind(this, quest.id)}
                  size='small'
                />
              </div>,
            'Available':
              <div className="column-narrow text-list-status">
                <img
                  src={path.resolve(`images/helper/${quest.Available ?
                    'GreenCheckmark' : 'RedX'}.svg`)}
                  alt={quest.Name}
                  className="availability-small-image"
                />
              </div>,
            'Type': <div className="column-wide text-list-status">{quest.Type}</div>,
            'Location':
              <div className="column-wide text-list-status">
                {!props.storyProgress.OnlyShowAvailable || quest.Available ?
                  separateMajorArea(quest.Area) : '????'}
              </div>,
            'Title':
              props.storyProgress.OnlyShowAvailable && !quest.Available ?
                <div className='text-list-link'><i>Quest {quest.id}</i></div>
                :
                <LinkSelected
                  className="text-list-link"
                  to={Routes.SIDE_QUEST + quest.id}
                  area='sideQuest'
                  id={quest.id}
                >
                  {quest.Name}
                </LinkSelected>,
            preReqs: quest.PreReqs,
            available: quest.Available
          }))}
        />
      </>
    }
  </CollapsibleComponent>
}