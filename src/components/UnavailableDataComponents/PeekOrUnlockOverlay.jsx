import React from 'react';

function PeekOrUnlockOverlay(props){
    return(
        <div className="overlay">
            <img className="peek-unlock-button" src="/images/helper/peek.png" alt="peek" onClick={() => props.toggleShow(props.name)}/>
            <img className="peek-unlock-button" src="/images/helper/openLock.png" alt="unlock" onClick={() => props.updateGameState(props.id)}/>
        </div>
    )
}

export default PeekOrUnlockOverlay