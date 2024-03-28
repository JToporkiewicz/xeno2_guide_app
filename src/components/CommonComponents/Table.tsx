// eslint-disable-next-line no-use-before-define
import React, { useState } from 'react';
import 'scss/table.scss';
import { HoverContainer } from './Containers/HoverContainer';
import { RequirementList } from './RequirementList';

interface IProps {
  columns: string[];
  rows: {[key: 'id' | string | 'preReqs' | 'updatePreReq' | 'available' | 'focused']: any}[];
  headerStyles: {[key: string]: string};
  tableStyle?: string;
  rowClickable?: boolean;
  onClick?: (index: number) => void;
}

const Table = (props: IProps) => {
  const [focused, setFocused] = useState(0);

  return <>
    <div className={`data-table ${props.tableStyle || ''}`}>
      <div className='row table-header'>
        {props.columns.map((col) =>
          <b className={props.headerStyles[col]} key={col}>{col}</b>
        )}
      </div>
      <div className='table-outline'>
        {props.rows.map((row) =>
          <div
            className={`row text-list-entry
              ${props.rowClickable && row.available ? ' hoverPointer' : ''}
              ${row.id === focused || row.focused ? ' selected-row' : ''}`
            }
            onClick={() => {
              if (!props.rowClickable) return;
              setFocused(row.id);
              if (props.onClick && row.available) {
                props.onClick(row.id);
              }
            }}
            key={row.id}
          >
            {props.columns.map((col) =>
              <React.Fragment key={`row ${row.id}: ${col}`}>
                {row[col]}
              </React.Fragment>
            )}
            {row.preReqs !== undefined &&
              <HoverContainer>
                <RequirementList
                  requirements={row.preReqs}
                  updateReqProgress={row.updatePreReq ? row.updatePreReq : undefined}
                />
              </HoverContainer>}
          </div>
        )}
      </div>
    </div>
  </>;
}

export default Table;