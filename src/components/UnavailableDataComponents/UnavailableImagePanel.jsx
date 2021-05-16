import React from 'react';
import PeekOrUnlockOverlay from './PeekOrUnlockOverlay';

function UnavailableImagePanel(props){
    return (
        <div className="col-sm-3">
            <div className="image-panel">
                <PeekOrUnlockOverlay
                    toggleShow={props.toggleShow}
                    updateGameState={props.updateGameState}
                    name={props.name}
                    id={props.id} />
                <img
                    src={"/images/Unknown.png"}
                    alt={"Unknown"}
                    className={props.panelType === "weaponType" ? "weapon-class-image" : "character-image"}/>
                <div className="image-name">Spoiler</div>
            </div>
        </div>
    )
};

export default UnavailableImagePanel;