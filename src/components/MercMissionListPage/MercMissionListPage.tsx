import HeaderContainer from 'components/CommonComponents/Containers/HeaderContainer'
import { IMercMission, IStoryProgress } from 'interfaces'
import { useEffect, useRef } from 'react'
import { IUpdateMMStatus } from 'reduxState/interfaces/mercMission'
import { IMajorLocations, IUpdateUnlocked } from 'reduxState/interfaces/reduxState'
import { MercMissionList } from './MercMissionList'
import { IUpdateDevelopmentLevel } from 'reduxState/interfaces/locations'

interface IProps {
  mercMissions: IMercMission[],
  storyProgress: IStoryProgress,
  locations: IMajorLocations[];
}

interface IDispatchProps {
  updateMercMissionStatus: (input:IUpdateMMStatus) => void;
  saveMercMissionStatus: (input:IUpdateUnlocked) => void;
  fetchAllMercMissions: () => void;
  saveStoryProgress: (input:IStoryProgress) => void;
  saveDevelopmentLevel: (payload:IUpdateDevelopmentLevel) => void;
}

export const MercMissionListPageView = (props: IProps & IDispatchProps) => {
  const toUpdate = useRef([] as IUpdateMMStatus[]);

  const storyHistory = useRef(props.storyProgress as IStoryProgress);
  
  const updatedProgress = useRef(props.storyProgress as IStoryProgress);
  const updatedLocDevLevel = useRef([] as IUpdateDevelopmentLevel[])

  useEffect(() => {
    return () => {
      if (updatedProgress.current !== storyHistory.current) {
        props.saveStoryProgress(updatedProgress.current)
      }
      if (updatedLocDevLevel.current.length !== 0) {
        updatedLocDevLevel.current.forEach((loc) =>
          props.saveDevelopmentLevel(loc)
        )
      }
    }
  }, [])


  useEffect(() => {
    return () => {
      if(toUpdate.current.length) {
        props.saveMercMissionStatus({
          'unlocked': toUpdate.current.filter((mm) => mm.completed).map((mm) => mm.id),
          'locked': toUpdate.current.filter((mm) => !mm.completed).map((mm) => mm.id)
        })
      }
    }
  }, [])

  useEffect(() => {
    if(props.storyProgress) {
      storyHistory.current = {
        ...props.storyProgress,
        MercLevel: updatedProgress.current.MercLevel
      }
      updatedProgress.current = storyHistory.current
    }
  }, [props.storyProgress])

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
      <MercMissionList
        location='Argentum Trade Guild'
        mercMissions={props.mercMissions.filter((mm) =>
          mm.MissionNation === 'Argentum Trade Guild')}
        storyProgress={updatedProgress}
        updatedLocDevLevel={updatedLocDevLevel}
        updateMMStatus={updateMMStatus}
      />
      {((props.locations.find((loc) => loc.Name === 'Gormott Province')?.StoryProgress || 10) <=
            props.storyProgress.Chapter || !props.storyProgress.OnlyShowAvailable) &&
            <MercMissionList
              location='Gormott Province'
              mercMissions={props.mercMissions.filter((mm) =>
                mm.MissionNation === 'Gormott Province')}
              storyProgress={updatedProgress}
              updatedLocDevLevel={updatedLocDevLevel}
              updateMMStatus={updateMMStatus}
            />
      }
      {((props.locations.find((loc) => loc.Name === 'Kingdom of Uraya')?.StoryProgress || 10) <=
            props.storyProgress.Chapter || !props.storyProgress.OnlyShowAvailable) &&
            <MercMissionList
              location='Kingdom of Uraya'
              mercMissions={props.mercMissions.filter((mm) =>
                mm.MissionNation === 'Kingdom of Uraya')}
              storyProgress={updatedProgress}
              updatedLocDevLevel={updatedLocDevLevel}
              updateMMStatus={updateMMStatus}
            />
      }
      {((props.locations.find((loc) =>
        loc.Name === 'Empire of Mor Ardain')?.StoryProgress || 10) <=
            props.storyProgress.Chapter || !props.storyProgress.OnlyShowAvailable) &&
            <MercMissionList
              location='Empire of Mor Ardain'
              mercMissions={props.mercMissions.filter((mm) =>
                mm.MissionNation === 'Empire of Mor Ardain')}
              storyProgress={updatedProgress}
              updatedLocDevLevel={updatedLocDevLevel}
              updateMMStatus={updateMMStatus}
            />
      }
      {((props.locations.find((loc) =>
        loc.Name === 'Leftherian Archipelago')?.StoryProgress || 10) <=
            props.storyProgress.Chapter || !props.storyProgress.OnlyShowAvailable) &&
            <MercMissionList
              location='Leftherian Archipelago'
              mercMissions={props.mercMissions.filter((mm) =>
                mm.MissionNation === 'Leftherian Archipelago')}
              storyProgress={updatedProgress}
              updatedLocDevLevel={updatedLocDevLevel}
              updateMMStatus={updateMMStatus}
            />
      }
      {((props.locations.find((loc) =>
        loc.Name === 'Indoline Praetorium')?.StoryProgress || 10) <=
            props.storyProgress.Chapter || !props.storyProgress.OnlyShowAvailable) &&
            <MercMissionList
              location='Indoline Praetorium'
              mercMissions={props.mercMissions.filter((mm) =>
                mm.MissionNation === 'Indoline Praetorium')}
              storyProgress={updatedProgress}
              updatedLocDevLevel={updatedLocDevLevel}
              updateMMStatus={updateMMStatus}
            />
      }
      {(props.locations.find((loc) =>
        loc.Name === 'Kingdom of Tental')?.StoryProgress || 10) <=
            props.storyProgress.Chapter || !props.storyProgress.OnlyShowAvailable ?
        <MercMissionList
          location='Kingdom of Tental'
          mercMissions={props.mercMissions.filter((mm) =>
            mm.MissionNation === 'Kingdom of Tental')}
          storyProgress={updatedProgress}
          updatedLocDevLevel={updatedLocDevLevel}
          updateMMStatus={updateMMStatus}
        /> : <MercMissionList
          location='Unknown Location'
          mercMissions={[]}
          storyProgress={updatedProgress}
          updatedLocDevLevel={updatedLocDevLevel}
          updateMMStatus={updateMMStatus}
        />
      }
    </>
  </>
}