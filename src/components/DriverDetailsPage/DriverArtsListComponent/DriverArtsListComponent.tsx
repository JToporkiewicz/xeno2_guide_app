import { useState, useEffect, ReactChild, useRef } from 'react';
import {
  IDriverArtUpdateLevelUnlocked,
  IUpdateArtLevel
} from 'reduxState/interfaces/drivers';
import CollapsibleComponent from 'components/CommonComponents/Containers/CollapsibleComponent';
import ClosedUnlinkedImagePanel
  from 'components/CommonComponents/ImagePanels/ClosedUnlinkedImagePanel';
import DADetails from './DriverArtDetailsComponents/DADetails';
import { IDriverArts } from 'interfaces';

interface IDispatchProps {
  saveDriverArtLevel: (payload: IUpdateArtLevel[]) => void,
  updateDriverArtLevelUnlocked: (payload: IDriverArtUpdateLevelUnlocked) => void
}

interface IProps {
  driverId:number;
  driverArts: IDriverArts[];
}

export const DriverArtsListComponentView = (props:IProps & IDispatchProps) => {
  const [uniqueWeapons, setUniqueWeapons] = useState([] as string[]);
  const [focused, setFocused] = useState('');
  const toUpdate = useRef([] as IUpdateArtLevel[]);

  useEffect(() => {
    if(props.driverArts.length > 0){
      let completeWeaponTypeList = props.driverArts.map((details) => details.weaponType);
      setUniqueWeapons([...completeWeaponTypeList.filter(
        (weapon:string, index:number) => completeWeaponTypeList.indexOf(weapon) === index)]);
    }
  }, [props.driverArts])

  useEffect(() => {
    return () => {
      if (toUpdate.current) {
        props.saveDriverArtLevel(toUpdate.current)
      }
    }
  }, [])

  const updateArtLevel = (artId:number, newLevel:number) => {
    const artList = props.driverArts
      .find((artList) => artList.id === artId);
    if (artList) {
      toUpdate.current = toUpdate.current.filter((art) => art.id !== artId)
        .concat({id: artId, levelUnlocked: newLevel})
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
