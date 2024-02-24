import { IDriverArts, IDriverSkillTree } from 'interfaces';
import { IAffinityChartBranchAvailability } from 'reduxState/interfaces/availabilityState';

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

export const getACCompletion = (affinityChart: IAffinityChartBranchAvailability[]) => {
  const highestTier = affinityChart.find((node) =>
    node.branchName === 'Affinity')?.nodes.filter((n) =>
    n.preReqs && n.preReqs.filter((p) => !p.available).length !== 0)?.at(0)?.skillLevel || 0;
  return {
    total: affinityChart.reduce((branchTotal, branch) =>
      branch.nodes.filter((node) => node.preReqs !== undefined).length + branchTotal, 0),
    unlocked: affinityChart.reduce((branchTotal, branch) => branch.nodes
      .filter((node) => node.unlocked && node.preReqs !== undefined).length + branchTotal, 0),
    available: affinityChart.reduce((branchTotal, branch) => {
      const firstUnavailable = branch.nodes.filter((n) =>
        n.preReqs && n.preReqs.filter((p) => !p.available).length !== 0)?.at(0)?.skillLevel || 0;
      return branch.nodes.filter((node) =>
        (highestTier === 0 || node.tier < highestTier)
        && (firstUnavailable === 0 || node.skillLevel < firstUnavailable)
        && node.preReqs !== undefined
        && node.preReqs.filter((p) => !p.available).length === 0
      ).length + branchTotal}, 0)
  }
}

export const getTrustNodesCompletion = (affinityChart: IAffinityChartBranchAvailability[]) => ({
  total: affinityChart.reduce((branchTotal, branch) =>
    branch.nodes.filter((node) =>
      node.preReqs?.find((p) =>
        p.requirement === 'Trust')).length + branchTotal, 0),
  unlocked: affinityChart.reduce((branchTotal, branch) =>
    branch.nodes.filter((node) =>
      node.preReqs?.find((p) =>
        p.requirement === 'Trust') && node.unlocked).length + branchTotal, 0),
})