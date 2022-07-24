import CollapsibleComponent from 'components/CommonComponents/Containers/CollapsibleComponent'
import HeaderContainer from 'components/CommonComponents/Containers/HeaderContainer'
import { OptionsCheckbox } from 'components/CommonComponents/FormComponents/OptionsCheckbox'
import OrderBy from 'components/CommonComponents/OrderBy'
import { sortFunction } from 'helpers'
import path from 'path'
import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { IQuestState } from 'reduxState/interfaces/reduxState'

interface IDispatchProps {
  updateQuestStatus: (payload:IQuestState) => void;
  saveQuestStatus: (payload:IQuestState) => void;
}

interface IProps {
  quests: IQuestState[]
}

export const SideQuestsPageView = (props:IProps & IDispatchProps) => {
  const [orderType, setOrderType] = useState('default');
  const [sortOrderAsc, setSortOrderAsc] = useState(true);

  const toUpdate = useRef([] as IQuestState[]);

  useEffect(() => {
    return () => {
      toUpdate.current.map((quest) =>
        props.saveQuestStatus(quest)
      )
    } 
  }, [])

  const orderOptions: {[key:string]: keyof IQuestState} = {
    default: 'id',
    alphabetically: 'Name',
    type: 'Type',
    available: 'Available',
    status: 'Status'
  }

  const getOrderTypeColumn = (order: string): keyof IQuestState => {
    return orderOptions[order] || orderOptions.default
  }

  const updateQuestCompleted = (questId: number, status:string | boolean) => {
    const foundQuest = props.quests.find((q) => q.id === questId)
    if(foundQuest && typeof status === 'string') {
      toUpdate.current = toUpdate.current
        .filter((q) => q.id !== questId)
        .concat({
          ...foundQuest,
          Status: status
        })

      props.updateQuestStatus({
        ...foundQuest,
        Status: status
      })
    }
  }

  return <>
    <HeaderContainer title="Side Quests"/>
    <CollapsibleComponent header="Side Quests">
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
          <div className="row">
            <b className="col-sm-1 order-title">Status</b>
            <b className="order-title-available">Available</b>
            <b className="col-sm-3 order-title">Type</b>
            <b className="order-title">Title</b>
          </div>
          {props.quests.sort((h2hA, h2hB) => {
            const questAValue = h2hA[getOrderTypeColumn(orderType)]
            const questBValue = h2hB[getOrderTypeColumn(orderType)]
            return sortFunction(questAValue, questBValue, sortOrderAsc)
          }).map((quest:IQuestState) => 
            <div className="row text-list-entry" key={quest.id}>
              <div
                className="col-sm-1 text-list-status"
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
                  onClick={updateQuestCompleted.bind(this, quest.id)}
                  size='small'
                />
              </div>
              <div
                className="col-sm-1 text-list-status"
              >
                <img 
                  src={path.resolve(`images/helper/${quest.Available ?
                    'GreenCheckmark' : 'RedX'}.svg`)}
                  alt={quest.Name}
                  className="availability-small-image"
                />
              </div>
              <div
                className="col-sm-3 text-list-status"
              >
                {quest.Type}
              </div>
              <Link
                className="text-list-link"
                to={`/sideQuest/${quest.id}`}
              >
                {quest.Name}
              </Link>
            </div>
          )}
        </>
      }
    </CollapsibleComponent>
  </>
}