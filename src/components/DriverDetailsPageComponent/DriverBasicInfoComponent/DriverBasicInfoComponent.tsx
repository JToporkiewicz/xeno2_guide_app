import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CollapsibleComponent from '../../CommonComponents/Containers/CollapsibleComponent';
import { IItem, IItemType } from '../../../interfaces';
import { IDriverState } from '../../../redux/interfaces/reduxState';

interface IOwnProps {
  driverDetails:IDriverState,
  item1?: IItem | undefined,
  item2?: IItem | undefined,
  itemType1?: IItemType | undefined,
  itemType2?: IItemType | undefined
}

export const DriverBasicInfoComponentView = (props:IOwnProps) => {
  const [ideas, setIdeas] = useState({});

  useEffect(() => {
    if(props.driverDetails) {
      setIdeas(JSON.parse(props.driverDetails.ideaStats));
    }
  }, [props.driverDetails])

  return (
    <CollapsibleComponent header={'Basic information'}>
      <div className="row">
        <div className="col-sm-4">
          <img
            src={`/images/driver/${props.driverDetails.name.replace(/\s+/g, '')}.jpeg`}
            alt={props.driverDetails.name}
            className="basic-info-image"/>            
        </div>
        <div>
            Chapter unlocked: {props.driverDetails.chapterUnlocked}
          <br />
          <>Favourite Items: {
            props.item1 && props.item2 ? 
              <>
                {' '}<Link to={`/item/${props.item1.id}`}>{props.item1.Name}</Link>, 
                {' '}<Link to={`/item/${props.item2.id}`}>{props.item2.Name}</Link>
              </>
              : 'undefined'
          }
          </>
          <br />
          <>Favourite Item Types: {
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
          <br />
              Starting idea stats: {
            ideas ? 
              <ul>
                {Object.entries(ideas).map(([idea, level]) => 
                  <li key={idea}>{idea}: {level}</li>
                )}
              </ul>
              : 'undefined'
          }
        </div>
      </div>
    </CollapsibleComponent>
  )
};
