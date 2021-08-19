import React from 'react';
import PeekOrUnlockOverlay from '../Overlays/PeekOrUnlockOverlay';

function SmallUnavailableImagePanel(props){
    return (
        <div className="small-image-panel">
            <PeekOrUnlockOverlay
                toggleShow={props.toggleShow}
                updateState={props.updateState}
                name={props.name}
                id={props.id} />
            <img
                src={"/images/helper/Unknown.png"}
                alt={"Unknown"}
                className="small-image"/>
        </div>
    )
};

export default SmallUnavailableImagePanel;