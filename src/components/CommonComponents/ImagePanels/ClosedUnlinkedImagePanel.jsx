import React from 'react';
import ContentsOfImagePanel from './ContentsOfImagePanel';

function ClosedUnlinkedImagePanel(props){
    return (
        <div className="col-sm-3 stretched-sibling-panels">
            <ContentsOfImagePanel {...props} />
        </div>
    )
};

export default ClosedUnlinkedImagePanel;