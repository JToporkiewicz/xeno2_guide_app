import React from 'react';
import PropTypes from 'prop-types';

function DriverPanel(props){
    return (
        <div className="col-sm-3">
            <div className="character-image">
            {props.image != null ? props.image : ''}
            </div>
            <div className="character-name">
                {props.name}
            </div>
        </div>
    )
};

DriverPanel.propTypes = {
    name: PropTypes.string
}

export default DriverPanel;