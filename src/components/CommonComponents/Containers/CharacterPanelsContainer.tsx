import { ReactChild } from 'react';
import CollapsibleComponent from './CollapsibleComponent';

interface IProps {
  title:string,
  children:ReactChild[]
}

const CharacterPanelContainer = (props:IProps) => 
  <CollapsibleComponent header={props.title}>
    {props.children.length > 0 ?
      <div className="row">
        {props.children}
      </div>
      : <div/>
    }
  </CollapsibleComponent>

export default CharacterPanelContainer;