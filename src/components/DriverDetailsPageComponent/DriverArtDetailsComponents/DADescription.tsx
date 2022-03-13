import { useState } from 'react';

interface IProps {
  Target:string,
  Type:string,
  Effect:string
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
              src="/images/helper/Up.svg"
              alt="collapse"
              className="collapse-expand"
            />
          </div>
          <b>Target:</b> {props.Target}<br/>
          <b>Type:</b> {props.Type}<br/>
          <b>Effects:</b>
          <ul>
            {Object.values(JSON.parse(props.Effect)).map((effect:any) =>
              <li key={effect}>{effect}</li>)
            }
          </ul>
        </>
        :
        <div
          onClick={() => toggleCollapse()}
        >
          <img
            src="/images/helper/Down.svg"
            alt="expand"
            className="collapse-expand"
          />
        </div>
      }

    </div>
  )
}

export default DADescription