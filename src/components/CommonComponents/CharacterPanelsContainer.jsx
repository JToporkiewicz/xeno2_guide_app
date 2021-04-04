import React from 'react';
import CollapsibleComponent from './CollapsibleComponent';

function SeparateChildrenIntoRows(children){
    var contentsArray = React.Children.toArray(children);
    var contents = [];

    if(contentsArray.length > 0){
        for(var i = 0; i < contentsArray.length; i+=4){
            contents.push(
                <div className="row">
                    {i+4 > contentsArray ? contentsArray.slice(i) : contentsArray.slice(i, i+4)}
                </div>
            );
        }
    };
    
    return (contents);
}

function CharacterPanelContainer(props){

    var contents = SeparateChildrenIntoRows(props.children);

    return (
        <CollapsibleComponent header={props.title}>
            {contents !== [] ? contents.map(content => content) : <div/>}
        </CollapsibleComponent>
    )
};

export default CharacterPanelContainer;