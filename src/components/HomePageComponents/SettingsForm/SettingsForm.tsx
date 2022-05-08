import { IStoryProgress } from '../../../interfaces';
import CollapsibleComponent from '../../CommonComponents/Containers/CollapsibleComponent';
import Checkbox from './SettingsComponents/Checkbox';
import IncrementDecrementNumber from './SettingsComponents/IncrementDecrementNumber';

interface IDispatchProps {
  saveStoryProgress:(payload:IStoryProgress) => void;
  setStoryProgress:(payload:IStoryProgress) => void;
}

interface IProps {
  storyProgress:IStoryProgress;
}

export const SettingsFormView = (props: IProps & IDispatchProps) => {

  const toggleCheckbox = (settingKey:string, value:boolean) => {
    props.setStoryProgress({...props.storyProgress, [settingKey]: !value})
  }

  const increaseNumber = (settingKey:string, value:number) => {
    props.setStoryProgress({...props.storyProgress, [settingKey]: value+1})
  }

  const decreaseNumber = (settingKey:string, value:number) => {
    props.setStoryProgress({...props.storyProgress, [settingKey]: value-1})
  }

  const saveChanges = () => {
    props.saveStoryProgress(props.storyProgress)
  }

  return(
    <CollapsibleComponent header="App Settings and Game Progress">
      <Checkbox 
        title="Only show items/characters available. Avoid spoilers:"
        settingKey="OnlyShowAvailable"
        value={props.storyProgress.OnlyShowAvailable}
        toggleValue={toggleCheckbox.bind(this)}
      />
            
      <IncrementDecrementNumber 
        title="Chapter:"
        settingKey="Chapter"
        value={props.storyProgress ? props.storyProgress.Chapter : 1}
        minimum={1}
        maximum={10}
        decreaseValue={decreaseNumber.bind(this)}
        increaseValue={increaseNumber.bind(this)}
      />

      <Checkbox 
        title="New Game Plus playthrough:"
        settingKey="NewGamePlus"
        value={props.storyProgress.NewGamePlus}
        toggleValue={toggleCheckbox.bind(this)}
      />

      <Checkbox
        title="DLC unlocked:"
        settingKey="DLCUnlocked"
        value={props.storyProgress.DLCUnlocked}
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
