import { useState, useEffect, ReactChild, useRef } from 'react';
import {
  IDriverArtUpdateLevelUnlocked,
  IUpdateArtLevel
} from 'reduxState/interfaces/drivers';
import CollapsibleComponent from 'components/CommonComponents/Containers/CollapsibleComponent';
import ClosedUnlinkedImagePanel
  from 'components/CommonComponents/ImagePanels/ClosedUnlinkedImagePanel';
import { DADetails } from './DriverArtDetailsComponents/DADetails';
import { IDriverArts } from 'interfaces';
import { getDACompletion } from 'helpers/completionPercentage';

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
  const [remainingSP, setRemainingSP] = useState(0);
  const [unlockedNodes, setUnlockedNodes] = useState(0);
  const [totalNodes, setTotalNodes] = useState(0);

  useEffect(() => {
    const artSP = props.driverArts.reduce((total: number, art: IDriverArts) => {
      if(art.nodes[0] !== undefined){
        let SP = 0;
        let remainingSP = 0;
        for(let i = 0; i < art.nodes.length; i++){
          SP = SP + art.nodes[i].sp
          if(i >= art.levelUnlocked){
            remainingSP = remainingSP + art.nodes[i].sp
          }
        }
        return total + remainingSP;
      }
      return total;
    }, 0)

    setRemainingSP(artSP);

    const nodesStats = getDACompletion(props.driverArts);
    setUnlockedNodes(nodesStats.unlocked);
    setTotalNodes(nodesStats.total);
  }, [props.driverArts])

  useEffect(() => {
    if(props.driverArts.length > 0){
      let completeWeaponTypeList = props.driverArts.map((details) => details.weaponType);
      setUniqueWeapons([...completeWeaponTypeList.filter(
        (weapon:string, index:number) => completeWeaponTypeList.indexOf(weapon) === index)]);
      
      const artSP = props.driverArts.reduce((total: number, art: IDriverArts) => {
        if(art.nodes[0] !== undefined){
          let SP = 0;
          let remainingSP = 0;
          for(let i = 0; i < art.nodes.length; i++){
            SP = SP + art.nodes[i].sp
            if(i >= art.levelUnlocked){
              remainingSP = remainingSP + art.nodes[i].sp
            }
          }
          return total + remainingSP;
        }
        return total;
      }, 0)
  
      setRemainingSP(artSP)
    }
  }, [props.driverArts])

  useEffect(() => {
    return () => {
      if (toUpdate.current.length > 0) {
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
  uniqueWeapons.forEach((weapon) => {
    const weaponArtProgress = getDACompletion(
      props.driverArts.filter((art) => art.weaponType === weapon));
    weaponsPanels.push(
      <ClosedUnlinkedImagePanel
        panelType="weaponType"
        name={weapon}
        focused={focused === weapon}
        focus={focusArt.bind(this)}
        key={weapon}
        progress={Math.round(weaponArtProgress.unlocked / weaponArtProgress.total * 10000) / 100}
      />
    )})

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
        <>
          <div>
            <div className='greyBar'>
              <div
                className='obtained'
                style={{
                  width: (unlockedNodes / totalNodes * 100).toPrecision(2) + '%'
                }}
              />
              <p>{Math.round(unlockedNodes / totalNodes * 10000)/100}%</p>
            </div>
            <span><b>Unlocked nodes: </b>{unlockedNodes} out of {totalNodes}</span>
          </div>
          <div>
            <b>Total remaining needed SP: </b>
            {remainingSP}
          </div>
          <div className="row centeredFlex">
            {weaponsPanels}
          </div>
        </>
        :
        <>Unknown</>
      }
    </CollapsibleComponent>
  )
};
