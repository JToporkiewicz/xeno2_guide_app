import { useEffect } from 'react'
import { IItem, IItemType } from 'interfaces'
import { IBladeState, IHeart2HeartState, IQuestState } from 'reduxState/interfaces/reduxState'
import HeaderContainer from 'components/CommonComponents/Containers/HeaderContainer'
import { BladeAffinityTree } from '../BladeAffinityTree'
import { BladeBasicInfoComponent } from '../BladeBasicInfoComponent'

interface IDispatchProps {
  fetchItem: (payload:number) => void,
  fetchItemType: (payload:number) => void,
  fetchBlade: (payload: number) => void
}

interface IProps {
  bladeDetails: IBladeState,
  item1?: IItem,
  item2?: IItem,
  itemType1?: IItemType,
  itemType2?: IItemType,
  heart2Heart?: IHeart2HeartState,
  quest?: IQuestState
}

export const BladeDetailsPageView = (props:IProps & IDispatchProps) => {
  useEffect(() => {
    if (props.bladeDetails && props.bladeDetails.id !== 0) {
      if(!props.item1) {
        props.fetchItem(props.bladeDetails.favItem1);
      }
      if(!props.item2) {
        props.fetchItem(props.bladeDetails.favItem2);
      }
      if(!props.itemType1) {
        props.fetchItemType(props.bladeDetails.favItemType1);
      }
      if(!props.itemType2) {
        props.fetchItemType(props.bladeDetails.favItemType2);
      }
    }
  }, [props.bladeDetails])

  if (props.bladeDetails && props.bladeDetails.id !== 0) {
    return(
      <>
        <HeaderContainer
          title={props.bladeDetails.name}
          refreshData={props.fetchBlade}
          refreshDataId={props.bladeDetails.id}
        />
        <BladeBasicInfoComponent {...props} />
        <BladeAffinityTree affinityChart={props.bladeDetails.affinityChart}/>
      </>
    )
  }

  return (
    <>
      <HeaderContainer title="Blade not found" />
    </>
  )

}