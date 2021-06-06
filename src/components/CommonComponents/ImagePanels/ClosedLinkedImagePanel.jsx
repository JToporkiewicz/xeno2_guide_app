import React from 'react';
import { Link } from "react-router-dom";
import ContentsOfImagePanel from './ContentsOfImagePanel';

function ClosedLinkedImagePanel(props){
    return (
        <div className="col-sm-3 stretched-sibling-panels">
                <Link to={"/"+ props.panelType +"/"+props.id} className="titled-image-name">
                    <ContentsOfImagePanel {...props} />
                </Link>
        </div>
    )
};

export default ClosedLinkedImagePanel;