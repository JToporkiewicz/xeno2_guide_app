import { useContext, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom';
import client from '../../api-client';
import { IHeart2Heart } from '../../interfaces'
import { LoaderContext } from '../App';
import CollapsibleComponent from '../CommonComponents/Containers/CollapsibleComponent'
import OrderBy from '../CommonComponents/OrderBy';

const getHeart2Hearts = async (
  setHeart2Hearts:(arts:IHeart2Heart[]) => void
) => {
  try {
    const response = await client.resource('heart2Heart').find();
    setHeart2Hearts(response);
  }
  catch(err) {
    console.log(`Error: ${err}`);
  }
};

interface IProps {
  driverId: number;
  driverName: string;
}

const DriverHeart2HeartList = (props:IProps) => {
  const [heart2Hearts, setHeart2Hearts] = useState([] as IHeart2Heart[]);
  const loaderContext = useContext(LoaderContext);
  const [orderType, setOrderType] = useState('default');

  const toUpdate = useRef([] as IHeart2Heart[]);

  useEffect(() => {
    if(props.driverId){
      loaderContext.setLoader(loaderContext.loaderState.concat(['Fetching Heart 2 Hearts']));
      getHeart2Hearts(setHeart2Hearts);
      loaderContext.setLoader(
        loaderContext.loaderState.filter((entry:string) => entry !== 'Fetching Heart 2 Hearts')
      )
    }
  }, [props.driverId]);

  useEffect(() => {
    return () => {
      loaderContext.setLoader(loaderContext.loaderState.concat(['Updating Heart 2 Hearts']));
      toUpdate.current.map(async (h2h:IHeart2Heart) => {
        await client.resource('heart2Heart').update(h2h.id, h2h)

      })
      loaderContext.setLoader(
        loaderContext.loaderState.filter((entry:string) => entry !== 'Updating Heart 2 Hearts')
      )
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
      {loaderContext.loaderState.includes('Fetching Heart 2 Hearts') || heart2Hearts.length === 0 ?
        <>No heart 2 hearts found.</>
        : <>
          <OrderBy
            orderOptions={Object.keys(orderOptions)}
            chosenOrder={orderType}
            changeOrder={setOrderType}
          />
          Heart 2 hearts in which {props.driverName} participates:
          <div className="row">
            <b className="col-sm-1 order-title">Viewed</b>
            <b className="col-sm-2 order-title">Status</b>
            <b className="order-title">Title</b>
          </div>
          {heart2Hearts.filter((h2h:IHeart2Heart) =>
            h2h.Who.includes(props.driverName) || h2h.Who.includes('\'s Driver')
          ).sort((h2hA, h2hB) => {
            const h2hAValue = h2hA[getOrderTypeColumn(orderType)]
            const h2hBValue = h2hB[getOrderTypeColumn(orderType)]
            if(h2hAValue !== undefined && h2hBValue !== undefined) {
              return h2hAValue < h2hBValue ? -1
                : h2hAValue > h2hBValue ? 1 : 0
            }
            return 0
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
                      setHeart2Hearts([
                        ...heart2Hearts.filter((h) => h.id !== h2h.id),
                        {
                          ...h2h,
                          Viewed: !h2h.Viewed
                        }
                      ]),
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

export default DriverHeart2HeartList;
