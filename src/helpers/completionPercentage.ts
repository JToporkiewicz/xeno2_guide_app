import { IDriverArts, IDriverSkillTree } from 'interfaces';
import { IAffinityChartBranchState } from 'reduxState/interfaces/reduxState';

export const getDACompletion = (driverArts: IDriverArts[]) => ({
  total: driverArts.length * 5,
  unlocked: driverArts.reduce((artTotal, art) => artTotal + art.levelUnlocked - 1, 0)
})

export const getDSCompletion = (skillTree: IDriverSkillTree) => ({
  total: skillTree.tier1.length + skillTree.tier2.length + skillTree.tier3.length,
  unlocked: skillTree.tier1.filter((node) => node.unlocked).length
    + skillTree.tier2.filter((node) => node.unlocked).length
    + skillTree.tier3.filter((node) => node.unlocked).length
})

export const getACCompletion = (affinityChart: IAffinityChartBranchState[]) => ({
  total: affinityChart.reduce((branchTotal, branch) =>
    branch.nodes.filter((node) => node.preReqs !== undefined).length + branchTotal, 0),
  unlocked: affinityChart.reduce((branchTotal, branch) => branch.nodes
    .filter((node) => node.unlocked && node.preReqs !== undefined).length + branchTotal, 0)
})