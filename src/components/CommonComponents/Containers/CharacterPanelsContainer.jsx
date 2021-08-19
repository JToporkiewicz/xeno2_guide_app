import React from 'react';
import PropTypes from 'prop-types';
import CollapsibleComponent from './CollapsibleComponent';

function CharacterPanelContainer(props){

    return (
        <CollapsibleComponent header={props.title}>
            {props.children.length > 0 ?
            <div className="row">
                {props.children}
            </div>
            : <div/>
            }
        </CollapsibleComponent>
    )
};

CharacterPanelContainer.propTypes = {
    title: PropTypes.string
};

export default CharacterPanelContainer;