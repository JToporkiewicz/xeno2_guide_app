import CollapsibleComponent from 'components/CommonComponents/Containers/CollapsibleComponent';
import HeaderContainer from 'components/CommonComponents/Containers/HeaderContainer'
import { RequirementList } from 'components/CommonComponents/RequirementList';
import { Heart2HeartBasicInfo } from '../Heart2HeartBasicInfoComponent';
import { Heart2HeartOptions } from '../Heart2HeartOptionsComponent';
import { IHeart2HeartAvailability } from 'reduxState/interfaces/availabilityState';

interface IDispatchProps {
  fetchHeart2Heart:(paylod:number) => void;
}

interface IProps {
  heart2Heart: IHeart2HeartAvailability
}

export const Heart2HeartDetailsPageView = (props:IProps & IDispatchProps) => {

  if (props.heart2Heart && props.heart2Heart.id !== -1) {
    return <>
      <HeaderContainer
        title={props.heart2Heart.Title}
        refreshData={props.fetchHeart2Heart}
        refreshDataId={props.heart2Heart.id}
      />
      <Heart2HeartBasicInfo
        heart2Heart={props.heart2Heart}
      />
      {props.heart2Heart.PreReqs ?
        <CollapsibleComponent header='Prerequisites'>
          <RequirementList requirements={props.heart2Heart.PreReqs} />
        </CollapsibleComponent> :''
      }
      <Heart2HeartOptions
        heart2Heart={props.heart2Heart}
      />
    </>
  }

  else {
    return <>
      <HeaderContainer title="Heart2heart not found" />
    </>
  }
}