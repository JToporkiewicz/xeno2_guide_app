import { ReactChild, useState } from 'react';
import path from 'path';

interface IProps {
  header:string,
  children:ReactChild
}

const InnerCollapsibleComponent = (props:IProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
  return (
    <div className="inner-collapsible-container">
      <div className="inner-container-header" onClick={toggle}>
        <img
          src={path.resolve(`images/helper/${isOpen ? 'Down' : 'Up'}.svg`)}
          alt={isOpen ? 'collapse' : 'expand'}
          className="small-collapse-expand"
        />
        <b>{props.header}</b>
      </div>
      {isOpen ?
        <div className="inner-container-contents">
          {props.children}
        </div>
        :
        <div/>}
    </div>
  )
};

export default InnerCollapsibleComponent;