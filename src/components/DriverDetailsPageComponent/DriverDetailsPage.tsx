import {useState, useEffect} from 'react';
import client from '../../api-client';
import DriverBasicInfoComponent from './DriverBasicInfoComponent';
import HeaderContainer from '../CommonComponents/Containers/HeaderContainer';
import DriverArtsListComponent from './DriverArtsListComponent';
import { defaultDriver, IDriver } from '../../interfaces';

const fetchDriverDetails = async (setDetails:(driver:IDriver) => void, id:number) => {
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

  useEffect(() => {
    fetchDriverDetails(setDriverDetails, driverId)
  }, [driverId])


  return (
    <>
      <HeaderContainer title={driverDetails.Name} />
      <DriverBasicInfoComponent driverDetails={driverDetails} />
      <DriverArtsListComponent driverId={driverId} />
    </>
  )

}

export default DriverDetailsPage;