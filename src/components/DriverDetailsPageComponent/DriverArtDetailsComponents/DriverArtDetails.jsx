import React from 'react';
import DriverArtDetailsHeader from './DriverArtDetailsHeader';
import DriverArtLevels from './DriverArtLevels';

function DriverArtDetails(props){

    return(
        <div className="art-details-panel">
            <DriverArtDetailsHeader weapon={props.weapon} clearArt={props.clearArt} />
            <hr/>
            {
                Object.values(props.weaponArts).map((art) => 
                    <div>
                        <b>{art.Name}</b>
                        <DriverArtLevels {...art} />
                        <br/>
                    </div>
                )
            }
        </div>
    )
};

export default DriverArtDetails;