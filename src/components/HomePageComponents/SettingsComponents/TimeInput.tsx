interface IProps {
    title:string,
    settingKey:string,
    value:number,
    updateTime:(key:string) => void
}

const TimeInput = (props:IProps) =>{
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