import React from 'react';

function OpenDAPanelMinimal(props){
    return (
        <div className="col-sm-3">
            <div className="titled-image-panel">
                <img src={"/images/weaponType/"+props.name.replace(/\s+/g, '')+".jpeg"} alt={props.name} className="weapon-class-image"/>
                <div className="titled-image-name">{props.name}</div>
            </div>
        </div>
    )
};

export default OpenDAPanelMinimal;