import { separateMajorArea, separateMinorArea, sortFunction } from 'helpers';
import { useEffect, useRef, useState } from 'react'
import CollapsibleComponent from 'components/CommonComponents/Containers/CollapsibleComponent'
import OrderBy from 'components/CommonComponents/OrderBy';
import { IUpdateH2HStatus, defaultHeart2HeartState } from 'reduxState/interfaces/heart2Hearts';
import { ISelectedState, IUpdateUnlocked } from 'reduxState/interfaces/reduxState';
import path from 'path';
import { OptionsCheckbox } from 'components/CommonComponents/FormComponents/OptionsCheckbox';
import { IStoryProgress } from 'interfaces';
import { HoverContainer } from 'components/CommonComponents/Containers/HoverContainer';
import { RequirementList } from 'components/CommonComponents/RequirementList';
import { IHeart2HeartAvailability } from 'reduxState/interfaces/availabilityState';
import { Heart2HeartDetails } from '../Heart2HeartDetails/Heart2HeartDetails';

interface IDispatchProps {
  updateHeart2HeartStatus:(payload:IUpdateH2HStatus) => void;
  saveHeart2Hearts:(payload:IUpdateUnlocked) => void;
}

interface IOwnProps {
  parentPage: string;
  heart2Hearts:IHeart2HeartAvailability[];
  location?:string;
  characterName?: string;
}

interface IProps {
  storyProgress: IStoryProgress;
  selected?: ISelectedState;
}

export const Heart2HeartListView = (props:IProps & IOwnProps & IDispatchProps) => {
  const [orderType, setOrderType] = useState('default');
  const [sortOrderAsc, setSortOrderAsc] = useState(true);
  const [focused, setFocused] = useState(0);

  const toUpdate = useRef([] as IHeart2HeartAvailability[]);

  const orderOptions: {[key:string]: keyof IHeart2HeartAvailability} = 
    {
      default: 'id',
      alphabetically: 'Title',
      location: 'Area',
      available: 'Available',
      viewed: 'Viewed'
    }

  const selectH2H = (index: number) => {
    setFocused(index)
    const header = document
      .getElementById(props.location || 'Heart 2 Hearts')?.getBoundingClientRect();
    const body = document.body.getBoundingClientRect();
    window.scroll({
      top: header && body ? header.top - body.top : 0,
      behavior: 'smooth'
    })
  }

  useEffect(() => {
    if (props.selected && props.selected.area === 'heart2Heart') {
      const foundH2H = props.heart2Hearts.find((i) => i.id === props.selected?.id)
      if (foundH2H && foundH2H.Available) {
        selectH2H(props.selected.id)
      }
    }
  }, [props.selected])


  useEffect(() => {
    return () => {
      if (toUpdate.current.length > 0) {
        props.saveHeart2Hearts({
          unlocked: toUpdate.current.filter((h) => h.Viewed).map((h) => h.id),
          locked: toUpdate.current.filter((h) => !h.Viewed).map((h) => h.id)
        })  
      }
    } 
  }, [])


  const getOrderTypeColumn = (order: string): keyof IHeart2HeartAvailability => {
    return orderOptions[order] || orderOptions.default
  }

  const updateH2H = (h2h: IHeart2HeartAvailability, viewed: string | boolean) => {
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
    }}

  return (
    <CollapsibleComponent header={props.location || 'Heart 2 Hearts'}>
      {focused !== 0 ?
        <Heart2HeartDetails
          heart2Heart={props.heart2Hearts.find((h) => h.id === focused)}
          setFocus={selectH2H}
          updateH2h={updateH2H.bind(
            this,
            props.heart2Hearts.find((h) => h.id === focused) || defaultHeart2HeartState
          )}
        />
        : <div />
      }
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
            <div className="row table-header">
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
              }).map((h2h:IHeart2HeartAvailability) => 
                <div
                  className={`row text-list-entry ${
                    h2h.Available ? 'hoverPointer' : ''} ${
                    h2h.id === focused ? 'selected-row' : ''}`}
                  key={h2h.id}
                >
                  <div
                    className="column-narrow text-list-status"
                  >
                    <OptionsCheckbox
                      hideAvailable={true}
                      available={h2h.Available}
                      unlocked={h2h.Viewed}
                      onClick={(viewed) => updateH2H(h2h, viewed)}
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
                        separateMajorArea(h2h.Area) : 
                        separateMinorArea(h2h.Area) 
                      : '????'}
                  </div>
                  {
                    !props.storyProgress.OnlyShowAvailable || h2h.Available ? 
                      <div
                        className="text-list-link"
                        onClick={() => selectH2H(h2h.id)}
                      >
                        {h2h.Title}
                      </div>
                      : <div className='text-list-link'><i>Heart 2 Heart {h2h?.id}</i></div>
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
