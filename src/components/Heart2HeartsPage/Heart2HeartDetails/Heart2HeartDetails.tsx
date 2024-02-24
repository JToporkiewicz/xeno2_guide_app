import { OptionsCheckbox } from 'components/CommonComponents/FormComponents/OptionsCheckbox';
import { RequirementList } from 'components/CommonComponents/RequirementList';
import { IHeart2HeartAvailability } from 'reduxState/interfaces/availabilityState'
import { Heart2HeartOptions } from './Heart2HeartOptionsComponent';
import path from 'path';

interface IOwnProps {
  heart2Heart: IHeart2HeartAvailability | undefined;
  setFocus: (id: number) => void;
  updateH2h:(viewed: string | boolean) => void;
}

export const Heart2HeartDetails = (props: IOwnProps) => {
  if (!props.heart2Heart) {
    return <div />
  }

  const h2h = props.heart2Heart

  return <>
    <div>
      <img
        src={path.resolve('images/helper/Close.svg')}
        alt="close"
        className="close-details"
        onClick={() => props.setFocus(0)}
      />
      <h3>{h2h.Title}</h3>
      <div className='row'>
        <div className='col-sm-4'>
          <OptionsCheckbox
            title='Viewed: '
            available={props.heart2Heart.Available}
            unlocked={props.heart2Heart.Viewed}
            onClick={(viewed) => props.updateH2h(viewed)}
          />
        </div>
        <div className='col-sm-4'>
          <div className='centered'>
            <b>Participants:</b>
            <ul>
              {props.heart2Heart.Who.map((who:string) => 
                <li key={who}>{who}</li>
              )}
            </ul>
          </div>
        </div>
        <div className='col-sm-4'>
          <div className='centered'>
            <b>Location:</b>
            <p>{props.heart2Heart.Location}</p>
            <p>{props.heart2Heart.Area}</p>
          </div>
        </div>
      </div>
      {h2h.PreReqs ?
        <>
          <hr className='item-details-line'/>
          <b>Prerequisites:</b>
          <RequirementList requirements={h2h.PreReqs} />
        </>
        : ''
      }
      <Heart2HeartOptions heart2Heart={h2h} />
    </div>
    <br />
  </>
}