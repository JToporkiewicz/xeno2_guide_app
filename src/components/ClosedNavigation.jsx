import React from 'react';

function ClosedNavigation(props){
    return(
        <img className="closed-navigation" src="/images/closedMenu.png" alt="menu" onClick={() => props.toggleNavigation()}/>
    )
}

export default ClosedNavigation;