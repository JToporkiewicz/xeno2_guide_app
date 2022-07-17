import { ReactChild } from 'react';
import OrderBy from '../OrderBy';
import CollapsibleComponent from './CollapsibleComponent';

interface IProps {
  title:string,
  children:ReactChild[] | {[group: string]: ReactChild[]},
  orderOptions?:string[],
  orderType?:string,
  setOrderType?:(value:string) => void
  sortOrderAsc?: boolean,
  changeSortOrderAsc?: () => void;
}

const CharacterPanelContainer = (props:IProps) => 
  <CollapsibleComponent header={props.title}>
    {
      props.orderOptions && props.orderType && props.setOrderType
      && props.sortOrderAsc !== undefined && props.changeSortOrderAsc ?
        <OrderBy
          orderOptions={props.orderOptions}
          chosenOrder={props.orderType}
          changeOrder={props.setOrderType}
          sortOrderAsc={props.sortOrderAsc}
          changeSortOrderAsc={props.changeSortOrderAsc}
        />
        : <div />
    }
    <div>
      {Array.isArray(props.children) && props.children.length > 0 ?
        <div className="row">
          {props.children}
        </div>
        : !Array.isArray(props.children) ?
          Object.entries(props.children).map((group) =>
            <div key={group[0]}>
              <h3>{group[0]}</h3>
              <div className="row">
                {group[1]}
              </div>
            </div>) :
          <div/>
      }
    </div>
  </CollapsibleComponent>

export default CharacterPanelContainer;