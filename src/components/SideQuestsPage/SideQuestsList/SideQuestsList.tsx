import CollapsibleComponent from 'components/CommonComponents/Containers/CollapsibleComponent';
import { HoverContainer } from 'components/CommonComponents/Containers/HoverContainer';
import { OptionsCheckbox } from 'components/CommonComponents/FormComponents/OptionsCheckbox';
import { LinkSelected } from 'components/CommonComponents/LinkSelected';
import OrderBy from 'components/CommonComponents/OrderBy';
import { RequirementList } from 'components/CommonComponents/RequirementList';
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
        <div className='data-table table-header'>
          <div className="row">
            <b className="column-narrow order-title">Status</b>
            <b className="column-unrestricted order-title-available">Available</b>
            <b className="column-wide order-title">Type</b>
            <b className="column-wide order-title">Location</b>
            <b className="column-unrestricted order-title">Title</b>
          </div>
          <div className='table-outline quest-table'>
            {props.quests.sort((h2hA, h2hB) => {
              const h2hAValue = h2hA[getOrderTypeColumn(orderType)]
              const h2hBValue = h2hB[getOrderTypeColumn(orderType)]
              return sortFunction(h2hAValue, h2hBValue, sortOrderAsc)
            }).map((quest:IQuestAvailability) =>
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
                    separateMajorArea(quest.Area) : '????'}
                </div>
                {
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
                    </LinkSelected>
                }
                {quest.PreReqs &&
                  <HoverContainer>
                    <RequirementList requirements={quest.PreReqs} />
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