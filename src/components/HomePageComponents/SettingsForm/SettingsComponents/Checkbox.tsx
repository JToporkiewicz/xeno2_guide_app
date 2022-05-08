interface IProps {
    title:string,
    settingKey:string,
    value:boolean,
    toggleValue:(key:string, value:boolean) => void
}
const Checkbox = (props:IProps) => {
  return(
    <div className="row setting-row">
      <div className="col-md-5 settings-names">
        {props.title}
      </div>
      <div className="col-md-7 checkbox-layout">
        <span className="increment-decrement-button" />
        <input
          type="checkbox"
          checked={props.value}
          onChange={() => props.toggleValue(props.settingKey, props.value)}/>
      </div>
    </div>
  )
}

export default Checkbox;