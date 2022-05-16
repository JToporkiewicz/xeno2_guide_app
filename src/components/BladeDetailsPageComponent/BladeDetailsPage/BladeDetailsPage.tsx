import { IItem, IItemType } from '../../../interfaces'
import { IBladeState } from '../../../redux/interfaces/reduxState'
import HeaderContainer from '../../CommonComponents/Containers/HeaderContainer'

interface IProps {
  bladeDetails: IBladeState,
  item1?: IItem,
  item2?: IItem,
  itemType1?: IItemType,
  itemType2?: IItemType,
}

export const BladeDetailsPageView = (props:IProps) => {
  return(
    <>
      <HeaderContainer title={props.bladeDetails.name} />
    </>
  )
}