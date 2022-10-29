import CollapsibleComponent from 'components/CommonComponents/Containers/CollapsibleComponent'
import HeaderContainer from 'components/CommonComponents/Containers/HeaderContainer'
import { IStoryProgress } from 'interfaces'
import { IMercMissionState } from 'reduxState/interfaces/reduxState'

interface IProps {
  mercMissions: IMercMissionState[],
  storyProgress: IStoryProgress
}

export const MercMissionListPageView = (props: IProps) => {
  return <>
    <HeaderContainer title="Merc Missions" />
    <CollapsibleComponent header="Merc Missions">
      {props.mercMissions.map((m) =>
        <div>{m.Name}</div>
      )}
    </CollapsibleComponent>
  </>
}