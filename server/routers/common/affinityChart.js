const { sequelize } = require('../../models')
const Sequelize = require('sequelize');

module.exports = {
  getAffinityCharts: async function() {
    const charts = await sequelize.query(`
      SELECT
        ac.id as treeId,
        acb.id as branchId,
        acb.BranchName,
        acn.id as nodeId,
        acn.SkillLevel,
        acn.Effect,
        acn.Available,
        acn.Unlocked,
        CASE
          WHEN acn.id = acb.NodeAffinity1 THEN 1
          WHEN acn.id = acb.NodeAffinity2 THEN 2
          WHEN acn.id = acb.NodeAffinity3 THEN 3
          WHEN acn.id = acb.NodeAffinity4 THEN 4
          WHEN acn.id = acb.NodeAffinity5 THEN 5
        END AS Tier
      FROM xenoblade2_guide.affinityCharts as ac
      RIGHT JOIN xenoblade2_guide.affinityChartBranches as acb
        ON (acb.id = ac.AffinityBranch AND ac.AffinityBranch IS NOT NULL)
        OR (acb.id = ac.BladeSpecialBranch1 AND ac.BladeSpecialBranch1 IS NOT NULL)
        OR (acb.id = ac.BladeSpecialBranch2 AND ac.BladeSpecialBranch2 IS NOT NULL)
        OR (acb.id = ac.BladeSpecialBranch3 AND ac.BladeSpecialBranch3 IS NOT NULL)
        OR (acb.id = ac.BattleSkillBranch1 AND ac.BattleSkillBranch1 IS NOT NULL)
        OR (acb.id = ac.BattleSkillBranch2 AND ac.BattleSkillBranch2 IS NOT NULL)
        OR (acb.id = ac.BattleSkillBranch3 AND ac.BattleSkillBranch3 IS NOT NULL)
        OR (acb.id = ac.FieldSkillBranch1 AND ac.FieldSkillBranch1 IS NOT NULL)
        OR (acb.id = ac.FieldSkillBranch2 AND ac.FieldSkillBranch2 IS NOT NULL)
        OR (acb.id = ac.FieldSkillBranch3 AND ac.FieldSkillBranch3 IS NOT NULL)
      RIGHT JOIN xenoblade2_guide.affinityChartNodes as acn
        ON (acn.id = acb.NodeAffinity1 AND acb.NodeAffinity1 IS NOT NULL)
        OR (acn.id = acb.NodeAffinity2 AND acb.NodeAffinity2 IS NOT NULL)
        OR (acn.id = acb.NodeAffinity3 AND acb.NodeAffinity3 IS NOT NULL)
        OR (acn.id = acb.NodeAffinity4 AND acb.NodeAffinity4 IS NOT NULL)
        OR (acn.id = acb.NodeAffinity5 AND acb.NodeAffinity5 IS NOT NULL)
      `, { type: Sequelize.QueryTypes.SELECT })

    const mappedCharts = charts.reduce((prev, curr) => {
      const treeList = prev[curr.treeId];

      const nodeDetails = {
        nodeId: curr.nodeId,
        skillLevel: curr.SkillLevel,
        effect: JSON.parse(curr.Effect),
        available: curr.Available === 1,
        unlocked: curr.Unlocked === 1,
        tier: curr.Tier
      };

      if (treeList) {
        const treeBranch = treeList[curr.branchId];
        return {
          ...prev,
          [curr.treeId]: {
            ...treeList,
            [curr.branchId]: {
              branchName: treeBranch?.branchName || curr.BranchName,
              nodes: (treeBranch?.nodes || []).concat(nodeDetails)
            }
          }
        }
      }
      return {
        ...prev,
        [curr.treeId]: {
          [curr.branchId]: {
            branchName: curr.BranchName,
            nodes: [nodeDetails]
          }
        }
      }
    }, {});

    return mappedCharts;
  }
}