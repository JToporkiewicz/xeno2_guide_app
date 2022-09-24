import { useState } from 'react';
import path from 'path';

interface IProps {
  target:string,
  type:string,
  effect:string[]
}

const DADescription = (props:IProps) => {
  const [open, setOpen] = useState(false);

  const toggleCollapse = () => {
    setOpen(!open)
  }

  return (
    <div className="art-description">
      {open ? 
        <>
          <div
            onClick={() => toggleCollapse()}
            className="expended-description-header"
          >
            <img
              src={path.resolve('images/helper/Up.svg')}
              alt="collapse"
              className="collapse-expand"
            />
          </div>
          <b>Target:</b> {props.target}<br/>
          <b>Type:</b> {props.type}<br/>
          <b>Effects:</b>
          <ul>
            {Object.values(props.effect).map((effect:any) =>
              <li key={effect}>{effect}</li>)
            }
          </ul>
        </>
        :
        <div
          onClick={() => toggleCollapse()}
        >
          <img
            src={path.resolve('images/helper/Down.svg')}
            alt="expand"
            className="collapse-expand"
          />
        </div>
      }

    </div>
  )
}

export default DADescription