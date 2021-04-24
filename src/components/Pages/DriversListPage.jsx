import React, { useState, useEffect } from 'react';
import client from '../../api-client';
import CharacterPanelContainer from '../CommonComponents/CharacterPanelsContainer';
import ClosedImagePanel from '../CommonComponents/ClosedImagePanel';

async function fetchProgress(setDrivers){
    try {
        const response = await client.resource('driver').find();
        setDrivers(response);
    }
    catch(err) {
        console.log(`Error: ${err}`);
    }
};

function DriversListPage(){

    const [drivers, setDrivers] = useState([])

    useEffect(() => {
        fetchProgress(setDrivers);
    }, [])

    const driversList = [];
    drivers.forEach((driver) =>
        (driversList.push(
            <ClosedImagePanel
                linked={true}
                panelType="driver"
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