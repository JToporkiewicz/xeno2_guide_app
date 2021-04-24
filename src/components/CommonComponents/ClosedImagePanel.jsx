import React from 'react';
import { Link } from "react-router-dom";

function ClosedImagePanel(props){
    return (
        <div className="col-sm-3">
            {props.linked ? 
                <Link to={"/"+ props.panelType +"/"+props.id} className="titled-image-name">
                    <div className="image-panel">
                        <img
                            src={"/images/"+ props.panelType +"/"+props.name.replace(/\s+/g, '')+".jpeg"}
                            alt={props.name}
                            className={props.panelType === "weaponType" ? "weapon-class-image" : "character-image"}/>
                        <div className="image-name">{props.name}</div>
                    </div>
                </Link>
            : 
            <div className="image-panel">
                <img
                    src={"/images/"+ props.panelType +"/"+props.name.replace(/\s+/g, '')+".jpeg"}
                    alt={props.name}
                    className={props.panelType === "weaponType" ? "weapon-class-image" : "character-image"}/>
                <div className="image-name">{props.name}</div>
            </div>
            }
        </div>
    )
};

export default ClosedImagePanel;