interface IProps {
    settingKey:string,
    currentValue:string,
    values:string[],
    updateCurrentValue:(value:string) => void
}

const Dropdown = (props:IProps) => {
  return(
    <select
      id={props.settingKey}
      value={props.currentValue}
      onChange={() => props.updateCurrentValue(props.settingKey)}>
      {props.values.map((value) => <option key={value} value={value}>{value}</option>)}
    </select>
  )
}

export default Dropdown