import { useState, useEffect, ReactChild } from 'react';
import client from '../../api-client';
import { IDriverArts } from '../../interfaces';
import CollapsibleComponent from '../CommonComponents/Containers/CollapsibleComponent';
import ClosedUnlinkedImagePanel from '../CommonComponents/ImagePanels/ClosedUnlinkedImagePanel';
import DADetails from './DriverArtDetailsComponents/DADetails';

const getDriverArts = async (setArts:(arts:IDriverArts[]) => void, driverId:number) => {
  try {
    const response = await client.resource('driverArt').find({driver: driverId});
    setArts(response);
  }
  catch(err) {
    console.log(`Error: ${err}`);
  }
};

interface IProps {
  driverId:number

}

const DriverArtsListComponent = (props:IProps) => {
  const [driverArts, setArts] = useState([] as IDriverArts[]);
  const [uniqueWeapons, setUniqueWeapons] = useState([] as string[]);
  const [focused, setFocused] = useState('');

  useEffect(() => {
    if(props.driverId){
      getDriverArts(setArts, props.driverId);
    }
  }, [props.driverId]);

  useEffect(() => {
    if(driverArts.length > 0){
      let completeWeaponTypeList = driverArts.map((details) => details.WeaponType);
      setUniqueWeapons([...completeWeaponTypeList.filter(
        (weapon:string, index:number) => completeWeaponTypeList.indexOf(weapon) === index)]);
    }
  }, [driverArts])

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
          weaponArts={driverArts.filter((weapon) => weapon.WeaponType === focused)}/>
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