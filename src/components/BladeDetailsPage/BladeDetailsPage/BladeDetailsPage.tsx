import { useEffect } from 'react'
import { IHeart2Heart, IItem, IItemType, IQuest, IStoryProgress } from 'interfaces'
import { IBladeState } from 'reduxState/interfaces/reduxState'
import HeaderContainer from 'components/CommonComponents/Containers/HeaderContainer'
import { BladeAffinityTree } from '../BladeAffinityTree'
import { BladeBasicInfoComponent } from '../BladeBasicInfoComponent'
import CollapsibleComponent from 'components/CommonComponents/Containers/CollapsibleComponent'
import { RequirementList } from 'components/CommonComponents/RequirementList'

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
  heart2Heart?: IHeart2Heart,
  quest?: IQuest,
  storyProgress: IStoryProgress
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
        {props.bladeDetails.prerequisites ?
          <CollapsibleComponent header='Prerequisites'>
            <RequirementList requirements={props.bladeDetails.prerequisites} />
          </CollapsibleComponent>
          : ''
        }
        <BladeAffinityTree
          affinityChart={props.bladeDetails.affinityChart}
          bladeId={props.bladeDetails.id}
        />
      </>
    )
  }

  return (
    <>
      <HeaderContainer title="Blade not found" />
    </>
  )

}