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
  driverHiddenSkills: IProgressList,
  bladesUnlocked: IProgressList,
  bladeAffinitySkills: IProgressList,
  questsFinished: IProgressList,
  h2hUnlocked: IProgressList
}

export const ProgressStatusView = (props: IProps) => 
  <CollapsibleComponent header="Progress Status">
    <>
      <b>Drivers:</b>
      <ProgressStatusDetails
        list={props.driverArts}
        listTitle="Driver Arts Unlocked:"
      />
      <ProgressStatusDetails
        list={props.driverSkills}
        listTitle="Driver Skills Unlocked:"
      />
      <ProgressStatusDetails
        list={props.driverHiddenSkills}
        listTitle="Driver Hidden Skills Unlocked:"
      />
      <b>Blades:</b>
      <ProgressStatusDetails
        list={props.bladesUnlocked}
        listTitle="Unique Blades Unlocked:"
      />
      <ProgressStatusDetails
        list={props.bladeAffinitySkills}
        listTitle="Blade Affinity Skills Unlocked:"
      />
      <b>Quests:</b>
      <ProgressStatusDetails
        list={props.questsFinished}
        listTitle="Quests Finished:"
      />
      <b>Heart2hearts:</b>
      <ProgressStatusDetails
        list={props.h2hUnlocked}
        listTitle="Heart2hearts Viewed:"
      />
    </>
  </CollapsibleComponent>
  
