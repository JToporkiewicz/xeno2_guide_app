import React from 'react';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";

function DriverPanel(props){
    return (
        <div className="col-sm-3">
            <img src={"images/drivers/"+props.name+".jpeg"} alt={props.name} className="character-image"/>
            <Link to={"/driver/"+props.id} className="character-name">
                {props.name}
            </Link>
        </div>
    )
};

DriverPanel.propTypes = {
    name: PropTypes.string,
    id: PropTypes.number
};

DriverPanel.defaultProps = {
    name: 'N/A',
    id: 0
};

export default DriverPanel;