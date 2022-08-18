import CollapsibleComponent from 'components/CommonComponents/Containers/CollapsibleComponent';
import { OptionsCheckbox } from 'components/CommonComponents/FormComponents/OptionsCheckbox';
import { useRef, useEffect } from 'react';
import { IQuestState } from 'reduxState/interfaces/reduxState';

interface IDispatchProps {
  updateQuestStatus: (payload:IQuestState) => void;
  saveQuestStatus: (payload:IQuestState) => void;
}

interface IProps {
  quest: IQuestState
}

export const SideQuestBasicInfoView = (props:IProps & IDispatchProps) => {
  const questToUpdate = useRef(props.quest.id !== 0 ? props.quest : undefined);

  const updateQuestCompleted = (status:string | boolean) => {
    if(props.quest && typeof status === 'string') {
      questToUpdate.current = {
        ...props.quest,
        Status: status
      }

      props.updateQuestStatus({
        ...props.quest,
        Status: status
      })
    }
  }

  useEffect(() => {
    return () => {
      if (questToUpdate.current) {
        props.saveQuestStatus(questToUpdate.current);
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