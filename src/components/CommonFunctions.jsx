import React from 'react';

export function SeparateChildrenIntoRows(children){
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
};