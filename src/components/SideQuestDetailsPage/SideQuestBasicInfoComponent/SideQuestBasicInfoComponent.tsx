import CollapsibleComponent from 'components/CommonComponents/Containers/CollapsibleComponent';
import { OptionsCheckbox } from 'components/CommonComponents/FormComponents/OptionsCheckbox';
import { IQuest } from 'interfaces';
import { useRef, useEffect } from 'react';
import { IUpdateQuestStatus } from 'reduxState/interfaces/quest';

interface IDispatchProps {
  updateQuestStatus: (payload:IUpdateQuestStatus) => void;
  saveQuestStatus: (payload:IUpdateQuestStatus[]) => void;
}

interface IProps {
  quest: IQuest
}

export const SideQuestBasicInfoView = (props:IProps & IDispatchProps) => {
  const questToUpdate = useRef(undefined as IQuest | undefined);

  const updateQuestCompleted = (status:string | boolean) => {
    if(props.quest && typeof status === 'string') {
      questToUpdate.current = {
        ...props.quest,
        Status: status
      }

      props.updateQuestStatus({
        questId: props.quest.id,
        status
      })
    }
  }

  useEffect(() => {
    return () => {
      if (questToUpdate.current) {
        props.saveQuestStatus([{
          questId: questToUpdate.current.id,
          status: questToUpdate.current.Status
        }]);
      }
    }
  }, [])

  return <CollapsibleComponent header="Quest details">
    <div className='row'>
      <div className='col-sm-4'>
        <OptionsCheckbox
          title='Status: '
          available={props.quest.Available}
          states={[
            {
              text: 'NOT STARTED',
              active: props.quest.Status === 'NOT STARTED'
            },
            {
              text: 'STARTED',
              imgName: 'Plus',
              active: props.quest.Status === 'STARTED'
            },
            {
              text: 'FINISHED',
              imgName: 'Checkmark',
              active: props.quest.Status === 'FINISHED'
            }
          ]}
          onClick={updateQuestCompleted}
        />
      </div>
      <div className='col-sm-4'>
        <div className='centered'>
          <p>
            <b>Type: </b>
            {props.quest.Type}
          </p>
          <p>
            <b>Client: </b>
            {props.quest.Client}
          </p>
        </div>
      </div>
      <div className='col-sm-4'>
        <div className='centered'>
          <b>Location:</b>
          <p>{props.quest.Location}</p>
          <p>{props.quest.Area}</p>
        </div>
      </div>
    </div>
  </CollapsibleComponent>
}