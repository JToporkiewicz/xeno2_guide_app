import React, { useEffect, useState } from "react";
import client from '../../api-client';
import CollapsibleComponent from "../CommonComponents/CollapsibleComponent";
import Checkbox from "./SettingsComponents/Checkbox";
import Dropdown from "./SettingsComponents/Dropdown";
import IncrementDecrementNumber from "./SettingsComponents/IncrementDecrementNumber";
import TimeInput from "./SettingsComponents/TimeInput";
import { Weather } from './WeatherTypes';

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

    function toggleCheckbox(settingKey, value){
        setSettings({...settings, [settingKey]: !value})
    }

    function increaseNumber(settingKey, value){
        setSettings({...settings, [settingKey]: value+1})
    }

    function decreaseNumber(settingKey, value){
        setSettings({...settings, [settingKey]: value-1})
    }

    function updateTime(settingKey){
        let time = document.getElementById(settingKey).value
        setSettings({...settings, [settingKey]: time ? time : "00:00"})
    }

    function updateDropdownValue(settingKey){
        setSettings({...settings, [settingKey]: document.getElementById(settingKey).value})
        console.log(document.getElementById(settingKey).value)
    }

    function saveChanges(){
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

            <TimeInput 
                title="Time of day:"
                settingKey="TimeOfDay"
                value={settings.TimeOfDay}
                updateTime={updateTime.bind(this)}
            />

            <Dropdown
                title="Area weather:"
                settingKey="AreaWeather"
                values={Weather}
                currentValue={settings.AreaWeather}
                updateCurrentValue={updateDropdownValue.bind(this)}
            />
            <button type="button" class="btn button-color" onClick={() => saveChanges()}>Update App</button>
        </CollapsibleComponent>
    )
}

export default SettingsForm;