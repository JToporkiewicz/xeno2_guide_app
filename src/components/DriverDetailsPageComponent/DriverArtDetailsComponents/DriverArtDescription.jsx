import React, { useState } from 'react';

function DriverArtDescription(props){
    const [open, setOpen] = useState(false);

    function toggleCollapse(){
        setOpen(!open)
    }

    return (
        <div className="art-description">
            {open ? 
            <>
                Target: {props.Target}<br/>
                Type: {props.Type}<br/>
                Effects: 
                <ul>
                    {Object.values(JSON.parse(props.Effect)).map((effect) => <li>{effect}</li>)}
                </ul>
                <img
                    src="/images/helper/collapse.png"
                    alt="collapse"
                    onClick={() => toggleCollapse()}
                    className="collapse-expand"
                />
            </>
            :
            <img
                src="/images/helper/expand.png"
                alt="expand"
                onClick={() => toggleCollapse()}
                className="collapse-expand"
            />
            }

        </div>
    )
}

export default DriverArtDescription