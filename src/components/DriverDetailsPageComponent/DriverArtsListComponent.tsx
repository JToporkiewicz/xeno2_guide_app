import { useState, useEffect, ReactChild, useContext } from 'react';
import client from '../../api-client';
import { IDriverArts } from '../../interfaces';
import { LoaderContext } from '../App';
import CollapsibleComponent from '../CommonComponents/Containers/CollapsibleComponent';
import ClosedUnlinkedImagePanel from '../CommonComponents/ImagePanels/ClosedUnlinkedImagePanel';
import DADetails from './DriverArtDetailsComponents/DADetails';

const getDriverArts = async (
  setArts:(arts:IDriverArts[]) => void,
  driverId:number
) => {
  try {
    const response = await client.resource('driverArt').find({driver: driverId});
    setArts(response);
  }
  catch(err) {
    console.log(`Error: ${err}`);
  }
};

const updateDetail = async (
  artId:number,
  newLevel:number
) => {
  try {
    await client.resource('driverArt').update(artId, {LevelUnlocked: newLevel})
  }
  catch(err){
    console.log(`Error: ${err}`)
  }
}

interface IProps {
  driverId:number

}

const DriverArtsListComponent = (props:IProps) => {
  const [driverArts, setArts] = useState([] as IDriverArts[]);
  const [uniqueWeapons, setUniqueWeapons] = useState([] as string[]);
  const [focused, setFocused] = useState('');
  const loaderContext = useContext(LoaderContext);

  useEffect(() => {
    if(props.driverId){
      loaderContext.setLoader(loaderContext.loaderState.concat(['Fetching driver arts']))
      getDriverArts(setArts, props.driverId);
      loaderContext.setLoader(
        loaderContext.loaderState.filter((entry:string) => entry !== 'Fetching driver arts')
      )
    }
  }, [props.driverId]);

  useEffect(() => {
    if(driverArts.length > 0){
      let completeWeaponTypeList = driverArts.map((details) => details.WeaponType);
      setUniqueWeapons([...completeWeaponTypeList.filter(
        (weapon:string, index:number) => completeWeaponTypeList.indexOf(weapon) === index)]);
    }
  }, [driverArts])

  const updateArtLevel = (artId:number, newLevel:number) => {
    loaderContext.setLoader(loaderContext.loaderState.concat(['Updating driver arts']))
    updateDetail(artId, newLevel)
    setTimeout(()=>getDriverArts(setArts, props.driverId), 100);
    loaderContext.setLoader(
      loaderContext.loaderState.filter((entry:string) => entry !== 'Updating driver arts')
    )
  }

  const focusArt = (art = '') => {
    setFocused(art)
  }

  const weaponsPanels:ReactChild[] = [];
  uniqueWeapons.forEach((weapon) => weaponsPanels.push(
    <ClosedUnlinkedImagePanel
      panelType="weaponType"
      name={weapon}
      focused={focused === weapon}
      focus={focusArt.bind(this)}
      key={weapon}
    />
  ))

  return (
    <CollapsibleComponent header={'Driver Arts'}>
      {focused.length > 0 ?
        <DADetails
          clearArt={focusArt.bind(this)}
          weapon={focused}
          weaponArts={driverArts.filter((weapon) => weapon.WeaponType === focused)}
          updateArtLevel={updateArtLevel.bind(this)}
        />
        : <div/>}
      {uniqueWeapons.length > 0 ?
        <div className="row">
          {weaponsPanels}
        </div>
        :
        <>Unknown</>
      }
    </CollapsibleComponent>
  )
};

export default DriverArtsListComponent;