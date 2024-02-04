import { useState } from 'react'
import path from 'path';

interface IProps {
  listTitle: string,
  list: {[name:string]: {
    unlocked: number,
    total: number,
    id?: number
  }
}}

export const ProgressStatusDetails = (props:IProps) => {
  const [openDetails, setOpenDetails] = useState(false);
  const allUnlocked = Object.values(props.list)
    .reduce((total, entry) => total + entry.unlocked, 0);
  const allTotal = Object.values(props.list)
    .reduce((total, entry) => total + entry.total, 0);
  return <div
    className="statusProgress"
    onClick={() => setOpenDetails(!openDetails)}
  >
    <div className="statusHeader">
      <img
        src={path.resolve(`images/helper/${openDetails ? 'Up' : 'Down'}.svg`)}
        alt={openDetails ? 'collapse' : 'expand'}
        className="small-collapse-expand"
      />
      <div>
        {props.listTitle} <i className="sub-text">{allUnlocked} out of {allTotal}</i>
      </div>
      <div className="progressAmount">
        {Math.round(allUnlocked / allTotal * 10000) / 100}%
      </div>
      <div className="greyBar">
        <div
          className="obtained"
          style={{width: (allUnlocked / allTotal * 100).toPrecision(2) + '%'}}
        />
      </div>
    </div>
    {openDetails ?
      <>
        <hr/>
        <div className="detailedProgress">
          {Object.entries(props.list).sort((entryA, entryB) => {
            if (entryA[1].id && entryB[1].id) {
              return entryA[1].id > entryB[1].id ? 1 : -1
            }
            return entryA[1].unlocked / entryA[1].total > entryB[1].unlocked / entryB[1].total ?
              -1 : 1
          })
            .map((entry) => 
              <div className="statusHeader subStatus" key={`${entry[0]}`}>
                <div>
                  {entry[0]}:
                  <i className="sub-text"> {entry[1].unlocked} out of {entry[1].total}</i>
                </div>
                <div className="progressAmount">
                  {Math.round(entry[1].unlocked / entry[1].total * 10000) / 100}%
                </div>
                <div className="greyBar">
                  <div
                    className="obtained"
                    style={{
                      width: (entry[1].unlocked / entry[1].total * 100).toPrecision(2) + '%'
                    }}
                  />
                </div>
              </div>
            )}
        </div>
      </>
      : <></>
    }
  </div>

}