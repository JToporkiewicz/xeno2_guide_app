import React from 'react';

function HeaderContainer(props){
    return(
        <div className="header collapsible-container">
            <h1>{props.title}</h1>
            <h3>{props.subtitle}</h3>
        </div>
    )
}

export default HeaderContainer;