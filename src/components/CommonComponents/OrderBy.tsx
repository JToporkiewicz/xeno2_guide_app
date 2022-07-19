import { useState } from 'react';
import path from 'path';

interface IProps {
  orderOptions: string[],
  chosenOrder: string,
  changeOrder: (order:string) => void;
  sortOrderAsc: boolean,
  changeSortOrderAsc: () => void;
}

const OrderBy = (props:IProps) => {
  const [isOpen, setOpen] = useState(false);
  return(
    <div className="row">
      <div className="order-title">Order by: </div>
      <div onMouseLeave={() => setOpen(false)}>
        <div
          className="order-by"
          onClick={() => setOpen(!isOpen)}
        >
          {props.chosenOrder}
          <img
            src={path.resolve(`images/helper/${isOpen ? 'Up': 'Down'}.svg`)}
            alt={isOpen ? 'collapse' : 'expand'}
            className="order-by-expand"
          />
        </div>
        {isOpen &&
        <div className="order-by-list">
          {props.orderOptions.map((orderType) => 
            <div
              className="order-by-option"
              onClick={() => props.changeOrder(orderType)}
              key={orderType}
            >
              {orderType}
            </div>
          )}
        </div>
        }
      </div>
      <div className="order-title">Sort order: </div>
      <input
        name='ascending'
        type='checkbox'
        checked={props.sortOrderAsc}
        onChange={() => props.changeSortOrderAsc()}
        className='sort-order'
      />
      <label className='sort-order-label' htmlFor='ascending'>Ascending</label>
      <input
        id='descending'
        type='checkbox'
        checked={!props.sortOrderAsc}
        onChange={() => props.changeSortOrderAsc()}
        className='sort-order'
      />
      <label className='sort-order-label' htmlFor='sort-order'>Descending</label>
    </div>
  )
}

export default OrderBy;