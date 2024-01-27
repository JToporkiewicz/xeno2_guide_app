import path from 'path';

interface IProps {
    value:number,
    minimum:number,
    maximum?:number,
    required?:number,
    disabled?:boolean,
    updateValue:(value:number) => void,
}
const IncrementDecrementNumber = (props:IProps) => {
  return(
    <div className="row">
      {props.value > props.minimum ? 
        <img
          src={path.resolve('images/helper/FormMinus.svg')}
          alt="-"
          className={`increment-decrement-button${props.disabled ?
            ' not-unlocked' : ''}`}
          onClick={() => !props.disabled && props.updateValue(props.value - 1)}/>
        : <span className="increment-decrement-button" />}

      <span className="form-number">
        <input
          type='text'
          pattern='[0-9]+'
          value={props.value}
          disabled={props.disabled || false}
          size={2}
          onChange={(e) => {
            props.updateValue(!props.maximum
              || Number(e.target.value) <= props.maximum ? Number(e.target.value) : props.maximum)
          }}
        />
        {props.required ? <>/{props.required}</>
          : props.maximum && <>/{props.maximum}</>}
      </span>

      {!props.maximum || props.value < props.maximum ? 
        <img 
          src={path.resolve('images/helper/FormPlus.svg')}
          alt="+"
          className={`increment-decrement-button${props.disabled ?
            ' not-unlocked' : ''}`}
          onClick={() => !props.disabled && props.updateValue(props.value + 1)}/>
        : <span className="increment-decrement-button" />}
    </div>
  )
}

export default IncrementDecrementNumber