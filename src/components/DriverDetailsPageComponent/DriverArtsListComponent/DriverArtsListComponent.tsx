import { useState, useEffect, ReactChild } from 'react';
import {
  IDriverArtUpdateLevelUnlocked,
  IDriverArtUpdateData
} from '../../../redux/interfaces/drivers';
import { IDriverArtsState } from '../../../redux/interfaces/reduxState';
import CollapsibleComponent from '../../CommonComponents/Containers/CollapsibleComponent';
import ClosedUnlinkedImagePanel from '../../CommonComponents/ImagePanels/ClosedUnlinkedImagePanel';
import DADetails from './DriverArtDetailsComponents/DADetails';

interface IDispatchProps {
  saveDriverArtLevel: (payload: IDriverArtUpdateData) => void,
  updateDriverArtLevelUnlocked: (payload: IDriverArtUpdateLevelUnlocked) => void
}

interface IProps {
  driverId:number;
  driverArts: IDriverArtsState[];
}

export const DriverArtsListComponentView = (props:IProps & IDispatchProps) => {
  const [uniqueWeapons, setUniqueWeapons] = useState([] as string[]);
  const [focused, setFocused] = useState('');

  useEffect(() => {
    if(props.driverArts.length > 0){
      let completeWeaponTypeList = props.driverArts.map((details) => details.weaponType);
      setUniqueWeapons([...completeWeaponTypeList.filter(
        (weapon:string, index:number) => completeWeaponTypeList.indexOf(weapon) === index)]);
    }
  }, [props.driverArts])

  const updateArtLevel = (artId:number, newLevel:number) => {
    const artList = props.driverArts
      .find((artList) => artList.id === artId);
    if (artList) {
      props.saveDriverArtLevel({artId, newLevel});
      props.updateDriverArtLevelUnlocked({
        driverId: props.driverId,
        artId: artList.id,
        levelUnlocked: newLevel
      })
    }

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
          weaponArts={props.driverArts.filter((weapon) => weapon.weaponType === focused)}
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
