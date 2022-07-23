import { IStoryProgress } from 'interfaces';
import CollapsibleComponent from 'components/CommonComponents/Containers/CollapsibleComponent';
import Checkbox from 'components/CommonComponents/FormComponents/Checkbox';
import { NumberSlider } from 'components/CommonComponents/FormComponents/NumberSlider';

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
      <div className="row progress-update-row">
        <div className='col-sm-5'>
          <p>Only show items/characters available. Avoid spoilers: </p>
        </div>

        <Checkbox 
          value={props.storyProgress.OnlyShowAvailable}
          toggleValue={toggleCheckbox.bind(this, 'OnlyShowAvailable')}
        />
      </div>
      <div className="row progress-update-row">
        <div className='col-sm-5'>
          <p>Chapter:</p>
        </div>            
        <NumberSlider 
          selectedNumber={props.storyProgress ? props.storyProgress.Chapter : 1}
          lowestNumber={1}
          topNumber={10}
          onClick={updateValue.bind(this)}
        />
      </div>

      <div className="row progress-update-row">
        <div className='col-sm-5'>
          <p>New Game Plus playthrough:</p>
        </div>

        <Checkbox 
          value={props.storyProgress.NewGamePlus}
          toggleValue={toggleCheckbox.bind(this, 'NewGamePlus')}
        />
      </div>

      <div className="row progress-update-row">
        <div className='col-sm-5'>
          <p>DLC unlocked:</p>
        </div>

        <Checkbox
          value={props.storyProgress.DLCUnlocked}
          toggleValue={toggleCheckbox.bind(this, 'DLCUnlocked')}
        />
      </div>

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
