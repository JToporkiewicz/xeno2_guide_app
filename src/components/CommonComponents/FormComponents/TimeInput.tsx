interface IProps {
    settingKey:string,
    value:number,
    updateTime:(key:string) => void
}

const TimeInput = (props:IProps) =>{
  return(
    <input
      type="time"
      id={props.settingKey}
      className="form-control"
      defaultValue={props.value}
      required
      onChange={() => props.updateTime(props.settingKey)}
    />
  )
}

export default TimeInput;