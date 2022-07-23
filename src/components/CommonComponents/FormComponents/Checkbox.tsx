interface IProps {
    value:boolean,
    toggleValue:(value:boolean) => void
}
const Checkbox = (props:IProps) => {
  return(
    <input
      type="checkbox"
      checked={props.value}
      onChange={() => props.toggleValue(props.value)}
      className="checkbox-layout"
    />
  )
}

export default Checkbox;