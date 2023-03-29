import CollapsibleComponent from 'components/CommonComponents/Containers/CollapsibleComponent';
import { OptionsCheckbox } from 'components/CommonComponents/FormComponents/OptionsCheckbox';
import { IHeart2Heart } from 'interfaces';
import { useRef, useEffect } from 'react';
import { IUpdateH2HStatus } from 'reduxState/interfaces/heart2Hearts';
import { IUpdateUnlocked } from 'reduxState/interfaces/reduxState';

interface IDispatchProps {
  updateHeart2HeartStatus: (payload:IUpdateH2HStatus) => void;
  saveHeart2Hearts: (payload:IUpdateUnlocked) => void;
}

interface IProps {
  heart2Heart: IHeart2Heart
}

export const Heart2HeartBasicInfoView = (props:IProps & IDispatchProps) => {
  const h2hToUpdate = useRef(undefined as IHeart2Heart | undefined);

  const updateH2HViewed = () => {
    if(props.heart2Heart) {
      h2hToUpdate.current = {
        ...props.heart2Heart,
        Viewed: !props.heart2Heart.Viewed
      }

      props.updateHeart2HeartStatus({
        id: props.heart2Heart.id,
        Viewed: !props.heart2Heart.Viewed
      })
    }
  }

  useEffect(() => {
    return () => {
      if (h2hToUpdate.current) {
        props.saveHeart2Hearts({
          [h2hToUpdate.current.Viewed ? 'unlocked' : 'locked']: [h2hToUpdate.current.id]
        });
      }
    }
  }, [])

  return <CollapsibleComponent header="Heart 2 heart details">
    <div className='row'>
      <div className='col-sm-4'>
        <OptionsCheckbox
          title='Viewed: '
          available={props.heart2Heart.Available}
          unlocked={props.heart2Heart.Viewed}
          onClick={updateH2HViewed}
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
  </CollapsibleComponent>
}