import path from 'path';

interface IProps {
    value:number,
    minimum:number,
    maximum?:number,
    updateValue:(value:number) => void,
}
const IncrementDecrementNumber = (props:IProps) => {
  return(
    <div className="row">
      {props.value > props.minimum ? 
        <img
          src={path.resolve('images/helper/FormMinus.svg')}
          alt="-"
          className="increment-decrement-button"
          onClick={() => props.updateValue(props.value - 1)}/>
        : <span className="increment-decrement-button" />}

      <span className="form-number">{props.value}</span>

      {!props.maximum || props.value < props.maximum ? 
        <img 
          src={path.resolve('images/helper/FormPlus.svg')}
          alt="+"
          className="increment-decrement-button"
          onClick={() => props.updateValue(props.value + 1)}/>
        : <span className="increment-decrement-button" />}
    </div>
  )
}

export default IncrementDecrementNumber