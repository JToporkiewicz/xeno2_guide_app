interface IProps {
    title?:string,
    value:number,
    minimum:number,
    maximum?:number,
    updateValue:(value:number) => void,
}
const IncrementDecrementNumber = (props:IProps) => {
  return(
    <div className="row setting-row">
      {props.title &&
        <div className="col-md-5 settings-names">
          {props.title}
        </div>
      }
      <div className="col-md-7">
        {props.value > props.minimum ? 
          <img
            src="/images/helper/minus.png"
            alt="-"
            className="increment-decrement-button"
            onClick={() => props.updateValue(props.value - 1)}/>
          : <span className="increment-decrement-button" />}

        <span className="form-number">{props.value}</span>

        {!props.maximum || props.value < props.maximum ? 
          <img 
            src="/images/helper/plus.png"
            alt="+"
            className="increment-decrement-button"
            onClick={() => props.updateValue(props.value + 1)}/>
          : <span className="increment-decrement-button" />}
      </div>
    </div>
  )
}

export default IncrementDecrementNumber