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
          <b>Target:</b> {props.Target}<br/>
          <b>Type:</b> {props.Type}<br/>
          <b>Effects:</b>
          <ul>
            {Object.values(JSON.parse(props.Effect)).map((effect:any) =>
              <li key={effect}>{effect}</li>)
            }
          </ul>
          <img
            src="/images/helper/collapse.png"
            alt="collapse"
            onClick={() => toggleCollapse()}
            className="collapse-expand"
          />
        </>
        :
        <img
          src="/images/helper/expand.png"
          alt="expand"
          onClick={() => toggleCollapse()}
          className="collapse-expand"
        />
      }

    </div>
  )
}

export default DADescription