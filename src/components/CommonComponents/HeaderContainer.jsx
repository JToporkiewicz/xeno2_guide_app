import React from 'react';
import PropTypes from 'prop-types';

function HeaderContainer(props){
    return(
        <div className="header collapsible-container">
            <h1>{props.title}</h1>
            <h3>{props.subtitle}</h3>
        </div>
    )
};

HeaderContainer.propTypes = {
    title: PropTypes.string,
    subtitle: PropTypes.string
};

export default HeaderContainer;