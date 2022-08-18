import HeaderContainer from 'components/CommonComponents/Containers/HeaderContainer'
import { IQuestState } from 'reduxState/interfaces/reduxState';
import { SideQuestBasicInfo } from '../SideQuestBasicInfoComponent';

interface IDispatchProps {
  fetchQuest:(paylod:number) => void;
}

interface IProps {
  quest: IQuestState
}

export const SideQuestDetailsPageView = (props:IProps & IDispatchProps) => {

  if (props.quest && props.quest.id !== 0) {
    return <>
      <HeaderContainer
        title={props.quest.Name}
        refreshData={props.fetchQuest}
        refreshDataId={props.quest.id}
      />
      <SideQuestBasicInfo
        quest={props.quest}
      />
    </>
  }

  else {
    return <>
      <HeaderContainer title="Quest not found" />
    </>
  }
}