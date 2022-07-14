interface IProps {
    title:string,
    value:boolean,
    toggleValue:(value:boolean) => void
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
          onChange={() => props.toggleValue(props.value)}/>
      </div>
    </div>
  )
}

export default Checkbox;