import React, {useState, useEffect} from 'react';
import client from '../../api-client';
import DriverBasicInfoComponent from '../DriverDetailsPageComponent/DriverBasicInfoComponent';
import HeaderContainer from '../CommonComponents/Containers/HeaderContainer';
import DriverArtsListComponent from '../DriverDetailsPageComponent/DriverArtsListComponent';

async function fetchDriverDetails(setDetails, id){
    try {
        const response = await client.resource('driver').get(id);
        setDetails(response);
    }
    catch(err) {
        console.log(`Error: ${err}`);
    }
};

function DriverDetailsPage (props) {
    let driverId = props.match.params.slug;
    const [driverDetails, setDriverDetails] = useState([])

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