import { useState } from 'react';

interface IProps {
  orderOptions: string[],
  chosenOrder: string,
  changeOrder: (order:string) => void;
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
            src={`/images/helper/${isOpen ? 'Up': 'Down'}.svg`}
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
    </div>
  )
}

export default OrderBy;