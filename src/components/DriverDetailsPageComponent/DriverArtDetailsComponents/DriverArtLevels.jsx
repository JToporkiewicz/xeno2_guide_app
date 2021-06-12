import React, { useState, useEffect } from 'react';
import client from '../../../api-client';
import PeekOrUnlockOverlay from '../../UnavailableDataComponents/PeekOrUnlockOverlay';

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

function DriverArtLevels(props) {
    const [driverArtDetails, setDriverArtDetails] = useState([]);
    const [unlockedLevel, setUnlockedLevel] = useState(props.LevelUnlocked)

    useEffect(() => {
        getDriverArtDetails(props.Level1, setDriverArtDetails)
    }, [props.Level1]);

    function updateLevel(newLevel){
        setUnlockedLevel(newLevel)
    }

    function updateArtLevel(newLevel){
        updateDetail(props.id, newLevel)
    }

    return (
        <div className="row">
            <img src="/images/Unknown.png" className="art-icon"/>
            {driverArtDetails !== undefined ?
                Object.values(driverArtDetails).map((level, key) => 
                    key < unlockedLevel ? 
                        <div className={`art-detail-node ${key+1 === unlockedLevel ? " focused-panel" : ""}`}>
                            <b>Level {key < 5 ? key+1 : "5 Max Affinity"}</b><br/>
                            {"Damage: " + level.Damage}<br/>
                            {"Effect: " + level.EffectPotency}<br/>
                            {"Recharge: " + level.Recharge}
                        </div>
                    : <div className="art-detail-node">
                        <PeekOrUnlockOverlay 
                            name={key+1}
                            id={key+1}
                            toggleShow={updateLevel.bind(this)}
                            updateState={updateArtLevel.bind(this)}
                        />
                        <b>Level {key < 5 ? key+1 : "5 Max Affinity"}</b><br/>
                        LOCKED
                    </div>
                )
                : <div/>
            }
        </div>
    )
}

export default DriverArtLevels;