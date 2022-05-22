import { Link } from 'react-router-dom'
import { IHeart2Heart, IItem, IItemType } from '../../../interfaces'
import { IBladeState, IQuestState } from '../../../redux/interfaces/reduxState'
import CollapsibleComponent from '../../CommonComponents/Containers/CollapsibleComponent'

interface IOwnProps {
  bladeDetails:IBladeState,
  item1?: IItem | undefined,
  item2?: IItem | undefined,
  itemType1?: IItemType | undefined,
  itemType2?: IItemType | undefined
  heart2Heart?: IHeart2Heart | undefined,
  quest?: IQuestState | undefined
}

export const BladeBasicInfoComponentView = (props: IOwnProps) => {
  return (
    <CollapsibleComponent header={'Basic information'}>
      <div className="row">
        <div className="col-sm-4">
          <img
            src={`/images/blade/${props.bladeDetails.name.replace(/\s+/g, '')}.jpeg`}
            alt={props.bladeDetails.name}
            className="basic-info-image"
          />
        </div>
        <div className="col-sm-8 fit-contents">
          <div className="row">
            <div className="col-sm-4">
              <b>Gender: </b>{props.bladeDetails.gender}
            </div>
            <div className="col-sm-4">
              <b>Type: </b>{props.bladeDetails.type}
            </div>
            <div className="col-sm-4">
              <b>Aux Cores: </b>{props.bladeDetails.auxCoreCount}
            </div>
          </div>
          <div className="row">
            <div className="col-sm-4">
              <b>Weapon: </b>{props.bladeDetails.weapon}
            </div>
            <div className="col-sm-4">
              <b>Element: </b>{props.bladeDetails.element}
            </div>
            <div className="col-sm-4">
              <b>Role: </b>{props.bladeDetails.role}
            </div>
          </div>
          {props.heart2Heart &&
            <>
              <b>Heart 2 Heart: </b>
              <Link to={`/h2h/${props.heart2Heart.id}`}>
                {props.heart2Heart.Title}
              </Link>
              <br/>
            </>          
          }
          {props.quest &&
            <>
              <b>Blade Quest: </b>
              <Link to={`/quest/${props.quest?.id}`}>
                {props.quest?.Name}
              </Link>
              <br/>
            </>
          }
          <>
            <b>Favourite Items: </b>{
              props.item1 && props.item2 ? 
                <>
                  {' '}<Link to={`/item/${props.item1.id}`}>{props.item1.Name}</Link>, 
                  {' '}<Link to={`/item/${props.item2.id}`}>{props.item2.Name}</Link>
                </>
                : 'undefined'
            }
          </>
          <br />
          <>
            <b>Favourite Item Types: </b>{
              props.itemType1 && props.itemType2 ?
                <>
                  {' '}
                  <Link to={`/itemType/${props.itemType1.id}`}>{props.itemType1.ItemType}</Link>, 
                  {' '}
                  <Link to={`/itemType/${props.itemType2.id}`}>{props.itemType2.ItemType}</Link>
                </>
                : 'undefined'
            }
          </>
        </div>
      </div>
    </CollapsibleComponent>
  )
}