import { useState, useEffect, useContext } from 'react';
import client from '../../api-client';
import { Link } from 'react-router-dom';
import CollapsibleComponent from '../CommonComponents/Containers/CollapsibleComponent';
import { IDriver, IItem, IItemType } from '../../interfaces';
import { LoaderContext } from '../App';

const fetchTwoData = async (
  setDetails:(detail1:any[]) => void,
  dataId1:number,
  dataId2:number,
  source:string) => {
  try {
    const item1 = await client.resource(source).get(dataId1);
    const item2 = await client.resource(source).get(dataId2);
    setDetails([item1, item2]);
  }
  catch(err) {
    console.log(`Error: ${err}`);
  }
};

interface IProps {
  driverDetails:IDriver
}

const DriverBasicInfoComponent = (props:IProps) => {
  const driverDetails = props.driverDetails;
  const [itemDetails, setItems] = useState([] as IItem[]);
  const [itemTypeDetails, setItemTypes] = useState([] as IItemType[]);
  const [ideas, setIdeas] = useState({});
  const [dataLoaded, setLoadingStatus] = useState(false);

  const {loaderState, setLoader} = useContext(LoaderContext);

  useEffect(() => {
    if(
      driverDetails.FavItem1 &&
      driverDetails.FavItem2 &&
      driverDetails.IdeaStats &&
      driverDetails.FavItemType1 &&
      driverDetails.FavItemType2) {
      setLoader(loaderState.concat(['Fetch items']))
      fetchTwoData(
        setItems,
        driverDetails.FavItem1,
        driverDetails.FavItem2,
        'item');
      fetchTwoData(
        setItemTypes,
        driverDetails.FavItemType1,
        driverDetails.FavItemType2,
        'itemType'
      );
      setIdeas(JSON.parse(driverDetails.IdeaStats));
      setLoader(
        loaderState.filter((entry:string) => entry !== 'Fetch items')
      )
    }
  }, [
    driverDetails.FavItem1,
    driverDetails.FavItem2,
    driverDetails.FavItemType1,
    driverDetails.FavItemType2,
    driverDetails.IdeaStats,
    driverDetails
  ])

  useEffect(() => {
    if(itemDetails.length > 0 && itemTypeDetails.length > 0 && Object.keys(ideas).length > 0) {
      setLoadingStatus(true);
    }
    else setLoadingStatus(false);
  }, [ideas, itemDetails, itemTypeDetails]);

  return (
    <CollapsibleComponent header={'Basic information'}>
      {dataLoaded ?
        <div className="row">
          <div className="col-sm-4">
            <img
              src={`/images/driver/${driverDetails.Name.replace(/\s+/g, '')}.jpeg`}
              alt={driverDetails.Name}
              className="basic-info-image"/>            
          </div>
          <div>
            Chapter unlocked: {driverDetails.ChapterUnlocked}
            <br />
            <>Favourite Items: 
              {' '}<Link to={`/item/${itemDetails[0].id}`}>{itemDetails[0].Name}</Link>, 
              {' '}<Link to={`/item/${itemDetails[1].id}`}>{itemDetails[1].Name}</Link>
            </>
            <br />
            <>Favourite Item Types: 
              {' '}
              <Link to={`/itemType/${itemTypeDetails[0].id}`}>{itemTypeDetails[0].ItemType}</Link>, 
              {' '}
              <Link to={`/itemType/${itemTypeDetails[1].id}`}>{itemTypeDetails[1].ItemType}</Link>
            </>
            <br />
              Starting idea stats: 
            <ul>
              {Object.entries(ideas).map(([idea, level]) => 
                <li key={idea}>{idea}: {level}</li>
              )}
            </ul>

          </div>
        </div>
        :
        <>
          Chapter unlocked: unknown<br />
          Favourite Items: unknown<br />
          Favourite Item Types: unknown<br />
          Starting idea stats: unknown
        </>
      }           
    </CollapsibleComponent>
  )
};

export default DriverBasicInfoComponent;