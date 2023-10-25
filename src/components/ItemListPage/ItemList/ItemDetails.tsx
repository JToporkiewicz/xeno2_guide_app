import { IItem } from 'interfaces';
import path from 'path';

interface IOwnProps {
  item: IItem | undefined,
  setFocus: (id: number) => void
}

export const ItemDetails = (props: IOwnProps) => {
  if (props.item === undefined) {
    return <div />
  }

  return (
    <div>
      <div>
        <div className='item-types-icon'>
          <img
            src={path.resolve(`images/itemTypes/${props.item.ItemType.replaceAll(' ', '')}.webp`)}
            alt={props.item.Name}
            className="item-details-image"
          />
          <div className='item-types'>{props.item.ItemType}</div>
        </div>
        <img
          src={path.resolve('images/helper/Close.svg')}
          alt="close"
          className="close-details"
          onClick={() => props.setFocus(0)}
        />
        <h3><b>{props.item.Name}</b></h3>
        <div className='item-details'>
          <div><b>Location: </b>{props.item.Location}</div>
          <div><b>Area: </b>{props.item.Area}</div>
          <hr className='item-details-line'/>
          <div><b>Source: </b>{props.item.Source}</div>
          <div><b>Price: </b>{props.item.Price}</div>
          {props.item.FavoriteOf &&
            <>
              <hr className='item-details-line'/>
              <div><b>Favorite of: </b>{props.item.FavoriteOf}</div>
            </>}
          {(props.item.Effects || props.item.Trust || props.item.Duration) &&
            <>
              <hr className='item-details-line'/>
              {props.item.Trust &&
                <div><b>Trust: </b>{props.item.Trust} points</div>}
              {props.item.Duration &&
                <div><b>Duration: </b>{props.item.Duration}</div>}
              {props.item.Effects &&
              <>
                <div><b>Effects:</b></div>
                <ul>
                  {props.item.Effects.map((e, id) => <li key={'effect' + id}>{e}</li>)}
                </ul>
              </>}
            </>}
        </div>
      </div>
      <hr />
    </div>
  )
}