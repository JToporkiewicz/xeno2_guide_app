import CollapsibleComponent from '../../CommonComponents/Containers/CollapsibleComponent';
import { ProgressStatusDetails } from '../ProgressStatusDetails';

export interface IProgressList {
  [name:string]: {
    total: number,
    unlocked: number
  }
}

interface IProps {
  driverArts: IProgressList,
  driverSkills: IProgressList,
  driverHiddenSkills: IProgressList
}

export const ProgressStatusView = (props: IProps) => 
  <CollapsibleComponent header="Progress Status">
    <>
      <b>Drivers:</b>
      <ProgressStatusDetails
        list={props.driverArts}
        listTitle="Driver Arts"
      />
      <ProgressStatusDetails
        list={props.driverSkills}
        listTitle="Driver Skills"
      />
      <ProgressStatusDetails
        list={props.driverHiddenSkills}
        listTitle="Driver Hidden Skills"
      />

    </>
  </CollapsibleComponent>
  
