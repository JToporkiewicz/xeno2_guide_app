import React, { useState } from 'react';
import PropTypes from 'prop-types';

function InnerCollapsibleComponent (props) {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);
    return (
    <div className="inner-collapsible-container">
        <div className="inner-container-header" onClick={toggle}>
            <img
                src={`/images/helper/${isOpen ? "collapse" : "expand"}.png`}
                alt={isOpen ? "collapse" : "expand"}
                className="small-collapse-expand"
            />
            <b>{props.header}</b>
        </div>
        {isOpen ?
            <div className="inner-container-contents">
                {props.children}
            </div>
            :
            <div/>}
    </div>
    )
};

InnerCollapsibleComponent.propTypes = {
    header: PropTypes.string
}

export default InnerCollapsibleComponent;