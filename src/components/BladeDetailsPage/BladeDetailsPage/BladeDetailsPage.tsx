import { IItem, IItemType, IStoryProgress } from 'interfaces'
import HeaderContainer, { IHeaderNavigation }
  from 'components/CommonComponents/Containers/HeaderContainer'
import { BladeAffinityTree } from '../BladeAffinityTree'
import { BladeBasicInfoComponent } from '../BladeBasicInfoComponent'
import CollapsibleComponent from 'components/CommonComponents/Containers/CollapsibleComponent'
import { RequirementList } from 'components/CommonComponents/RequirementList'
import {
  IBladeAvailability,
  IHeart2HeartAvailability,
  IQuestAvailability
} from 'reduxState/interfaces/availabilityState'

interface IDispatchProps {
  fetchBlade: (payload: number) => void
}

interface IProps {
  bladeDetails: IBladeAvailability,
  item1?: IItem,
  item2?: IItem,
  itemType1?: IItemType,
  itemType2?: IItemType,
  heart2Heart?: IHeart2HeartAvailability,
  quest?: IQuestAvailability,
  storyProgress: IStoryProgress,
  headerNavigation?: IHeaderNavigation
}

export const BladeDetailsPageView = (props:IProps & IDispatchProps) => {

  if (props.bladeDetails && props.bladeDetails.id !== 0) {
    return(
      <>
        <HeaderContainer
          title={props.bladeDetails.name}
          refreshData={props.fetchBlade}
          refreshDataId={props.bladeDetails.id}
          navigation={props.headerNavigation}
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