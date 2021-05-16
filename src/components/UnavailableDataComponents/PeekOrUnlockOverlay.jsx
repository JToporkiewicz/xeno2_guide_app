import React from 'react';

function PeekOrUnlockOverlay(props){
    return(
        <div className="overlay">
            <img className="peek-unlock-button" src="images/peek.png" alt="peek" onClick={() => props.toggleShow(props.name)}/>
            <img className="peek-unlock-button" src="images/openLock.png" alt="unlock"/>
        </div>
    )
}

export default PeekOrUnlockOverlay