import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import client from '../../../api-client';
import SmallUnavailableImagePanel from '../../UnavailableDataComponents/SmallUnavailableImagePanel'

async function findBladesByWeapon(weaponType, setBlades){
    try {
        const response = await client.resource('blade').find({Weapon: weaponType});
        setBlades([...response]);
    }
    catch(err) {
        console.log(`Error: ${err}`);
    }
};

async function fetchProgress(setSettings){
    try {
        const response = await client.resource('storyProgress').get(1);
        setSettings(response);
    }
    catch(err) {
        console.log(`Error: ${err}`);
    }
};

function DriverArtDetailsHeader(props){
    const [blades, setBlades] = useState([]);
    const [progress, setProgress] = useState([]);
    const [bladesList, setBladeList] = useState([]);

    useEffect(() => {
        findBladesByWeapon(props.weapon, setBlades);
        fetchProgress(setProgress);
    }, [props.weapon]);

    useEffect(() => {
        if(blades !== undefined && progress !== undefined){

            function updateShow(blade){
                setBlades(blades.map((b) => (b.Name === blade ? {...b, "Show": !b.Show} : b)))
            }

            function updateBladeAvailability(entryId){
                client.resource("blade").update(entryId, {Available: true})
            }

            setBladeList(    
                blades.map((blade) =>
                (progress.OnlyShowAvailable || 
                    (blade.Available || blade.Show) ? 
                    <Link to={"/blade/"+blade.id} className="small-image-panel">
                        <img
                            src={"/images/blade/"+blade.Name.replace(/\s+/g, '')+".jpeg"}
                            alt={blade.Name}
                            className="small-image"
                        />
                    </Link>
                 :
                    <SmallUnavailableImagePanel
                    name={blade.Name}
                    panelType="driver"
                    id={blade.id}
                    toggleShow={updateShow.bind(this)}
                    updateState={updateBladeAvailability.bind(this)}
                    key={blade.Name}
                    />
                ))
            )
        }
    }, [blades, progress])

    return(
        <div className="art-details-header">
            <img
                src={"/images/weaponType/"+props.weapon.replace(/\s+/g, '')+".jpeg"}
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

export default DriverArtDetailsHeader;