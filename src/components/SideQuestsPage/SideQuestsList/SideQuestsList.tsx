import CollapsibleComponent from 'components/CommonComponents/Containers/CollapsibleComponent';
import { OptionsCheckbox } from 'components/CommonComponents/FormComponents/OptionsCheckbox';
import OrderBy from 'components/CommonComponents/OrderBy';
import { sortFunction } from 'helpers';
import { IStoryProgress } from 'interfaces';
import path from 'path';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { IQuestState } from 'reduxState/interfaces/reduxState';

interface IOwnProps {
  questType: string,
  quests: IQuestState[],
  storyProgress: IStoryProgress,
  updateQuestStatus: (questId: number, status: string | boolean) => void
}

export const SideQuestsList = (props: IOwnProps) => {
  const [orderType, setOrderType] = useState('default');
  const [sortOrderAsc, setSortOrderAsc] = useState(true);

  const orderOptions: {[key:string]: keyof IQuestState} = {
    default: 'id',
    alphabetically: 'Name',
    type: 'Type',
    available: 'Available',
    status: 'Status',
    location: 'Area'
  }

  const getOrderTypeColumn = (order: string): keyof IQuestState => {
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
        <div className='data-table'>
          <div className="row">
            <b className="column-narrow order-title">Status</b>
            <b className="column-unrestricted order-title-available">Available</b>
            <b className="column-wide order-title">Type</b>
            <b className="column-wide order-title">Location</b>
            <b className="column-unrestricted order-title">Title</b>
          </div>
          <div className='table-outline'>
            {props.quests.sort((h2hA, h2hB) => {
              const h2hAValue = h2hA[getOrderTypeColumn(orderType)]
              const h2hBValue = h2hB[getOrderTypeColumn(orderType)]
              return sortFunction(h2hAValue, h2hBValue, sortOrderAsc)
            }).map((quest:IQuestState) =>
              <div className="row text-list-entry" key={quest.id}>
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
                </div>
                <div
                  className="column-narrow text-list-status"
                >
                  <img
                    src={path.resolve(`images/helper/${quest.Available ?
                      'GreenCheckmark' : 'RedX'}.svg`)}
                    alt={quest.Name}
                    className="availability-small-image"
                  />
                </div>
                <div
                  className="column-wide text-list-status"
                >
                  {quest.Type}
                </div>
                <div
                  className="column-wide text-list-status"
                >
                  {!props.storyProgress.OnlyShowAvailable || quest.Available ?
                    quest.Area.split(' -> ')[0].replace('(', '') : '????'}
                </div>
                {
                  props.storyProgress.OnlyShowAvailable && !quest.Available ?
                    <div className='text-list-link'>????</div>
                    :
                    <Link
                      className="text-list-link"
                      to={`/sideQuest/${quest.id}`}
                    >
                      {quest.Name}
                    </Link>
                }
              </div>
            )}
          </div>
        </div>
      </>
    }
  </CollapsibleComponent>
}