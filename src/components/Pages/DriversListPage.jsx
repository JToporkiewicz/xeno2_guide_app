import React, { useState, useEffect } from 'react';
import client from '../../api-client';
import CharacterPanelContainer from '../CommonComponents/CharacterPanelsContainer';
import DriverPanel from '../DriverListPageComponents/DriverPanel';

function DriversListPage(){

    const [drivers, setDrivers] = useState([])

    useEffect(() => {
        fetchProgress();
    }, [])

    async function fetchProgress(){
        try {
            const response = await client.resource('driver').find();
            setDrivers(response);
        }
        catch(err) {
            console.log(`Error: ${err}`);
        }
    };

    const driversList = [];
    drivers.forEach((driver) =>
        (driversList.push(
            <DriverPanel
                name={driver.Name}
                id={driver.id}
            />)
        ));

    return(
        <>
            <CharacterPanelContainer title="Drivers">
                {driversList}
            </CharacterPanelContainer>
        </>
    )
}

export default DriversListPage;