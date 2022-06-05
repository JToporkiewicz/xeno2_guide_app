import { Link } from 'react-router-dom';

interface IProps {
  area: string,
  id: number,
  name: string,
  availability: string,
  list: {
    label: string,
    unlocked: number,
    total: number
  }[],
  onClose:(input:any) => any
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
        src={`/images/${props.area}/${props.name.replace(/\s+/g, '')}.jpeg`}
        alt={props.name}    
        className="basic-info-image"
      />

      <div className="character-details">
        <b>{props.name}</b>
        <br/>
        {props.availability}
        <br />
        <br />
        {props.list.map((list) =>
          <div>
            <b>{list.label}</b>
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
      <Link to={`/${props.area}/${props.id}`} className="centered-button">
        <div className="proceed-button centered-button">
          <img
            src='/images/helper/Right.svg'
            alt='Proceed'
            className="extra-small-image"
          />
        </div>
      </Link>
    </div>
  </div>
;
