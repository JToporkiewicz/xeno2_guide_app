import { useState } from 'react'

interface IProps {
  lowestNumber: number,
  topNumber: number,
  selectedNumber: number,
  disabled?:boolean,
  onClick: (payload:number) => void
}

export const NumberSlider = (props:IProps) => {
  const [hoverNumber, setHoverNumber] = useState(props.selectedNumber)

  return <div className={`row number-slider ${props.disabled ? 'disabled' : ''}`}>
    <b>{props.lowestNumber}</b>
    {Array.from(
      Array(props.topNumber - props.lowestNumber + 1)
        .fill(0)
        .map((_, index) => index + props.lowestNumber)
    ).map((index) => 
      <div
        key={index}
        className={`number-slider-node ${
          index < hoverNumber ? 'active' : ''}`}
        onClick={() => props.disabled !== true ? props.onClick(index) : {}}
        onMouseEnter={() => props.disabled !== true ? setHoverNumber(index) : {}}
        onMouseLeave={() => props.disabled !== true ? setHoverNumber(props.selectedNumber) : {}}
      >
        {index === hoverNumber && <div className="number-slider-node-current" />}
      </div>
    )}
    <b>{props.topNumber}</b>
  </div>
}