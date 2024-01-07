import { IHeart2Heart, IMercMission, IMonster, IQuest } from 'interfaces';
import { IAffinityChartBranchState, IAffinityChartNodeState, IBladeState } from './reduxState';
import { IRequirement } from 'interfaces/common';

export interface IRequirementAvailability extends IRequirement {
  available: boolean
}
  
export interface IAffinityChartNodeAvailability extends IAffinityChartNodeState {
  available: boolean,
  preReqs?: IRequirementAvailability[]
}

export interface IAffinityChartBranchAvailability extends IAffinityChartBranchState {
  nodes: IAffinityChartNodeAvailability[]
}  

export interface IBladeAvailability extends IBladeState {
  available: boolean,
  affinityChart: IAffinityChartBranchAvailability[],
  prerequisites?: IRequirementAvailability[]
}

export interface IHeart2HeartAvailability extends IHeart2Heart {
  Available: boolean,
  PreReqs?: IRequirementAvailability[]
}

export interface IMercMissionAvailability extends IMercMission {
  Available: boolean,
  Prerequisites?: IRequirementAvailability[],
  Requirements: IRequirementAvailability[]
}

export interface IQuestAvailability extends IQuest {
  Available: boolean,
  PreReqs?: IRequirementAvailability[]
}

export interface IMonsterAvailability extends IMonster {
  Available: boolean
}
