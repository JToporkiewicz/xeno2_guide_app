import CollapsibleComponent from 'components/CommonComponents/Containers/CollapsibleComponent'
import { NumberSlider } from 'components/CommonComponents/FormComponents/NumberSlider';
import { useEffect, useRef } from 'react';
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
  const saved = useRef(true);
  const locationsHistory = useRef(props.locations)

  const updateLevel = (id:number, level:number) => {
    saved.current = false
    props.updateDevelopmentLevel({
      id,
      level
    })
  }

  useEffect(() => {
    return () => {
      if (!saved.current) {
        locationsHistory.current.filter((area) => area.DevelopmentLevel !== -1)
          .map((area) => props.updateDevelopmentLevel({
            id: area.id,
            level: area.DevelopmentLevel
          }))
      }
    }
  }, [])

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
            saved.current = true
            locationsHistory.current = props.locations
          }}
        >
          Update Development Level
        </button>
      </>
    </CollapsibleComponent>
  </>
}