import CollapsibleComponent from 'components/CommonComponents/Containers/CollapsibleComponent'
import { NumberSlider } from 'components/CommonComponents/FormComponents/NumberSlider';
import { IUpdateDevelopmentLevel } from 'reduxState/interfaces/locations';
import { IMajorLocations } from 'reduxState/interfaces/reduxState'

interface IDispatchProps {
  updateDevelopmentLevel: (payload:IUpdateDevelopmentLevel) => void;
  saveDevelopmentLevel: (payload:IUpdateDevelopmentLevel) => void;
}

interface IProps {
  locations: IMajorLocations[];
  chapterUnlocked: number;
  avoidSpoilers: boolean;
}

export const DevelopmentLevelView = (props: IProps & IDispatchProps) => {
  const updateLevel = (id:number, level:number) => {
    props.updateDevelopmentLevel({
      id,
      level
    })
  } 
  return <>
    <CollapsibleComponent header="Development Level">
      <>
        {props.locations.filter((area) => area.DevelopmentLevel !== -1)
          .map((area) => 
            <div className="row progress-update-row" key={'develop' + area.Name}>
              <div className='col-sm-5'>
                <p>
                  {props.chapterUnlocked >= area.StoryProgress || !props.avoidSpoilers ?
                    area.Name : '?????'}:
                </p>
              </div>
              <NumberSlider
                lowestNumber={0}
                topNumber={5}
                selectedNumber={area.DevelopmentLevel}
                disabled={props.chapterUnlocked < area.StoryProgress}
                onClick={updateLevel.bind(this, area.id)}
              />
            </div>)}

        <button
          type="button"
          className="btn button-color"
          onClick={() => {
            props.locations.filter((area) => area.DevelopmentLevel !== -1)
              .map((area) => props.saveDevelopmentLevel({
                id: area.id,
                level: area.DevelopmentLevel
              }))
          }}
        >
          Update Development Level
        </button>
      </>
    </CollapsibleComponent>
  </>
}