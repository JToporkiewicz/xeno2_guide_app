import path from 'path';
import { ReactElement, useEffect, useState } from 'react';

interface States {
  text: string,
  imgName?: string,
  active: boolean
}

interface IProps {
  title?: string,
  available: boolean,
  hideAvailable?:boolean,
  unlocked?: boolean,
  states?:States[],
  link?: ReactElement,
  onClick:(payload:boolean | string) => void,
  size?:'large' | 'small'
}

const Option = (props: {
  state:States,
  setStatesOpen:(isOpen:boolean) => void,
  onClick:(payload:boolean | string) => void,
  size?:'large' | 'small'
}) => {
  return <div
    className={`${props.size === 'small' ? 'small' : 'large'}-unlock-button hover-version`}
    onClick={() => {
      props.setStatesOpen(false)
      props.onClick(props.state.text)
    }}
  >
    {
      props.state.imgName ?
        <img
          src={path.resolve(`images/helper/${props.state.imgName}.svg`)}
          alt={props.state.text}
          className="unlock-button-image"
        />
        : <div />
    }
  </div>
}

export const OptionsCheckbox = (props:IProps) => {
  const [statesOpen, setStatesOpen] = useState(false);
  const activeState = props.states?.find((option) => option.active);

  useEffect(() => {
    if (!props.available && statesOpen) {
      setStatesOpen(false)
    }
  }, [props.available])

  return <div className="details-unlock-section">
    {props.title &&
      <>
        <b>{props.title}</b>
        <br/>
      </>
    }
    <div
      className={`${props.size === 'small' ? 'small' : 'large'}-unlock-button${!props.available ?
        ' disabledButton' : ''}`}
      onClick={() => props.available ?
        props.states?.length ?
          setStatesOpen(!statesOpen)
          : props.onClick(!props.unlocked)
        : {}}
    >
      {props.unlocked &&
        <img
          src={path.resolve('images/helper/Checkmark.svg')}
          alt={'Unlock'}
          className="unlock-button-image"
        />
      }
      {
        activeState && activeState.imgName &&
          <img
            src={path.resolve(`images/helper/${activeState.imgName}.svg`)}
            alt={activeState.text}
            className="unlock-button-image"
          />
      }
      {
        props.states && statesOpen &&
        <div className='hover-options'>
          {props.states.map((option) => {
            return <Option
              state={option}
              setStatesOpen={setStatesOpen}
              onClick={props.onClick}
              size={props.size}
            />
          })}
        </div>
      }
    </div>
    {props.link}
    {!props.hideAvailable &&
      <div>Available: {props.available ? 'Yes' : 'No'}</div>
    }
  </div>
}