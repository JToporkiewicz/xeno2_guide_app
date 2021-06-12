import React, { useState } from 'react';
import DriverArtDetailsHeader from './DriverArtDetailsHeader';
import DriverArtLevels from './DriverArtLevels';
import DriverArtDescription from './DriverArtDescription';

function DriverArtDetails(props){
    const [open, setOpen] = useState([]);

    function toggleCollapse(key){
        console.log(open)
        if(!open.includes(key)){
            setOpen([...open, key])
        }
        else {
            setOpen(open.filter((i) => i !== key))
        }
    }
    return(
        <div className="art-details-panel">
            <DriverArtDetailsHeader weapon={props.weapon} clearArt={props.clearArt} />
            <hr/>
            {
                Object.values(props.weaponArts).map((art, key) => 
                    <div>
                        <img
                            src={`/images/helper/${open.includes(key) ? "collapse" : "expand"}.png`}
                            alt={open ? "collapse" : "expand"}
                            onClick={() => toggleCollapse(key)}
                            className="small-collapse-expand"
                        />
                        <b className="art-name">{art.Name}</b>
                        {open.includes(key) ? 
                        <>
                            <DriverArtLevels {...art} />
                            <DriverArtDescription {...art} />
                        </> :
                        <div />
                        }
                        {key !== props.weaponArts.length-1 ? <hr /> : <div />}
                    </div>
                )
            }
        </div>
    )
};

export default DriverArtDetails;