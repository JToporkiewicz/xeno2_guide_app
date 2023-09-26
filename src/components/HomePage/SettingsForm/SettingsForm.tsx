import { IStoryProgress } from 'interfaces';
import CollapsibleComponent from 'components/CommonComponents/Containers/CollapsibleComponent';
import { NumberSlider } from 'components/CommonComponents/FormComponents/NumberSlider';
import { OptionsCheckbox } from 'components/CommonComponents/FormComponents/OptionsCheckbox';

interface IDispatchProps {
  saveStoryProgress:(payload:IStoryProgress) => void;
  setStoryProgress:(payload:IStoryProgress) => void;
}

interface IProps {
  storyProgress:IStoryProgress;
}

export const SettingsFormView = (props: IProps & IDispatchProps) => {

  const toggleCheckbox = (settingKey:string, value:boolean | string) => {
    props.setStoryProgress({...props.storyProgress, [settingKey]: value})
  }

  const updateValue = (type: string, value:number) => {
    props.setStoryProgress({...props.storyProgress, [type]: value})
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
        <OptionsCheckbox
          size='small'
          hideAvailable={true}
          available={true}
          unlocked={props.storyProgress.OnlyShowAvailable}
          onClick={toggleCheckbox.bind(this, 'OnlyShowAvailable')}
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
          onClick={updateValue.bind(this, 'Chapter')}
        />
      </div>
      {props.storyProgress?.Chapter >= 4
      || props.storyProgress.OnlyShowAvailable === false ?
        <div className="row progress-update-row">
          <div className='col-sm-5'>
            <p>Mercenary Group Level:</p>
          </div>
          <NumberSlider 
            selectedNumber={props.storyProgress ? props.storyProgress.MercLevel : 1}
            lowestNumber={1}
            topNumber={5}
            onClick={updateValue.bind(this, 'MercLevel')}
            disabled={props.storyProgress?.Chapter < 4}
          />
        </div>
        :
        <div className="row progress-update-row">
          <div className='col-sm-5'>
            ?????
            <br/>
            <br/>
          </div>
        </div>
      }

      <div className="row progress-update-row">
        <div className='col-sm-5'>
          <p>New Game Plus playthrough:</p>
        </div>
        <OptionsCheckbox
          size='small'
          hideAvailable={true}
          available={true}
          unlocked={props.storyProgress.NewGamePlus}
          onClick={toggleCheckbox.bind(this, 'NewGamePlus')}
        />
      </div>

      <div className="row progress-update-row">
        <div className='col-sm-5'>
          <p>DLC unlocked:</p>
        </div>
        <OptionsCheckbox
          size='small'
          hideAvailable={true}
          available={true}
          unlocked={props.storyProgress.DLCUnlocked}
          onClick={toggleCheckbox.bind(this, 'DLCUnlocked')}
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
