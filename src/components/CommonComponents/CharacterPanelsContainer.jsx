import React from 'react';

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
        <div className="collapsible-container">
            <h2 className="container-header">
                {props.title}
            </h2>
            <div className="container-contents">
                {contents !== [] ? contents.map(content => content) : <div/>}
            </div>
        </div>
    )
};

export default CharacterPanelContainer;