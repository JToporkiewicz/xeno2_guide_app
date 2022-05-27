import createReducer from 'redux-action-reducer';
import { IAffinityChartNode, IBlade } from '../../interfaces';
import { BladeActions } from '../actions/blades';
import { IBladeBranchResponse, IBladeNodeResponse, IBladeTreeResponse } from '../interfaces/blades';
import { IAffinityChartBranchState, IBladeState, IUpdateShow } from '../interfaces/reduxState';

export const bladesReducer = createReducer<IBladeState[]>(
  [BladeActions.SetBlade, (bladeState:IBladeState[], blades:IBlade[]) => {
    const newBladeIds = blades.map((driver:IBlade) => driver.id)
    return bladeState.filter((old) => !newBladeIds.includes(old.id))
      .concat(blades.map((blade) => ({
        id: blade.id,
        name: blade.Name,
        gender: blade.Gender,
        type: blade.Type,
        weapon: blade.Weapon,
        element: blade.Element,
        role: blade.Role,
        auxCoreCount: blade.AuxCoreCount,
        source: blade.Source,
        heart2heartId: blade.Heart2Heart,
        bladeQuestId: blade.BladeQuest,
        affinityChart: {
          id: blade.AffinityChart,
          branches: [] as IAffinityChartBranchState[]
        },
        favItem1: blade.FavItem1,
        favItem2: blade.FavItem2,
        favItemType1: blade.FavItemType1,
        favItemType2: blade.FavItemType2,
        unlocked: blade.Unlocked,
        available: blade.Available,
        show: false
      }))).sort((bladeA, bladeB) =>
        bladeA.id < bladeB.id ? -1 : 1
      )
  }],
  [BladeActions.UpdateShowBlade, (bladeState:IBladeState[], updateShow: IUpdateShow) => {
    const oldBlade = bladeState.find((blade) => blade.id === updateShow.id);
    if (!oldBlade) {
      return bladeState;
    }

    return bladeState.filter((blade) => blade.id !== updateShow.id)
      .concat([{
        ...oldBlade,
        show: updateShow.show
      }]).sort((bladeA, bladeB) =>
        bladeA.id < bladeB.id ? -1 : 1
      )
  }],
  [BladeActions.SetBladeSkillTree, (bladeState:IBladeState[], bladeChart:IBladeTreeResponse) => {
    const foundBlade = bladeState.find((blade) => blade.affinityChart.id === bladeChart.treeId);
    if (!foundBlade) {
      return bladeState;
    }

    const branches:IAffinityChartBranchState[] = []
    
    Object.entries(bladeChart.tree).map((value) => {
      if (value[0] !== 'id' && value[1] !== null) branches.push({
        id: parseInt(value[1]),
        branchName: '',
        nodes: [] as IAffinityChartNode[]
      })
    })
    return bladeState.filter((blade) => blade.affinityChart.id !== bladeChart.treeId)
      .concat([{
        ...foundBlade,
        affinityChart: {
          id: foundBlade.affinityChart.id,
          branches
        }
      }]).sort((bladeA, bladeB) =>
        bladeA.id < bladeB.id ? -1 : 1
      )
  }],
  [BladeActions.SetBladeSkillBranch,
    (bladeState:IBladeState[], bladeBranch:IBladeBranchResponse) => {
      const foundBlade = bladeState.find((blade) => blade.affinityChart.id === bladeBranch.treeId);
      if (!foundBlade) {
        return bladeState;
      }

      const nodes:IAffinityChartNode[] = []
    
      Object.entries(bladeBranch.branch).map((value) => {
        if (value[0] !== 'id' && value[0] !== 'BranchName' && value[1] !== null) nodes.push({
          id: parseInt(value[1]),
          Name: '',
          SkillLevel: 0,
          Effect: '',
          Available: false,
          Unlocked: false
        })
      })

      return bladeState.filter((blade) => blade.affinityChart.id !== bladeBranch.treeId)
        .concat([{
          ...foundBlade,
          affinityChart: {
            id: foundBlade.affinityChart.id,
            branches: foundBlade.affinityChart.branches
              .filter((branch) => branch.id !== bladeBranch.branchId)
              .concat([{
                id: bladeBranch.branchId,
                branchName: bladeBranch.branch.BranchName,
                nodes
              }]).sort((branchA, branchB) =>
                branchA.id < branchB.id ? -1 : 1
              )
          }
        }]).sort((bladeA, bladeB) =>
          bladeA.id < bladeB.id ? -1 : 1
        )
    }
  ],
  [BladeActions.SetBladeSkillNode, (bladeState:IBladeState[], bladeNode:IBladeNodeResponse) => {
    const foundBlade = bladeState.find((blade) => blade.affinityChart.id === bladeNode.treeId);
    if (!foundBlade) {
      return bladeState;
    }
    const foundBranch = foundBlade.affinityChart.branches
      .find((branch) => branch.id === bladeNode.branchId);

    if (!foundBranch) {
      return bladeState;
    }

    return bladeState.filter((blade) => blade.affinityChart.id !== bladeNode.treeId)
      .concat([{
        ...foundBlade,
        affinityChart: {
          id: foundBlade.affinityChart.id,
          branches: foundBlade.affinityChart.branches
            .filter((branch) => branch.id !== bladeNode.branchId)
            .concat([{
              ...foundBranch,
              nodes: foundBranch.nodes.filter((node) => node.id !== bladeNode.nodeId)
                .concat([{
                  id: bladeNode.nodeId,
                  Name: bladeNode.node.Name,
                  SkillLevel: bladeNode.node.SkillLevel,
                  Effect: bladeNode.node.Effect,
                  Available: bladeNode.node.Available,
                  Unlocked: bladeNode.node.Unlocked      
                }]).sort((nodeA, nodeB) =>
                  nodeA.id < nodeB.id ? -1 : 1
                )
            }]).sort((branchA, branchB) =>
              branchA.id < branchB.id ? -1 : 1
            )
        }
      }]).sort((bladeA, bladeB) =>
        bladeA.id < bladeB.id ? -1 : 1
      )
  }]
)([]);
