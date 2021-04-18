import React from 'react';
import PropTypes from 'prop-types';

function HeaderContainer(props){
    return(
        <div className="header collapsible-container">
            <h1>{props.title}</h1>
            {props.subtitle !== "" ? 
                <h3>{props.subtitle}</h3>
                : <div />}
        </div>
    )
};

HeaderContainer.propTypes = {
    title: PropTypes.string,
    subtitle: PropTypes.string
};

HeaderContainer.defaultProps = {
    subtitle: ""
}

export default HeaderContainer;