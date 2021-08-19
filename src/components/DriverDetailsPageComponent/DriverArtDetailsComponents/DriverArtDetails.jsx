import React, { useState } from 'react';
import DriverArtDetailsHeader from './DriverArtDetailsHeader';
import DriverArtLevels from './DriverArtLevels';
import DriverArtDescription from './DriverArtDescription';
import InnerCollapsibleComponent from '../../CommonComponents/Containers/InnerCollapsibleComponent';

function DriverArtDetails(props){
    const [open, setOpen] = useState([]);

    function toggleCollapse(key){
        console.log(open)
        if(!open.includes(key)){
            setOpen([...open, key])
        }
        else {
            setOpen(open.filter((i) => i !== key))
        }
    }
    return(
        <div className="art-details-panel">
            <DriverArtDetailsHeader weapon={props.weapon} clearArt={props.clearArt} />
            <hr/>
            {
                Object.values(props.weaponArts).map((art, key) => 
                    <InnerCollapsibleComponent header={art.Name}>
                        <>
                            <DriverArtLevels {...art} />
                            <DriverArtDescription {...art} />
                        </>
                    </InnerCollapsibleComponent>
                )
            }
        </div>
    )
};

export default DriverArtDetails;