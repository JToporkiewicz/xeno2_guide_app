import { IStoryProgress } from 'interfaces';
import { IMajorLocations } from 'reduxState/interfaces/reduxState';
import HeaderContainer from '../CommonComponents/Containers/HeaderContainer';
import { Heart2HeartList } from './Heart2HeartList';
import { separateMajorArea } from 'helpers';
import { IHeart2HeartAvailability } from 'reduxState/interfaces/availabilityState';

interface IDispatchProps {
  fetchHeart2Hearts: () => void;
}

interface IProps {
  heart2Hearts: IHeart2HeartAvailability[];
  storyProgress: IStoryProgress;
  locations: IMajorLocations[];
}

export const Heart2HeartsListPageView = (props:IProps & IDispatchProps) => {
  return (
    <>
      <HeaderContainer title='Heart2Hearts' refreshData={props.fetchHeart2Hearts}/>
      <Heart2HeartList
        parentPage='heart2HeartList'
        location='Argentum Trade Guild'
        heart2Hearts={props.heart2Hearts.filter((h2h) =>
          separateMajorArea(h2h.Area) === 'Argentum Trade Guild')}
      />
      {((props.locations.find((loc) => loc.Name === 'Gormott Province')?.StoryProgress || 10) <=
        props.storyProgress.Chapter || !props.storyProgress.OnlyShowAvailable)  &&
          <Heart2HeartList
            parentPage='heart2HeartList'
            location='Gormott Province'
            heart2Hearts={props.heart2Hearts.filter((h2h) =>
              separateMajorArea(h2h.Area) === 'Gormott Province')}
          />
      }
      {((props.locations.find((loc) => loc.Name === 'Kingdom of Uraya')?.StoryProgress || 10) <=
        props.storyProgress.Chapter || !props.storyProgress.OnlyShowAvailable) &&
          <Heart2HeartList
            parentPage='heart2HeartList'
            location='Kingdom of Uraya'
            heart2Hearts={props.heart2Hearts.filter((h2h) =>
              separateMajorArea(h2h.Area) === 'Kingdom of Uraya')}
          />
      }
      {((props.locations.find((loc) => loc.Name === 'Empire of Mor Ardain')?.StoryProgress || 10) <=
        props.storyProgress.Chapter || !props.storyProgress.OnlyShowAvailable) &&
          <Heart2HeartList
            parentPage='heart2HeartList'
            location='Empire of Mor Ardain'
            heart2Hearts={props.heart2Hearts.filter((h2h) =>
              separateMajorArea(h2h.Area) === 'Empire of Mor Ardain')}
          />
      }
      {((props.locations.find((loc) =>
        loc.Name === 'Leftherian Archipelago')?.StoryProgress || 10) <=
        props.storyProgress.Chapter || !props.storyProgress.OnlyShowAvailable) &&
          <Heart2HeartList
            parentPage='heart2HeartList'
            location='Leftherian Archipelago'
            heart2Hearts={props.heart2Hearts.filter((h2h) =>
              separateMajorArea(h2h.Area) === 'Leftherian Archipelago')}
          />
      }
      {((props.locations.find((loc) =>
        loc.Name === 'Temperantia')?.StoryProgress || 10) <=
        props.storyProgress.Chapter || !props.storyProgress.OnlyShowAvailable) &&
          <Heart2HeartList
            parentPage='heart2HeartList'
            location='Temperantia'
            heart2Hearts={props.heart2Hearts.filter((h2h) =>
              separateMajorArea(h2h.Area) === 'Temperantia')}
          />
      }
      {((props.locations.find((loc) => loc.Name === 'Kingdom of Tental')?.StoryProgress || 10) <=
        props.storyProgress.Chapter || !props.storyProgress.OnlyShowAvailable) &&
          <Heart2HeartList
            parentPage='heart2HeartList'
            location='Kingdom of Tental'
            heart2Hearts={props.heart2Hearts.filter((h2h) =>
              separateMajorArea(h2h.Area) === 'Kingdom of Tental')}
          />
      }
      {((props.locations.find((loc) =>
        loc.Name === 'Spirit Crucible Elpys')?.StoryProgress || 10) <=
        props.storyProgress.Chapter || !props.storyProgress.OnlyShowAvailable) &&
          <Heart2HeartList
            parentPage='heart2HeartList'
            location='Spirit Crucible Elpys'
            heart2Hearts={props.heart2Hearts.filter((h2h) =>
              separateMajorArea(h2h.Area) === 'Spirit Crucible Elpys')}
          />
      }
      {((props.locations.find((loc) =>
        loc.Name === 'Cliffs of Morytha')?.StoryProgress || 10) <=
        props.storyProgress.Chapter || !props.storyProgress.OnlyShowAvailable) &&
          <Heart2HeartList
            parentPage='heart2HeartList'
            location='Cliffs of Morytha'
            heart2Hearts={props.heart2Hearts.filter((h2h) =>
              separateMajorArea(h2h.Area) === 'Cliffs of Morytha')}
          />
      }
      {((props.locations.find((loc) =>
        loc.Name === 'Land of Morytha')?.StoryProgress || 10) <=
        props.storyProgress.Chapter || !props.storyProgress.OnlyShowAvailable) &&
          <Heart2HeartList
            parentPage='heart2HeartList'
            location='Land of Morytha'
            heart2Hearts={props.heart2Hearts.filter((h2h) =>
              separateMajorArea(h2h.Area) === 'Land of Morytha')}
          />
      }
      {((props.locations.find((loc) =>
        loc.Name === 'World Tree')?.StoryProgress || 10) <=
        props.storyProgress.Chapter || !props.storyProgress.OnlyShowAvailable) &&
          <Heart2HeartList
            parentPage='heart2HeartList'
            location='World Tree'
            heart2Hearts={props.heart2Hearts.filter((h2h) =>
              separateMajorArea(h2h.Area) === 'World Tree')}
          />
      }
      {(props.locations.find((loc) => loc.Name === 'First Low Orbit Station')?.StoryProgress || 10)
        <= props.storyProgress.Chapter || !props.storyProgress.OnlyShowAvailable ?
        <Heart2HeartList
          parentPage='heart2HeartList'
          location='First Low Orbit Station'
          heart2Hearts={props.heart2Hearts.filter((h2h) =>
            separateMajorArea(h2h.Area) === 'First Low Orbit Station')}
        />
        : <Heart2HeartList
          parentPage='heart2HeartList'
          location='Unknown Location'
          heart2Hearts={[]}
        />
      }
    </>
  )
};
