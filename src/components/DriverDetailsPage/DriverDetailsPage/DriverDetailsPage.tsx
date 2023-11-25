import HeaderContainer from 'components/CommonComponents/Containers/HeaderContainer';
import { DriverBasicInfoComponent } from '../DriverBasicInfoComponent';
import { DriverArtsListComponent } from '../DriverArtsListComponent';
import { IHeart2Heart, IItem, IItemType, IStoryProgress } from 'interfaces';
import { Heart2HeartList } from 'components/Heart2HeartsPage/Heart2HeartList';
import { DriverSkillsComponent } from '../DriverSkillsComponents';
import { IDriverState } from 'reduxState/interfaces/reduxState';

interface IDispatchProps {
  fetchDriverDetails: (payload: number) => void
}

interface IProps {
  driverDetails: IDriverState | undefined;
  storyProgress: IStoryProgress;
  item1?: IItem | undefined;
  item2?: IItem | undefined;
  itemType1?: IItemType | undefined;
  itemType2?: IItemType | undefined;
  heart2Hearts: IHeart2Heart[]
}

export const DriverDetailsPageView = (props:IProps & IDispatchProps) => {

  if (props.driverDetails && props.driverDetails.id !== 0) {
    return (
      <>
        <HeaderContainer
          title={props.driverDetails.name}
          refreshData={props.fetchDriverDetails}
          refreshDataId={props.driverDetails.id}
        />
        <DriverBasicInfoComponent
          driverDetails={props.driverDetails}
          item1={props.item1}
          item2={props.item2}
          itemType1={props.itemType1}
          itemType2={props.itemType2}
        />
        <DriverArtsListComponent
          driverId={props.driverDetails.id}
          driverArts={props.driverDetails.arts} />
        <DriverSkillsComponent
          tree={props.driverDetails.skillTree}
          driverUnlocked={props.driverDetails.chapterUnlocked <= props.storyProgress.Chapter}
        />
        {(!props.storyProgress.OnlyShowAvailable || props.storyProgress.NewGamePlus)
          && <DriverSkillsComponent
            tree={props.driverDetails.hiddenSkillTree}
            driverUnlocked={props.driverDetails.chapterUnlocked <= props.storyProgress.Chapter}
            hiddenTree={true} />}
        <Heart2HeartList
          characterName={props.driverDetails.name}
          parentPage={'driver'}
          heart2Hearts={props.heart2Hearts.filter((h2h:IHeart2Heart) => {
            if (!props.driverDetails) return true
            return h2h.Who.includes(props.driverDetails.name) ||
              h2h.Who.includes('\'s Driver')
          })}
        />
      </>
    )
  }

  return (
    <>
      <HeaderContainer title="Driver not found" />
    </>
  )
};
