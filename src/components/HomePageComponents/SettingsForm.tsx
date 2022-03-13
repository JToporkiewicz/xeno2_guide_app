import { useContext, useEffect, useState } from 'react';
import client from '../../api-client';
import { defaultStoryProgress, IStoryProgress } from '../../interfaces';
import { LoaderContext } from '../App';
import CollapsibleComponent from '../CommonComponents/Containers/CollapsibleComponent';
import Checkbox from './SettingsComponents/Checkbox';
import IncrementDecrementNumber from './SettingsComponents/IncrementDecrementNumber';

const fetchProgress = async (
  setSettings:(story:IStoryProgress) => void
) => {
  try {
    const response = await client.resource('storyProgress').get(1);
    setSettings(response);
  }
  catch(err) {
    console.log(`Error: ${err}`);
  }
}

const SettingsForm = () => {
  const [settings, setSettings] = useState(defaultStoryProgress)
  const loaderContext = useContext(LoaderContext);

  useEffect(() => {
    loaderContext.setLoader(loaderContext.loaderState.concat(['Fetching story progress']))
    fetchProgress(setSettings);
    loaderContext.setLoader(
      loaderContext.loaderState.filter((entry:string) => entry !== 'Fetching story progress')
    )
  }, [])

  useEffect(() => {
    if(settings !== defaultStoryProgress){
      document.cookie = `Chapter = ${settings.Chapter}`;
      document.cookie = `NewGamePlus =${settings.NewGamePlus}`;
      document.cookie = `DLCUnlocked =${settings.DLCUnlocked}`;
    }
  }, [settings])

  const toggleCheckbox = (settingKey:string, value:boolean) => {
    setSettings({...settings, [settingKey]: !value})
  }

  const increaseNumber = (settingKey:string, value:number) => {
    setSettings({...settings, [settingKey]: value+1})
  }

  const decreaseNumber = (settingKey:string, value:number) => {
    setSettings({...settings, [settingKey]: value-1})
  }

  const saveChanges = () => {
    loaderContext.setLoader(loaderContext.loaderState.concat(['Saving story progress']))
    document.cookie = `Chapter = ${settings.Chapter}`;
    document.cookie = `NewGamePlus =${settings.NewGamePlus}`;
    document.cookie = `DLCUnlocked =${settings.DLCUnlocked}`;
    client.resource('storyProgress').update(1, settings);
    loaderContext.setLoader(
      loaderContext.loaderState.filter((entry) => entry !== 'Saving story progress')
    )
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
      <button
        type="button"
        className="btn button-color"
        onClick={() => saveChanges()}
      >
        Update App
      </button>
    </CollapsibleComponent>
  )
}

export default SettingsForm;