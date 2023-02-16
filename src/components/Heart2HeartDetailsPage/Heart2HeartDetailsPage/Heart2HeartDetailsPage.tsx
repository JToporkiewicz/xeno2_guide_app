import HeaderContainer from 'components/CommonComponents/Containers/HeaderContainer'
import { IHeart2Heart } from 'interfaces';
import { Heart2HeartBasicInfo } from '../Heart2HeartBasicInfoComponent';
import { Heart2HeartOptions } from '../Heart2HeartOptionsComponent';

interface IDispatchProps {
  fetchHeart2Heart:(paylod:number) => void;
}

interface IProps {
  heart2Heart: IHeart2Heart
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