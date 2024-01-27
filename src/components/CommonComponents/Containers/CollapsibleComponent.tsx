import { ReactChild, useState } from 'react';

interface IProps {
  header:string,
  children?: ReactChild | ReactChild[] | Element | Element[]
}

const CollapsibleComponent = (props:IProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
  return (
    <div className="collapsible-container">
      <h2 className="container-header" id={props.header} onClick={toggle}>
        {props.header}
      </h2>
      {isOpen ?
        <div /> :
        <div className="container-contents">
          {props.children}
        </div>
      }
    </div>
  )
};

export default CollapsibleComponent;