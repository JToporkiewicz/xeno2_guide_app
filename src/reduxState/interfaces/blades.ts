export const defaultBladeAffinityNode = {
  nodeId:0,
  skillLevel:0,
  effect:'',
  unlocked:false,
  tier: 0
}

export const defaultBladeAffinityBranch = {
  branchId: 0,
  branchName: '',
  nodes: []
}

export const defaultBladeAvailability = {
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
  affinityChart: [],
  favItem1:0,
  favItem2:0,
  favItemType1:0,
  favItemType2:0,
  unlocked: false,
  show:false,
  available: false
}

export interface IUpdateACNReqProgress {
  bladeId: number,
  branchId: number,
  nodeId: number,
  id: number,
  progress: number
}
