import { IAffinityChart, IAffinityChartBranch, IAffinityChartNode } from '../../interfaces'

export const defaultBladeAffinityChart = {
  id: 0,
  branches: []
}

export const defaultBladeState = {
  id: 0,
  name: '',
  gender: '',
  type: '',
  weapon: '',
  element: '',
  role: '',
  auxCoreCount: 0,
  source: '',
  heart2heartId: 0,
  bladeQuestId: 0,
  affinityChart: defaultBladeAffinityChart,
  favItem1:0,
  favItem2:0,
  favItemType1:0,
  favItemType2:0,
  unlocked: false,
  available: false,
  show:false
}

export interface IBladeTreeResponse {
  treeId: number,
  tree: IAffinityChart
};

export interface IBladeBranchRequest {
  treeId: number,
  branchId: number
};

export interface IBladeBranchResponse extends IBladeBranchRequest {
  branch: IAffinityChartBranch
};

export interface IBladeNodeRequest extends IBladeBranchRequest {
  nodeId: number,
  nodeTier: number
};

export interface IBladeNodeResponse extends IBladeNodeRequest {
  node: IAffinityChartNode
};
