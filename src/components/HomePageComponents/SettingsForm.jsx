import React, { useEffect, useState } from "react";
import client from '../../api-client';
import CollapsibleComponent from "../CommonComponents/Containers/CollapsibleComponent";
import Checkbox from "./SettingsComponents/Checkbox";
import IncrementDecrementNumber from "./SettingsComponents/IncrementDecrementNumber";

async function fetchProgress(setSettings){
    try {
        const response = await client.resource('storyProgress').get(1);
        setSettings(response);
    }
    catch(err) {
        console.log(`Error: ${err}`);
    }
}

function SettingsForm(props){
    const [settings, setSettings] = useState([])

    useEffect(() => {
        fetchProgress(setSettings);
    }, [])

    useEffect(() => {
        if(settings !== null && settings !== []){
            document.cookie = `Chapter = ${settings.Chapter}`;
            document.cookie = `NewGamePlus =${settings.NewGamePlus}`;
            document.cookie = `DLCUnlocked =${settings.DLCUnlocked}`;
        }
    }, [settings])

    function toggleCheckbox(settingKey, value){
        setSettings({...settings, [settingKey]: !value})
    }

    function increaseNumber(settingKey, value){
        setSettings({...settings, [settingKey]: value+1})
    }

    function decreaseNumber(settingKey, value){
        setSettings({...settings, [settingKey]: value-1})
    }

    function saveChanges(){
        document.cookie = `Chapter = ${settings.Chapter}`;
        document.cookie = `NewGamePlus =${settings.NewGamePlus}`;
        document.cookie = `DLCUnlocked =${settings.DLCUnlocked}`;
        client.resource('storyProgress').update(1, settings);
    }

    return(
        <CollapsibleComponent header="App Settings and Game Progress">
            <Checkbox 
                title="Only show items/characters available. Avoid spoilers:"
                settingKey="OnlyShowAvailable"
                value={settings.OnlyShowAvailable}
                toggleValue={toggleCheckbox.bind(this)}
            />
            
            <IncrementDecrementNumber 
                title="Chapter:"
                settingKey="Chapter"
                value={settings ? settings.Chapter : 1}
                minimum={1}
                maximum={10}
                decreaseValue={decreaseNumber.bind(this)}
                increaseValue={increaseNumber.bind(this)}
            />

            <Checkbox 
                title="New Game Plus playthrough:"
                settingKey="NewGamePlus"
                value={settings.NewGamePlus}
                toggleValue={toggleCheckbox.bind(this)}
            />

            <Checkbox
                title="DLC unlocked:"
                settingKey="DLCUnlocked"
                value={settings.DLCUnlocked}
                toggleValue={toggleCheckbox.bind(this)}
            />
            <button type="button" className="btn button-color" onClick={() => saveChanges()}>Update App</button>
        </CollapsibleComponent>
    )
}

export default SettingsForm;