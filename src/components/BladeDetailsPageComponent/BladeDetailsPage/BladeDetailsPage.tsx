import { useEffect } from 'react'
import { IHeart2Heart, IItem, IItemType } from '../../../interfaces'
import { IBladeState, IQuestState } from '../../../redux/interfaces/reduxState'
import HeaderContainer from '../../CommonComponents/Containers/HeaderContainer'
import { BladeBasicInfoComponent } from '../BladeBasicInfoComponent'

interface IDispatchProps {
  fetchItem: (payload:number) => void,
  fetchItemType: (payload:number) => void
}

interface IProps {
  bladeDetails: IBladeState,
  item1?: IItem,
  item2?: IItem,
  itemType1?: IItemType,
  itemType2?: IItemType,
  heart2Heart?: IHeart2Heart,
  quest?: IQuestState
}

export const BladeDetailsPageView = (props:IProps & IDispatchProps) => {
  useEffect(() => {
    if(props.bladeDetails && !props.item1) {
      props.fetchItem(props.bladeDetails.favItem1);
    }
    if(props.bladeDetails && !props.item2) {
      props.fetchItem(props.bladeDetails.favItem2);
    }
    if(props.bladeDetails && !props.itemType1) {
      props.fetchItemType(props.bladeDetails.favItemType1);
    }
    if(props.bladeDetails && !props.itemType2) {
      props.fetchItemType(props.bladeDetails.favItemType2);
    }
  }, [])
  if (props.bladeDetails) {
    return(
      <>
        <HeaderContainer title={props.bladeDetails.name} />
        <BladeBasicInfoComponent {...props} />
      </>
    )
  }

  return (
    <>
      <HeaderContainer title="Blade not found" />
    </>
  )

}