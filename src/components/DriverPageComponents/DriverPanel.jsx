import React from 'react';

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

export default DriverPanel;