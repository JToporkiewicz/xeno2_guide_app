import CollapsibleComponent from 'components/CommonComponents/Containers/CollapsibleComponent';
import { ProgressStatusDetails } from '../ProgressStatusDetails';

export interface IProgressList {
  [name:string]: {
    total: number,
    unlocked: number,
    id?: number
  }
}

interface IProps {
  driverArts: IProgressList,
  driverSkills: IProgressList,
  driverHiddenSkills?: IProgressList,
  bladesUnlocked: IProgressList,
  bladeAffinitySkills: IProgressList,
  questsFinished: IProgressList,
  h2hUnlocked: IProgressList,
  mercMissionCompleted: IProgressList,
  monstersBeaten: IProgressList,
  challengesBeaten: IProgressList
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
      {props.driverHiddenSkills &&
        <ProgressStatusDetails
          list={props.driverHiddenSkills}
          listTitle="Driver Hidden Skills Unlocked:"
        />
      }
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
      <b>Merc Missions:</b>
      <ProgressStatusDetails
        list={props.mercMissionCompleted}
        listTitle="Merc Missions Completed:"
      />
      <b>Monsters:</b>
      <ProgressStatusDetails
        list={props.monstersBeaten}
        listTitle="Unique Monsters Beaten:"
      />
      <b>Challenge Battles:</b>
      <ProgressStatusDetails
        list={props.challengesBeaten}
        listTitle='DLC Challenge Battles Beaten:'
      />
    </>
  </CollapsibleComponent>
  
