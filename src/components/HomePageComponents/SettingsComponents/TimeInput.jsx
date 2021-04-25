import React from 'react';

function TimeInput(props){
    return(
    <div className="row setting-row">
        <div className="col-md-5 settings-names">
            {props.title}
        </div>
        <div className="col-md-7">
            <input
            type="time"
            id={props.settingKey}
            className="form-control"
            defaultValue={props.value}
            required
            onChange={() => props.updateTime(props.settingKey)}
            />
        </div>
    </div>
    )
}

export default TimeInput;