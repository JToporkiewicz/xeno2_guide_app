import React from 'react';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";

function OpenDriverPanel(props){
    return (
        <div className="col-sm-3">
            <div className="titled-image-panel">
                <img src={"images/driver/"+props.name+".jpeg"} alt={props.name} className="character-image"/>
                <Link to={"/driver/"+props.id} className="titled-image-name">
                    {props.name}
                </Link>
            </div>
        </div>
    )
};

OpenDriverPanel.propTypes = {
    name: PropTypes.string,
    id: PropTypes.number
};

OpenDriverPanel.defaultProps = {
    name: 'N/A',
    id: 0
};

export default OpenDriverPanel;