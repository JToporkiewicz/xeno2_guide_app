import HeaderContainer from 'components/CommonComponents/Containers/HeaderContainer'
import { IHeart2Heart } from 'interfaces'

interface IDispatchProps {
  fetchHeart2Heart:(paylod:number) => void;
}

interface IProps {
  heart2Heart: IHeart2Heart
}

export const Heart2HeartDetailsPageView = (props:IProps & IDispatchProps) => {
  if (props.heart2Heart) {
    return <>
      <HeaderContainer
        title={props.heart2Heart.Title}
        refreshData={props.fetchHeart2Heart}
        refreshDataId={props.heart2Heart.id}
      />
    </>
  }

  else {
    return <>
      <HeaderContainer title="Heart2heart not found" />
    </>
  }
}