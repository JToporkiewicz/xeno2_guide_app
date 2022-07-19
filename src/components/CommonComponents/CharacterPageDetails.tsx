import { Link } from 'react-router-dom';
import path from 'path';

interface IProps {
  area: string,
  id: number,
  name: string,
  unlocked?:string,
  availability: string,
  list: {
    label: string,
    unlocked: number,
    total: number
  }[],
  onClose:(input:any) => any,
  unlockButton?:boolean,
  onUnlock?:() => any
}

export const CharacterPageDetails = (props: IProps) => 
  <div className="character-progress-details">
    <div className="character-details-background" />
    <div className="character-details-layout">
      <img
        className="close-details character-progress-close"
        src="images/helper/Close.svg"
        alt="Close"
        onClick={() => props.onClose(0)}
      />
      <img
        src={path.resolve(`images/${props.area}/${props.name.replace(/\s+/g, '')}.jpeg`)}
        alt={props.name}    
        className="basic-info-image"
      />

      <div className="character-details">
        <b>{props.name}</b>
        <br/>
        {props.unlocked ?
          <>
            {props.unlocked}
            <br/>
          </>
          : undefined
        }
        {props.availability}
        <br />
        <br />
        {props.list.map((list) =>
          <div key={list.label}>
            <b>{list.label}</b>{list.unlocked} out of {list.total}
            <div className="greyBar">
              <div
                className="obtained"
                style={{
                  width: (list.unlocked / list.total * 100).toPrecision(2) + '%'
                }}
              />
              <p>{Math.round(list.unlocked / list.total * 10000)/100}%</p>
            </div>
          </div>
        )}      
      </div>
      <div className="centered-button">
        {props.unlockButton &&
          <div
            className={`proceed-button centered-button${props.availability.endsWith('No') ?
              ' disabledButton' : ''}`}
            onClick={() => props.availability.endsWith('Yes')
              && props.onUnlock ? props.onUnlock() : {}}
          >
            <img
              src={path.resolve(`images/helper/${props.unlocked?.endsWith('Yes') ?
                'closedLock' : 'openLock'}.svg`)}
              alt={props.unlocked?.endsWith('Yes') ? 'Unlock' : 'Lock'}
              className="extra-small-image"
            />
          </div>
        }
        <Link to={`/${props.area}/${props.id}`}>
          <div className="proceed-button centered-button">
            <img
              src={path.resolve('images/helper/Right.svg')}
              alt='Proceed'
              className="extra-small-image"
            />
          </div>
        </Link>
      </div>
    </div>
  </div>
;
