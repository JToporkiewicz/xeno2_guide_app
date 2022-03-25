import { useContext, useEffect } from 'react';
import client from '../../api-client';
import { IStoryProgress } from '../../interfaces';
import { LoaderContext, ProgressContext } from '../App';
import CollapsibleComponent from '../CommonComponents/Containers/CollapsibleComponent';
import Checkbox from './SettingsComponents/Checkbox';
import IncrementDecrementNumber from './SettingsComponents/IncrementDecrementNumber';

const fetchProgress = async (
  setProgress:(story:IStoryProgress) => void
) => {
  try {
    const response = await client.resource('storyProgress').get(1);
    setProgress(response);
  }
  catch(err) {
    console.log(`Error: ${err}`);
  }
}

const SettingsForm = () => {
  const {loaderState, setLoader} = useContext(LoaderContext);
  const {progressState, setProgress} = useContext(ProgressContext);

  useEffect(() => {
    setLoader(loaderState.concat(['Fetching story progress']))
    fetchProgress(setProgress);
    setLoader(
      loaderState.filter((entry:string) => entry !== 'Fetching story progress')
    )
  }, [])

  const toggleCheckbox = (settingKey:string, value:boolean) => {
    setProgress({...progressState, [settingKey]: !value})
  }

  const increaseNumber = (settingKey:string, value:number) => {
    setProgress({...progressState, [settingKey]: value+1})
  }

  const decreaseNumber = (settingKey:string, value:number) => {
    setProgress({...progressState, [settingKey]: value-1})
  }

  const saveChanges = () => {
    setLoader(loaderState.concat(['Saving story progress']))
    client.resource('storyProgress').update(1, progressState);
    setProgress(progressState);
    setLoader(
      loaderState.filter((entry) => entry !== 'Saving story progress')
    )
  }

  return(
    <CollapsibleComponent header="App Settings and Game Progress">
      <Checkbox 
        title="Only show items/characters available. Avoid spoilers:"
        settingKey="OnlyShowAvailable"
        value={progressState.OnlyShowAvailable}
        toggleValue={toggleCheckbox.bind(this)}
      />
            
      <IncrementDecrementNumber 
        title="Chapter:"
        settingKey="Chapter"
        value={progressState ? progressState.Chapter : 1}
        minimum={1}
        maximum={10}
        decreaseValue={decreaseNumber.bind(this)}
        increaseValue={increaseNumber.bind(this)}
      />

      <Checkbox 
        title="New Game Plus playthrough:"
        settingKey="NewGamePlus"
        value={progressState.NewGamePlus}
        toggleValue={toggleCheckbox.bind(this)}
      />

      <Checkbox
        title="DLC unlocked:"
        settingKey="DLCUnlocked"
        value={progressState.DLCUnlocked}
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