import CollapsibleComponent from 'components/CommonComponents/Containers/CollapsibleComponent';
import { LargeCheckbox } from 'components/CommonComponents/LargeCheckbox';
import { IHeart2Heart } from 'interfaces'
import { useRef, useEffect } from 'react';

interface IDispatchProps {
  updateHeart2HeartStatus: (payload:IHeart2Heart) => void;
  saveHeart2HeartStatus: (payload:IHeart2Heart) => void;
}

interface IProps {
  heart2Heart: IHeart2Heart,
  h2hLocation: string,
  h2hArea: string
}

export const Heart2HeartBasicInfoView = (props:IProps & IDispatchProps) => {
  const h2hToUpdate = useRef(props.heart2Heart.id !== -1 ? props.heart2Heart : undefined);

  const updateH2HViewed = () => {
    if(props.heart2Heart) {
      h2hToUpdate.current = {
        ...props.heart2Heart,
        Viewed: !props.heart2Heart.Viewed
      }

      props.updateHeart2HeartStatus({
        ...props.heart2Heart,
        Viewed: !props.heart2Heart.Viewed
      })
    }
  }

  useEffect(() => {
    return () => {
      if (h2hToUpdate.current) {
        props.saveHeart2HeartStatus(h2hToUpdate.current);
      }
    }
  }, [])

  return <CollapsibleComponent header="Heart 2 heart details">
    <div className='row'>
      <div className='col-sm-4'>
        <LargeCheckbox
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
            {JSON.parse(props.heart2Heart.Who).map((who:string) => 
              <li key={who}>{who}</li>
            )}
          </ul>
        </div>
      </div>
      <div className='col-sm-4'>
        <div className='centered'>
          <b>Location:</b>
          <p>{props.h2hLocation}</p>
          <p>{props.h2hArea}</p>
        </div>
      </div>
    </div>
  </CollapsibleComponent>
}