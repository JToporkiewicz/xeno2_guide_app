import {useState, useEffect, useContext} from 'react';
import client from '../../api-client';
import DriverBasicInfoComponent from './DriverBasicInfoComponent';
import HeaderContainer from '../CommonComponents/Containers/HeaderContainer';
import DriverArtsListComponent from './DriverArtsListComponent';
import { defaultDriver, IDriver } from '../../interfaces';
import { LoaderContext } from '../App';
import DriverHeart2HeartList from './DriverHeart2HeartList';

const fetchDriverDetails = async (
  setDetails:(driver:IDriver) => void,
  id:number
) => {
  try {
    const response = await client.resource('driver').get(id);
    setDetails(response);
  }
  catch(err) {
    console.log(`Error: ${err}`);
  }
};

interface IProps {
    match:any
}

const DriverDetailsPage = (props:IProps) => {
  let driverId = props.match.params.slug;
  const [driverDetails, setDriverDetails] = useState(defaultDriver)

  const loaderContext = useContext(LoaderContext);
  useEffect(() => {
    loaderContext.setLoader(loaderContext.loaderState.concat(['Fetching driver details']))
    fetchDriverDetails(setDriverDetails, driverId)
    loaderContext.setLoader(
      loaderContext.loaderState.filter((entry:string) => entry !== 'Fetching driver details')
    )
  }, [driverId])


  return (
    <>
      <HeaderContainer title={driverDetails.Name} />
      <DriverBasicInfoComponent driverDetails={driverDetails} />
      <DriverArtsListComponent driverId={driverId} />
      <DriverHeart2HeartList driverId={driverId} driverName={driverDetails.Name} />
    </>
  )

}

export default DriverDetailsPage;