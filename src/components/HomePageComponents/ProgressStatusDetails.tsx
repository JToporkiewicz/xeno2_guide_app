import { useState } from 'react'

interface IProps {
  listTitle: string,
  list: {[name:string]: {
    unlocked: number,
    total: number
  }
}}

export const ProgressStatusDetails = (props:IProps) => {
  const [openDetails, setOpenDetails] = useState(false);
  const allUnlocked = Object.values(props.list)
    .reduce((total, entry) => total + entry.unlocked, 0);
  const allDTotal = Object.values(props.list)
    .reduce((total, entry) => total + entry.total, 0);
  return <div
    className="statusProgress"
    onClick={() => setOpenDetails(!openDetails)}
  >
    <div className="statusHeader">
      <img
        src={`/images/helper/${openDetails ? 'Up' : 'Down'}.svg`}
        alt={openDetails ? 'collapse' : 'expand'}
        className="small-collapse-expand"
      />
      <div className="progressHeader">
        {props.listTitle} Unlocked:
      </div>
      <div className="progressAmount">
        {Math.round(allUnlocked / allDTotal * 10000) / 100}%
      </div>
      <div className="greyBar">
        <div
          className="obtained"
          style={{width: (allUnlocked / allDTotal * 100).toPrecision(2) + '%'}}
        />
      </div>
    </div>
    {openDetails ?
      <>
        <hr/>
        <div className="detailedProgress">
          {Object.entries(props.list)
            .map((entry) => 
              <div className="statusHeader subStatus">
                <div className="progressHeader">
                  {entry[0]}:
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