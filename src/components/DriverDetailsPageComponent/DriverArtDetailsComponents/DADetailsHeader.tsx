import { useState, useEffect, ReactChild } from 'react';
import { Link } from 'react-router-dom';
import client from '../../../api-client';
import { defaultStoryProgress, IBlade, IStoryProgress } from '../../../interfaces';
import SmallUnavailableImagePanel
  from '../../UnavailableDataComponents/Images/SmallUnavailableImagePanel';

interface IShowingBlades extends IBlade {
  Show?:boolean
}

const findBladesByWeapon = async (
  weaponType:string,
  setBlades:(blades:IShowingBlades[]) => void
) => {
  try {
    const response = await client.resource('blade').find({Weapon: weaponType});
    setBlades([...response.filter((blade:IShowingBlades) => blade.Name !== 'Dagas (Awakened)')]);
  }
  catch(err) {
    console.log(`Error: ${err}`);
  }
};

const fetchProgress = async (setSettings:(value:IStoryProgress) => void) => {
  try {
    const response = await client.resource('storyProgress').get(1);
    setSettings(response);
  }
  catch(err) {
    console.log(`Error: ${err}`);
  }
};

interface IProps {
  weapon:string,
  clearArt:() => void
}

const DADetailsHeader = (props:IProps) => {
  const [blades, setBlades] = useState([] as IShowingBlades[]);
  const [progress, setProgress] = useState(defaultStoryProgress);
  const [bladesList, setBladeList] = useState([] as ReactChild[]);

  useEffect(() => {
    findBladesByWeapon(props.weapon, setBlades);
    fetchProgress(setProgress);
  }, [props.weapon]);

  useEffect(() => {
    if(blades !== undefined && progress !== undefined){

      const updateShow = (blade:string) => {
        setBlades(blades.map((b) => b.Name === blade ? {...b, 'Show': !b.Show} : b))
      }

      const updateBladeAvailability = (entryId:number) => {
        client.resource('blade').update(entryId, {Available: true})
      }

      setBladeList(    
        blades.map((blade:IShowingBlades) =>
          !progress.OnlyShowAvailable || 
                    (blade.Available || blade.Show) ? 
            <Link
              to={`/blade/${blade.id}`}
              className="small-image-panel"
              key={blade.Name}
            >
              <img
                src={`/images/blade/${blade.Name
                  .replaceAll(/\s+/g, '')
                  .replace('α','Alpha')
                  .replace('π', 'Pi')}.jpeg`}
                alt={blade.Name}
                className="small-image"
              />
            </Link>
            :
            <SmallUnavailableImagePanel
              name={blade.Name}
              id={blade.id}
              toggleShow={updateShow.bind(this)}
              updateState={updateBladeAvailability.bind(this)}
              key={blade.Name}
            />
        )
      )
    }
  }, [blades, progress])

  return(
    <div className="art-details-header">
      <img
        src={`/images/weaponType/${props.weapon.replace(/\s+/g, '')}.jpeg`}
        alt={props.weapon}
        className="driver-art-details-image"/>
      <img
        src="/images/helper/close.png"
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

export default DADetailsHeader;