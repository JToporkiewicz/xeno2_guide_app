import React from 'react';

function LockOverlay(props){
    return(
        <div className="overlay">
            <img className="centered-image" src="/images/helper/closedLock.png" alt="lock" onClick={() => props.updateGameState(props.id)}/>
        </div>
    )
}

export default LockOverlay