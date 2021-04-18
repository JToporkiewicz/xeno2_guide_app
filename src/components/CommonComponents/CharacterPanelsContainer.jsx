import React from 'react';
import PropTypes from 'prop-types';
import CollapsibleComponent from './CollapsibleComponent';
import {SeparateChildrenIntoRows} from '../CommonFunctions';

function CharacterPanelContainer(props){

    var contents = SeparateChildrenIntoRows(props.children);

    return (
        <CollapsibleComponent header={props.title}>
            {contents !== [] ? contents.map(content => content) : <div/>}
        </CollapsibleComponent>
    )
};

CharacterPanelContainer.propTypes = {
    title: PropTypes.string
};

export default CharacterPanelContainer;