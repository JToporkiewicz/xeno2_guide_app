import { useState, useEffect } from 'react';
import client from '../../../api-client';
import UnlockOverlay from '../../UnavailableDataComponents/Overlays/UnlockOverlay';
import LockOverlay from '../../UnavailableDataComponents/Overlays/LockOverlay';
import { IDriverArtDetails } from '../../../interfaces';

const getDADetails = async (artId:number, setDADetails:(arts:IDriverArtDetails[]) => void) => {
  try {
    let response = [] as IDriverArtDetails[];
    for (let i = artId; i < artId+6; i++){
      response = [...response, await client.resource('driverArtDetails').get(i)];
    }
    setDADetails(response);
  }
  catch(err) {
    console.log(`Error: ${err}`);
  }
};

const getImage = (artName:string) => {
  try {
    require(`../../../../public/images/driverArt/${artName.trim().replace(/\s+/g, '')}.png`)
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

interface IProps {
    id:number,
    Name:string,
    LevelUnlocked:number,
    Level1:number
    updateArtLevel:(artId:number, level:number) => void
}

const DALevels = (props:IProps) => {
  const [driverArtDetails, setDADetails] = useState([] as IDriverArtDetails[]);
  const [totalSP, setSP] = useState(0);
  const [remainingSP, setRemainingSP] = useState(0);

  useEffect(() => {
    getDADetails(props.Level1, setDADetails)
  }, [props.Level1, props.LevelUnlocked]);

  useEffect(() => {
    if(driverArtDetails[0]?.id !== undefined){
      let SP = 0;
      let remainingSP = 0;
      for(let i = 0; i < driverArtDetails.length; i++){
        SP = SP + driverArtDetails[i].SP
        if(i >= props.LevelUnlocked){
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
        {getImage(props.Name)}
        {driverArtDetails !== undefined ?
          Object.values(driverArtDetails).map((level, key) => 
            key < props.LevelUnlocked ? 
              <div
                className={`art-detail-node ${key+1 === props.LevelUnlocked ?
                  ' focused-panel'
                  : ''}`}
                key={key}>
                {key !== 0 ? 
                  <LockOverlay
                    id={key}
                    updateGameState={()=>props.updateArtLevel(props.id, key)}
                  />
                  : <div/>}
                <b>Level {key < 5 ? key+1 : '5 Max Affinity'}</b><br/>
                {`Dmg: ${level.Damage}`}<br/>
                {level.EffectPotency !== '' ? <>{`Effect: ${level.EffectPotency}`}<br/></> : ''}
                {`Recharge: ${level.Recharge}`}
              </div>
              : <div className="art-detail-node" key={key}>
                <UnlockOverlay 
                  id={key+1}
                  updateGameState={()=>props.updateArtLevel(props.id, key+1)}
                />
                <img src="/images/helper/closedLock.png" alt="lock" className="centered-lock"/>
                            Cost: {level.SP}SP
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

export default DALevels;