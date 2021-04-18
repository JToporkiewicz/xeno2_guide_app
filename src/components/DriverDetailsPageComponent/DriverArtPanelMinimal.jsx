import React from 'react';

function DriverArtPanelMinimal(props){
    return (
        <div className="col-sm-3">
            <img src={"/images/weaponTypes/"+props.name.replace(/\s+/g, '')+".jpeg"} alt={props.name} className="weapon-class-image"/>
            <div className="character-name">{props.name}</div>
        </div>
    )
};

export default DriverArtPanelMinimal;