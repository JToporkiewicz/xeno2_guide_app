import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import path from 'path';
import CollapsibleComponent from 'components/CommonComponents/Containers/CollapsibleComponent';
import { IItem, IItemType } from 'interfaces';
import { IDriverState } from 'reduxState/interfaces/reduxState';

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
      setIdeas(props.driverDetails.ideaStats);
    }
  }, [props.driverDetails])

  return (
    <CollapsibleComponent header={'Basic information'}>
      <div className="row">
        <div className="basic-info-image-area">
          <img
            src={path.resolve(`images/driver/${props.driverDetails.name.replace(/\s+/g, '')}.jpeg`)}
            alt={props.driverDetails.name}
            className="basic-info-image"/>            
        </div>
        <div className='col-sm-8'>
          <b>Chapter unlocked: </b>{props.driverDetails.chapterUnlocked}
          <br />
          <>
            <b>Favourite Items: </b>
            {
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
            <b>Favourite Item Types: </b>
            {
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
          <b>Starting idea stats: </b>
          {
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
