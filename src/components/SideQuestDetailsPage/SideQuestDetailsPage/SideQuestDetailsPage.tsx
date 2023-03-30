import CollapsibleComponent from 'components/CommonComponents/Containers/CollapsibleComponent';
import HeaderContainer from 'components/CommonComponents/Containers/HeaderContainer'
import { RequirementList } from 'components/CommonComponents/RequirementList';
import { IQuest } from 'interfaces';
import { SideQuestBasicInfo } from '../SideQuestBasicInfoComponent';
import { SideQuestRewardsComponent } from '../SideQuestRewardsComponents';
import { SideQuestStepDetails } from '../SideQuestStepDetails';

interface IDispatchProps {
  fetchQuest:(paylod:number) => void;
}

interface IProps {
  quest: IQuest
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
      {props.quest.PreReqs ?
        <CollapsibleComponent header='Prerequisites'>
          <RequirementList requirements={props.quest.PreReqs} />
        </CollapsibleComponent> : ''
      }
      <SideQuestStepDetails
        quest={props.quest}
      />
      {props.quest.Rewards.length > 2 &&
        <SideQuestRewardsComponent
          quest={props.quest}
        />
      }
    </>
  }

  else {
    return <>
      <HeaderContainer title="Quest not found" />
    </>
  }
}