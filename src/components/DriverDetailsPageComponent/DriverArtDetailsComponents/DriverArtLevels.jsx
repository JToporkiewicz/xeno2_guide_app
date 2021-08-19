import React, { useState, useEffect } from 'react';
import client from '../../../api-client';
import UnlockOverlay from '../../UnavailableDataComponents/Overlays/UnlockOverlay';
import LockOverlay from '../../UnavailableDataComponents/Overlays/LockOverlay';

async function getDriverArtDetails(artId, setDriverArtDetails) {
    try {
        let response = [];
        for (let i = artId; i < artId+6; i++){
            response = [...response, await client.resource('driverArtDetails').get(i)];
        }
        setDriverArtDetails(response);
    }
    catch(err) {
        console.log(`Error: ${err}`);
    }
};

async function updateDetail(artId, newLevel){
    try {
        await client.resource('driverArt').update(artId, {LevelUnlocked: newLevel})
    }
    catch(err){
        console.log(`Error: ${err}`)
    }
}

function getImage(artName) {
    try {
        require(`../../../../public/images/driverArt/${artName.trim().replace(/\s+/g, '')}.png`)
        return <img alt={artName} src={`/images/driverArt/${artName.trim().replace(/\s+/g, '')}.png`} className="art-icon"/>
    }
    catch {
        return <img alt="unknown art" src="/images/helper/Unknown.png" className="art-icon"/>
    }
}

function DriverArtLevels(props) {
    const [driverArtDetails, setDriverArtDetails] = useState([]);
    const [unlockedLevel, setUnlockedLevel] = useState(props.LevelUnlocked);
    const [totalSP, setSP] = useState(0);
    const [remainingSP, setRemainingSP] = useState(0);

    useEffect(() => {
        getDriverArtDetails(props.Level1, setDriverArtDetails)
    }, [props.Level1]);

    useEffect(() => {
        if(driverArtDetails[0]?.id !== undefined){
            let SP = 0;
            let remainingSP = 0;
            for(let i = 0; i < driverArtDetails.length; i++){
                SP = SP + driverArtDetails[i].SP
                if(i >= unlockedLevel){
                    remainingSP = remainingSP + driverArtDetails[i].SP
                }
            }
            setSP(SP);
            setRemainingSP(remainingSP);
        }
    }, [driverArtDetails, unlockedLevel])

    function updateArtLevel(newLevel){
        setUnlockedLevel(newLevel)
        updateDetail(props.id, newLevel)
    }

    return (
        <div>
            <div className="row">
                {getImage(props.Name)}
                {driverArtDetails !== undefined ?
                    Object.values(driverArtDetails).map((level, key) => 
                        key < unlockedLevel ? 
                            <div className={`art-detail-node ${key+1 === unlockedLevel ? " focused-panel" : ""}`}>
                                {key !== 0 ? 
                                    <LockOverlay
                                        id={key}
                                        updateGameState={updateArtLevel.bind(this)}
                                    />
                                : <div/>}
                                <b>Level {key < 5 ? key+1 : "5 Max Affinity"}</b><br/>
                                {"Dmg: " + level.Damage}<br/>
                                {level.EffectPotency !== '' ? <>{"Effect: " + level.EffectPotency}<br/></> : ''}
                                {"Recharge: " + level.Recharge}
                            </div>
                        : <div className="art-detail-node">
                            <UnlockOverlay 
                                id={key+1}
                                updateGameState={updateArtLevel.bind(this)}
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

export default DriverArtLevels;