import React, { useState } from 'react';
import PropTypes from 'prop-types';

function CollapsibleComponent (props) {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);
    return (
    <div className="collapsible-container">
        <h2 className="container-header" onClick={toggle}>
            {props.header}
        </h2>
        {isOpen ?
            <div /> :
            <div className="container-contents">
                {props.children}
            </div>
        }
    </div>
    )
};

CollapsibleComponent.propTypes = {
    header: PropTypes.string
}

export default CollapsibleComponent;