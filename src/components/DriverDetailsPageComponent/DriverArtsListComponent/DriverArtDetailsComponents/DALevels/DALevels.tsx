import { useState, useEffect } from 'react';
import UnlockOverlay from '../../../../UnavailableDataComponents/Overlays/UnlockOverlay';
import LockOverlay from '../../../../UnavailableDataComponents/Overlays/LockOverlay';
import {
  IDriverArtNode,
  IDriverArtsState
} from '../../../../../redux/interfaces/reduxState';

const getImage = (artName:string) => {
  try {
    require(`../../../../../../public/images/driverArt/${artName.trim().replace(/\s+/g, '')}.png`)
    return <img
      alt={artName}
      src={`/images/driverArt/${artName.trim().replace(/\s+/g, '')}.png`}
      className="art-icon"
    />
  }
  catch {
    return <img alt="unknown art" src="/images/helper/Unknown.png" className="art-icon"/>
  }
}

interface IOwnProps {
  art:IDriverArtsState,
  updateArtLevel:(artId:number, level:number) => void
}

export const DALevelsView = (props:IOwnProps) => {
  const [driverArtDetails, setDADetails] = useState([] as IDriverArtNode[]);
  const [totalSP, setSP] = useState(0);
  const [remainingSP, setRemainingSP] = useState(0);


  useEffect(() => {
    setDADetails(props.art ? props.art.nodes : [])
  }, [props.art]);

  useEffect(() => {
    if(driverArtDetails[0]?.id !== undefined){
      let SP = 0;
      let remainingSP = 0;
      for(let i = 0; i < driverArtDetails.length; i++){
        SP = SP + driverArtDetails[i].SP
        if(i >= props.art.levelUnlocked){
          remainingSP = remainingSP + driverArtDetails[i].SP
        }
      }
      setSP(SP);
      setRemainingSP(remainingSP);
    }
  }, [driverArtDetails])

  return (
    <div>
      <div className="row">
        {getImage(props.art.name)}
        {driverArtDetails !== undefined ?
          Object.values(driverArtDetails).map((level, key) => 
            key < props.art.levelUnlocked ? 
              <div
                className={`art-detail-node ${key + 1 === props.art.levelUnlocked ?
                  ' focused-panel'
                  : ''}`}
                key={key}>
                <div className="full-width">
                  {key !== 0 ? 
                    <LockOverlay
                      id={key}
                      updateGameState={()=>props.updateArtLevel(props.art.id, key)}
                    />
                    : <div/>}
                  <b>Level {key < 5 ? key+1 : '5 Max Affinity'}</b><br/>
                  {`Dmg: ${level.Damage}`}<br/>
                  {level.EffectPotency !== '' ? <>{`Effect: ${level.EffectPotency}`}<br/></> : ''}
                  {`Recharge: ${level.Recharge}`}
                </div>
                
              </div>
              : <div className="art-detail-node" key={key}>
                <div className="full-width">
                  <UnlockOverlay 
                    id={key+1}
                    updateGameState={()=>props.updateArtLevel(props.art.id, key+1)}
                  />
                  <img src="/images/helper/closedLock.svg" alt="lock" className="centered-lock"/>
                            Cost: {level.SP}SP
                </div>
              </div>
          )
          : <div/>
        }

      </div>
      <div>
                Total SP: {totalSP} 
        <span className="align-right">Remaining SP: {remainingSP} </span>
      </div>
    </div>
  )
}
