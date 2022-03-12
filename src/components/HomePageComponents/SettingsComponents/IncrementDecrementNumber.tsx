interface IProps {
    title:string,
    value:number,
    minimum:number,
    maximum:number,
    settingKey:string,
    decreaseValue:(key:string, value:number) => void,
    increaseValue:(key:string, value:number) => void
}
const IncrementDecrementNumber = (props:IProps) => {
  return(
    <div className="row setting-row">
      <div className="col-md-5 settings-names">
        {props.title}
      </div>
      <div className="col-md-7">
        {props.value > props.minimum ? 
          <img
            src="/images/helper/minus.png"
            alt="-"
            className="increment-decrement-button"
            onClick={() => props.decreaseValue(props.settingKey, props.value)}/>
          : <span className="increment-decrement-button" />}

        <span className="form-number">{props.value}</span>

        {props.value < props.maximum ? 
          <img 
            src="/images/helper/plus.png"
            alt="+"
            className="increment-decrement-button"
            onClick={() => props.increaseValue(props.settingKey, props.value)}/>
          : <span className="increment-decrement-button" />}
      </div>
    </div>
  )
}

export default IncrementDecrementNumber