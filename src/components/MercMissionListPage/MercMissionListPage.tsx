import HeaderContainer from 'components/CommonComponents/Containers/HeaderContainer'
import { IStoryProgress } from 'interfaces'
import { useEffect, useRef } from 'react'
import { IUpdateMMStatus } from 'reduxState/interfaces/mercMission'
import { IMercMissionState, IMajorLocations } from 'reduxState/interfaces/reduxState'
import { MercMissionListView } from './MercMissionList/MercMissionList'

interface IProps {
  mercMissions: IMercMissionState[],
  storyProgress: IStoryProgress,
  locations: IMajorLocations[];
}

interface IDispatchProps {
  updateMercMissionStatus: (input:IUpdateMMStatus) => void;
  saveMercMissionStatus: (input:IUpdateMMStatus) => void;
  fetchAllMercMissions: () => void;
}

export const MercMissionListPageView = (props: IProps & IDispatchProps) => {
  const toUpdate = useRef([] as IUpdateMMStatus[]);

  useEffect(() => {
    return () => {
      toUpdate.current.map((mm) =>
        props.saveMercMissionStatus(mm)
      )
    }
  }, [])

  const updateMMStatus = (mmId: number, completed: boolean) => {
    props.updateMercMissionStatus({
      id: mmId,
      completed: completed
    });
    toUpdate.current = toUpdate.current
      .filter((updateMM) => updateMM.id !== mmId)
      .concat([{
        id: mmId,
        completed: completed
      }])
  }

  return <>
    <HeaderContainer title="Merc Missions" refreshData={props.fetchAllMercMissions} />
    <>
      <MercMissionListView
        location='Argentum Trade Guild'
        mercMissions={props.mercMissions.filter((mm) =>
          mm.MissionNation === 'Argentum Trade Guild')}
        storyProgress={props.storyProgress}
        updateMMStatus={updateMMStatus}
      />
      {((props.locations.find((loc) => loc.Name === 'Gormott Province')?.StoryProgress || 10) <=
            props.storyProgress.Chapter || !props.storyProgress.OnlyShowAvailable) &&
            <MercMissionListView
              location='Gormott Province'
              mercMissions={props.mercMissions.filter((mm) =>
                mm.MissionNation === 'Gormott Province')}
              storyProgress={props.storyProgress}
              updateMMStatus={updateMMStatus}
            />
      }
      {((props.locations.find((loc) => loc.Name === 'Kingdom of Uraya')?.StoryProgress || 10) <=
            props.storyProgress.Chapter || !props.storyProgress.OnlyShowAvailable) &&
            <MercMissionListView
              location='Kingdom of Uraya'
              mercMissions={props.mercMissions.filter((mm) =>
                mm.MissionNation === 'Kingdom of Uraya')}
              storyProgress={props.storyProgress}
              updateMMStatus={updateMMStatus}
            />
      }
      {((props.locations.find((loc) =>
        loc.Name === 'Empire of Mor Ardain')?.StoryProgress || 10) <=
            props.storyProgress.Chapter || !props.storyProgress.OnlyShowAvailable) &&
            <MercMissionListView
              location='Empire of Mor Ardain'
              mercMissions={props.mercMissions.filter((mm) =>
                mm.MissionNation === 'Empire of Mor Ardain')}
              storyProgress={props.storyProgress}
              updateMMStatus={updateMMStatus}
            />
      }
      {((props.locations.find((loc) =>
        loc.Name === 'Leftherian Archipelago')?.StoryProgress || 10) <=
            props.storyProgress.Chapter || !props.storyProgress.OnlyShowAvailable) &&
            <MercMissionListView
              location='Leftherian Archipelago'
              mercMissions={props.mercMissions.filter((mm) =>
                mm.MissionNation === 'Leftherian Archipelago')}
              storyProgress={props.storyProgress}
              updateMMStatus={updateMMStatus}
            />
      }
      {((props.locations.find((loc) =>
        loc.Name === 'Indoline Praetorium')?.StoryProgress || 10) <=
            props.storyProgress.Chapter || !props.storyProgress.OnlyShowAvailable) &&
            <MercMissionListView
              location='Indoline Praetorium'
              mercMissions={props.mercMissions.filter((mm) =>
                mm.MissionNation === 'Indoline Praetorium')}
              storyProgress={props.storyProgress}
              updateMMStatus={updateMMStatus}
            />
      }
      {(props.locations.find((loc) =>
        loc.Name === 'Kingom of Tental')?.StoryProgress || 10) <=
            props.storyProgress.Chapter || !props.storyProgress.OnlyShowAvailable ?
        <MercMissionListView
          location='Kingom of Tental'
          mercMissions={props.mercMissions.filter((mm) =>
            mm.MissionNation === 'Kingom of Tental')}
          storyProgress={props.storyProgress}
          updateMMStatus={updateMMStatus}
        /> : <MercMissionListView
          location='Unknown'
          mercMissions={[]}
          storyProgress={props.storyProgress}
          updateMMStatus={updateMMStatus}
        />
      }
    </>
  </>
}