import React from 'react';

function ContentsOfImagePanel(props){
    return (
        <div className="image-panel">
            <img
                src={"/images/"+ props.panelType +"/"+props.name.replace(/\s+/g, '')+".jpeg"}
                alt={props.name}
                className={props.panelType === "weaponType" ? "weapon-class-image" : "character-image"}/>
            <div className="image-name">{props.name}</div>
        </div>
    )
};

export default ContentsOfImagePanel;