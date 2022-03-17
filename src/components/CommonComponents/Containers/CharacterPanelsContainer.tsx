import { ReactChild } from 'react';
import OrderBy from '../OrderBy';
import CollapsibleComponent from './CollapsibleComponent';

interface IProps {
  title:string,
  children:ReactChild[],
  orderOptions?:string[],
  orderType?:string,
  setOrderType?:(value:string) => void
}

const CharacterPanelContainer = (props:IProps) => 
  <CollapsibleComponent header={props.title}>
    {
      props.orderOptions && props.orderType && props.setOrderType ?
        <OrderBy
          orderOptions={props.orderOptions}
          chosenOrder={props.orderType}
          changeOrder={props.setOrderType}
        />
        : <div />
    }

    {props.children.length > 0 ?
      <div className="row">
        {props.children}
      </div>
      : <div/>
    }
  </CollapsibleComponent>

export default CharacterPanelContainer;