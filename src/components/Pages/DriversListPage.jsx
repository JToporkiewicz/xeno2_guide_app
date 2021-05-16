import React, { useState, useEffect } from 'react';
import client from '../../api-client';
import CharacterPanelContainer from '../CommonComponents/CharacterPanelsContainer';
import ClosedImagePanel from '../CommonComponents/ClosedImagePanel';
import HeaderContainer from '../CommonComponents/HeaderContainer';
import UnavailableImagePanel from '../UnavailableDataComponents/UnavailableImagePanel';

async function fetchDrivers(setDrivers){
    try {
        const response = await client.resource('driver').find();
        setDrivers(response.map((r) => ({...r, "Show": false})));
    }
    catch(err) {
        console.log(`Error: ${err}`);
    }
};

async function fetchProgress(setSettings){
    try {
        const response = await client.resource('storyProgress').get(1);
        setSettings(response);
    }
    catch(err) {
        console.log(`Error: ${err}`);
    }
}

function DriversListPage(){

    const [drivers, setDrivers] = useState([])
    const [progress, setProgress] = useState([])
    const [driversList, setDriverList] = useState([]);

    useEffect(() => {
        fetchDrivers(setDrivers);
        fetchProgress(setProgress);
    }, [])

    useEffect(() => {
        if(drivers !== undefined && progress !== undefined){

            function updateShow(driver){
                setDrivers(drivers.map((d) => (d.Name === driver ? {...d, "Show": !d.Show} : d)))
            }

            function updateGameState(entryId){
                const driver = drivers.find(d => d.id === entryId);
                setProgress({...progress,
                    Chapter: driver.ChapterUnlocked})
                client.resource("storyProgress").update(1, {Chapter: driver.ChapterUnlocked})
            }

            setDriverList(    
                drivers.map((driver) =>
                (progress.OnlyShowAvailable || 
                    (driver.ChapterUnlocked <= progress.Chapter || driver.Show) ? 
                    <ClosedImagePanel
                        linked={true}
                        panelType="driver"
                        name={driver.Name}
                        id={driver.id}
                        key={driver.Name}
                    /> :
                    <UnavailableImagePanel
                        name={driver.Name}
                        panelType="driver"
                        id={driver.id}
                        toggleShow={updateShow.bind(this)}
                        updateGameState={updateGameState.bind(this)}
                        key={driver.Name}
                        />
                ))
            )
        }
    }, [drivers, progress])



    return(
        <>
            <HeaderContainer title="Drivers"/>
            <CharacterPanelContainer title="Drivers">
                {driversList}
            </CharacterPanelContainer>
        </>
    )
}

export default DriversListPage;