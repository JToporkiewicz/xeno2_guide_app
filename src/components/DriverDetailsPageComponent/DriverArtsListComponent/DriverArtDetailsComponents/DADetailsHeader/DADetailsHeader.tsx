import { useState, useEffect, ReactChild } from 'react';
import { Link } from 'react-router-dom';
import { IStoryProgress } from '../../../../../interfaces/StoryProgress';
import { IBladeState, IUpdateShow } from '../../../../../redux/interfaces/reduxState';
import SmallPeekPanel
  from '../../../../UnavailableDataComponents/Images/SmallPeekPanel';

interface IDispatchProps {
  updateShowBlade:(payload:IUpdateShow) => void;
  showLoader: (payload:string) => void;
  hideLoader: (payload:string) => void;
}

interface IOwnProps {
  weapon:string,
  clearArt:() => void
}

interface IProps {
  blades: IBladeState[];
  storyProgress: IStoryProgress;
}

export const DADetailsHeaderView = (props:IProps & IOwnProps & IDispatchProps) => {
  const [bladesList, setBladeList] = useState([] as ReactChild[]);

  useEffect(() => {
    if(props.blades !== undefined){

      props.showLoader('Update art details');
      const updateShow = (id:number) => {
        const bladeDetails = props.blades.find((b) => b.id === id);
        if(bladeDetails) {
          props.updateShowBlade({id: bladeDetails.id, show: bladeDetails.show});
        }
      }

      setBladeList(    
        props.blades.filter((blade) => blade.weapon === props.weapon && blade.id !== 53)
          .map((blade:IBladeState) =>
            !props.storyProgress.OnlyShowAvailable || 
                    (blade.available || blade.show) ? 
              <Link
                to={`/blade/${blade.id}`}
                className="small-image-panel"
                key={blade.name}
              >
                <img
                  src={`/images/blade/${blade.name
                    .replaceAll(/\s+/g, '')
                    .replace('α','Alpha')
                    .replace('π', 'Pi')}.jpeg`}
                  alt={blade.name}
                  className="small-image"
                />
              </Link>
              :
              <SmallPeekPanel
                id={blade.id}
                updateState={updateShow.bind(this)}
                key={blade.name}
              />
          )
      )
      props.hideLoader('Update art details');
    }
  }, [props.blades])

  return(
    <div className="art-details-header">
      <img
        src={`/images/weaponType/${props.weapon.replace(/\s+/g, '')}.jpeg`}
        alt={props.weapon}
        className="driver-art-details-image"/>
      <img
        src="/images/helper/Close.svg"
        alt="close"
        className="close-details"
        onClick={() => props.clearArt()}
      />
      <h3><b>{props.weapon}</b></h3>
      <div>
        <h4>Blades</h4>
        {bladesList}
      </div>
    </div>
  )
};
