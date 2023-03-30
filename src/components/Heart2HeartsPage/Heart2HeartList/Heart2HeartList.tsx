import { sortFunction } from 'helpers';
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom';
import CollapsibleComponent from 'components/CommonComponents/Containers/CollapsibleComponent'
import OrderBy from 'components/CommonComponents/OrderBy';
import { IUpdateH2HStatus } from 'reduxState/interfaces/heart2Hearts';
import { IUpdateUnlocked } from 'reduxState/interfaces/reduxState';
import path from 'path';
import { OptionsCheckbox } from 'components/CommonComponents/FormComponents/OptionsCheckbox';
import { IHeart2Heart, IStoryProgress } from 'interfaces';
import { HoverContainer } from 'components/CommonComponents/Containers/HoverContainer';
import { RequirementList } from 'components/CommonComponents/RequirementList';

interface IDispatchProps {
  updateHeart2HeartStatus:(payload:IUpdateH2HStatus) => void;
  saveHeart2Hearts:(payload:IUpdateUnlocked) => void;
}

interface IOwnProps {
  parentPage: string;
  heart2Hearts:IHeart2Heart[];
  location?:string;
  characterName?: string;
}

interface IProps {
  storyProgress: IStoryProgress;
}

export const Heart2HeartListView = (props:IProps & IOwnProps & IDispatchProps) => {
  const [orderType, setOrderType] = useState('default');
  const [sortOrderAsc, setSortOrderAsc] = useState(true);

  const toUpdate = useRef([] as IHeart2Heart[]);

  const orderOptions: {[key:string]: keyof IHeart2Heart} = 
    props.location ? {
      default: 'id',
      alphabetically: 'Title',
      available: 'Available',
      viewed: 'Viewed'
    } : {
      default: 'id',
      alphabetically: 'Title',
      location: 'Area',
      available: 'Available',
      viewed: 'Viewed'
    }

  useEffect(() => {
    return () => {
      props.saveHeart2Hearts({
        unlocked: toUpdate.current.filter((h) => h.Viewed).map((h) => h.id),
        locked: toUpdate.current.filter((h) => !h.Viewed).map((h) => h.id)
      })
    } 
  }, [])


  const getOrderTypeColumn = (order: string): keyof IHeart2Heart => {
    return orderOptions[order] || orderOptions.default
  }

  return (
    <CollapsibleComponent header={props.location || 'Heart 2 Hearts'}>
      {props.heart2Hearts.length === 0 ?
        <>No available heart 2 hearts found.</>
        : <>
          <OrderBy
            orderOptions={Object.keys(orderOptions)}
            chosenOrder={orderType}
            changeOrder={setOrderType}
            sortOrderAsc={sortOrderAsc}
            changeSortOrderAsc={setSortOrderAsc.bind(this, !sortOrderAsc)}  
          />
          {props.characterName && `Heart 2 hearts in which ${props.characterName} participates:`}
          <div className='data-table'>
            <div className="row">
              <b className="column-narrow order-title">Viewed</b>
              <b className="column-unrestricted order-title-available">Available</b>
              <b className="column-wide order-title">Location</b>
              <b className="column-wide order-title">Title</b>
            </div>
            <div className='table-outline'>
              {props.heart2Hearts.sort((h2hA, h2hB) => {
                const h2hAValue = h2hA[getOrderTypeColumn(orderType)]
                const h2hBValue = h2hB[getOrderTypeColumn(orderType)]
                return sortFunction(h2hAValue, h2hBValue, sortOrderAsc)
              }).map((h2h:IHeart2Heart) => 
                <div className="row text-list-entry" key={h2h.id}>
                  <div
                    className="column-narrow text-list-status"
                  >
                    <OptionsCheckbox
                      hideAvailable={true}
                      available={h2h.Available}
                      unlocked={h2h.Viewed}
                      onClick={(viewed) => {
                        if (typeof viewed === 'boolean') {
                          props.updateHeart2HeartStatus({
                            ...h2h,
                            Viewed: viewed
                          }
                          ),
                          toUpdate.current = toUpdate.current
                            .filter((updateH2H) => updateH2H.id !== h2h.id)
                            .concat([{
                              ...h2h,
                              Viewed: viewed
                            }])
                        }}}
                      size='small'
                    />
                  </div>
                  <div
                    className="column-narrow text-list-status"
                  >
                    <img 
                      src={path.resolve(`images/helper/${h2h.Available ?
                        'GreenCheckmark' : 'RedX'}.svg`)}
                      alt={h2h.Title}
                      className="availability-small-image"
                    />
                  </div>
                  <div
                    className="column-wide text-list-status"
                  >
                    {!props.storyProgress.OnlyShowAvailable || h2h.Available ?
                      props.location === undefined ?
                        h2h.Area.split(' -> ')[0].replace('(', '') : 
                        h2h.Area.split(' -> ')[1].replace(')', '') 
                      : '????'}
                  </div>
                  {
                    !props.storyProgress.OnlyShowAvailable || h2h.Available ? 
                      <Link
                        className="text-list-link"
                        to={`/heart2Heart/${h2h.id}`}
                      >
                        {h2h.Title}
                      </Link>
                      : <div className='text-list-link'>????</div>
                  }
                  {h2h.PreReqs &&
                    <HoverContainer>
                      <RequirementList
                        requirements={h2h.PreReqs}
                      />
                    </HoverContainer>
                  }
                </div>
              )}
            </div>
          </div>
        </>
      }
    </CollapsibleComponent>
  )
};
