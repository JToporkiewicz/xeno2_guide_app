import React from 'react';
import DriverArtDetailsHeader from './DriverArtDetailsHeader';

function DriverArtDetails(props){

    return(
        <div className="art-details-panel">
            <DriverArtDetailsHeader weapon={props.weapon} clearArt={props.clearArt} />
            <hr/>
            {props.weaponArts.map(art => (art.Name))}

        </div>
    )
};

export default DriverArtDetails;