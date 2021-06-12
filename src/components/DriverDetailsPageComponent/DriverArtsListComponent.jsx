import React, { useState, useEffect } from 'react';
import client from '../../api-client';
import CollapsibleComponent from '../CommonComponents/CollapsibleComponent';
import {SeparateChildrenIntoRows} from '../CommonFunctions';
import ClosedUnlinkedImagePanel from '../CommonComponents/ImagePanels/ClosedUnlinkedImagePanel';
import DriverArtDetails from './DriverArtDetailsComponents/DriverArtDetails';

async function getDriverArts (setArts, driverId) {
    try {
        const response = await client.resource('driverArt').find({Driver: driverId});
        setArts(response);
    }
    catch(err) {
        console.log(`Error: ${err}`);
    }
};

function DriverArtsListComponent (props) {
    const [driverArts, setArts] = useState([]);
    const [uniqueWeapons, setUniqueWeapons] = useState([]);
    const [focused, setFocused] = useState("");

    useEffect(() => {
        if(props.driverId){
            getDriverArts(setArts, props.driverId);
        }
    }, [props.driverId]);

    useEffect(() => {
        if(driverArts.length > 0){
            let completeWeaponTypeList = driverArts.map((details) => details.WeaponType);
            setUniqueWeapons([...new Set(completeWeaponTypeList)]);
        }
    }, [driverArts])

    function focusArt(art = ""){
        setFocused(art)
    }

    const weaponsPanels = [];
    uniqueWeapons.forEach((weapon) => (weaponsPanels.push(
        <ClosedUnlinkedImagePanel
            panelType="weaponType"
            name={weapon}
            focused={focused === weapon}
            focus={focusArt.bind(this)}
        />
    )))

    return (
        <CollapsibleComponent header={"Driver Arts"}>
            {focused.length > 0 ?
                <DriverArtDetails
                    clearArt={focusArt.bind(this)}
                    weapon={focused}
                    weaponArts={driverArts.filter((weapon) => weapon.WeaponType === focused)}/>
                : <div/>}
            {uniqueWeapons.length > 0 ?
                SeparateChildrenIntoRows(weaponsPanels).map(weapon => weapon)
            :
                <>Unknown</>
            }
        </CollapsibleComponent>
    )
};

export default DriverArtsListComponent;