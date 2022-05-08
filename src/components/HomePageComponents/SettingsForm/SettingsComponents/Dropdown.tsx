interface IProps {
    title:string,
    settingKey:string,
    currentValue:string,
    values:string[],
    updateCurrentValue:(value:string) => void
}

const Dropdown = (props:IProps) => {
  return(
    <div className="row setting-row">
      <div className="col-md-5 settings-names">
        {props.title}
      </div>
      <div className="col-md-7 dropdown-layout">
        <select
          id={props.settingKey}
          value={props.currentValue}
          onChange={() => props.updateCurrentValue(props.settingKey)}>
          {props.values.map((value) => <option key={value} value={value}>{value}</option>)}
        </select>
      </div>
    </div>
  )
}

export default Dropdown