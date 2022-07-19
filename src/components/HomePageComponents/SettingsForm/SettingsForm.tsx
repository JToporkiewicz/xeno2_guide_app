import { IStoryProgress } from 'interfaces';
import CollapsibleComponent from 'components/CommonComponents/Containers/CollapsibleComponent';
import Checkbox from 'components/CommonComponents/FormComponents/Checkbox';
import IncrementDecrementNumber
  from 'components/CommonComponents/FormComponents/IncrementDecrementNumber';

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

  const updateValue = (value:number) => {
    props.setStoryProgress({...props.storyProgress, Chapter: value})
  }

  const saveChanges = () => {
    props.saveStoryProgress(props.storyProgress)
  }

  return(
    <CollapsibleComponent header="App Settings and Game Progress">
      <Checkbox 
        title="Only show items/characters available. Avoid spoilers:"
        value={props.storyProgress.OnlyShowAvailable}
        toggleValue={toggleCheckbox.bind(this, 'OnlyShowAvailable')}
      />
            
      <IncrementDecrementNumber 
        title="Chapter:"
        value={props.storyProgress ? props.storyProgress.Chapter : 1}
        minimum={1}
        maximum={10}
        updateValue={updateValue.bind(this)}
      />

      <Checkbox 
        title="New Game Plus playthrough:"
        value={props.storyProgress.NewGamePlus}
        toggleValue={toggleCheckbox.bind(this, 'NewGamePlus')}
      />

      <Checkbox
        title="DLC unlocked:"
        value={props.storyProgress.DLCUnlocked}
        toggleValue={toggleCheckbox.bind(this, 'DLCUnlocked')}
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
