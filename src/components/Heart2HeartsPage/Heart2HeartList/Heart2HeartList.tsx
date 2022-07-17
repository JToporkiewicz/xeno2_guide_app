import { sortFunction } from 'helpers';
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom';
import { IHeart2Heart } from '../../../interfaces'
import CollapsibleComponent from '../../CommonComponents/Containers/CollapsibleComponent'
import OrderBy from '../../CommonComponents/OrderBy';

interface IDispatchProps {
  updateHeart2Hearts:(payload:IHeart2Heart) => void;
  saveHeart2Hearts:(payload:IHeart2Heart[]) => void;
}

interface IProps {
  heart2Hearts:IHeart2Heart[]
}

interface IOwnProps {
  parentPage: string;
  characterName?: string;
}

export const Heart2HeartListView = (props:IProps & IOwnProps & IDispatchProps) => {
  const [orderType, setOrderType] = useState('default');
  const [sortOrderAsc, setSortOrderAsc] = useState(true);

  const toUpdate = useRef([] as IHeart2Heart[]);

  useEffect(() => {
    return () => {
      props.saveHeart2Hearts(toUpdate.current)
    } 
  }, [])

  const orderOptions: {[key:string]: keyof IHeart2Heart} = {
    default: 'id',
    alphabetically: 'Title',
    location: 'Location',
    available: 'Available',
    viewed: 'Viewed'
  }

  const getOrderTypeColumn = (order: string): keyof IHeart2Heart => {
    return orderOptions[order] || orderOptions.default
  }

  return (
    <CollapsibleComponent header={'Heart 2 Hearts'}>
      {props.heart2Hearts.length === 0 ?
        <>No heart 2 hearts found.</>
        : <>
          <OrderBy
            orderOptions={Object.keys(orderOptions)}
            chosenOrder={orderType}
            changeOrder={setOrderType}
            sortOrderAsc={sortOrderAsc}
            changeSortOrderAsc={setSortOrderAsc.bind(this, !sortOrderAsc)}  
          />
          {props.characterName && `Heart 2 hearts in which ${props.characterName} participates:`}
          <div className="row">
            <b className="col-sm-1 order-title">Viewed</b>
            <b className="col-sm-2 order-title">Status</b>
            <b className="order-title">Title</b>
          </div>
          {props.heart2Hearts.filter((h2h:IHeart2Heart) => {
            if (!props.characterName) return true
            return h2h.Who.includes(props.characterName) ||
              h2h.Who.includes('\'s Driver') && props.parentPage === 'driver'
          }).sort((h2hA, h2hB) => {
            const h2hAValue = h2hA[getOrderTypeColumn(orderType)]
            const h2hBValue = h2hB[getOrderTypeColumn(orderType)]
            return sortFunction(h2hAValue, h2hBValue, sortOrderAsc)
          }).map((h2h:IHeart2Heart) => 
            <div className="row text-list-entry" key={h2h.id}>
              <div
                className="col-sm-1 text-list-status"
              >
                <input
                  type='checkbox'
                  checked={h2h.Viewed}
                  onChange={() => h2h.Available && 
                    (
                      props.updateHeart2Hearts({
                        ...h2h,
                        Viewed: !h2h.Viewed
                      }
                      ),
                      toUpdate.current = toUpdate.current.concat([{
                        ...h2h,
                        Viewed: !h2h.Viewed
                      }])
                    )

                    
                  }
                  disabled={!h2h.Available}
                  className={h2h.Available ? 'hoverPointer' : 'blockClick'}
                />
              </div>
              <div
                className="col-sm-2 text-list-status"
              >
                {h2h.Available ? 'Available' : 'Unavailable'}
              </div>
              <Link className="text-list-link" to={`/heart2Heart/${h2h.id}`}>{h2h.Title}</Link>
            </div>
          )}
        </>
      }
    </CollapsibleComponent>
  )
};
