import CollapsibleComponent from 'components/CommonComponents/Containers/CollapsibleComponent';
import HeaderContainer from 'components/CommonComponents/Containers/HeaderContainer'
import { LargeCheckbox } from 'components/CommonComponents/LargeCheckbox';
import { IHeart2Heart } from 'interfaces'
import { useRef, useEffect } from 'react';

interface IDispatchProps {
  fetchHeart2Heart:(paylod:number) => void;
  updateHeart2HeartStatus: (payload:IHeart2Heart) => void;
  saveHeart2HeartStatus: (payload:IHeart2Heart) => void;
}

interface IProps {
  heart2Heart: IHeart2Heart
}

export const Heart2HeartDetailsPageView = (props:IProps & IDispatchProps) => {
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

  if (props.heart2Heart && props.heart2Heart.id !== -1) {
    return <>
      <HeaderContainer
        title={props.heart2Heart.Title}
        refreshData={props.fetchHeart2Heart}
        refreshDataId={props.heart2Heart.id}
      />
      <CollapsibleComponent header="Heart 2 heart details">
        <div className='row'>
          <div className='col-sm-3'>
            <LargeCheckbox
              title='Viewed: '
              available={props.heart2Heart.Available}
              unlocked={props.heart2Heart.Viewed}
              onClick={updateH2HViewed}
            />
          </div>
          <div>
            <b>Participants:</b>
            <ul>
              {JSON.parse(props.heart2Heart.Who).map((who:string) => 
                <li key={who}>{who}</li>
              )}
            </ul>
          </div>
        </div>
      </CollapsibleComponent>
    </>
  }

  else {
    return <>
      <HeaderContainer title="Heart2heart not found" />
    </>
  }
}