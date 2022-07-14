import createReducer from 'redux-action-reducer';
import { IAffinityChart, IAffinityChartBranch, IAffinityChartNode, IBlade } from '../../interfaces';
import { BladeActions } from '../actions/blades';
import {
  IAffinityChartBranchState,
  IAffinityChartNodeState,
  IBladeState,
  IUpdateShow
} from '../interfaces/reduxState';

export const bladesReducer = createReducer<IBladeState[]>(
  [BladeActions.SetBlade, (bladeState:IBladeState[], blades:IBlade[]) => {
    const bladeIds = blades.map((b) => b.id);
    return bladeState.filter((old) => !bladeIds.includes(old.id))
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
  [BladeActions.UpdateBladeUnlocked, (bladeState:IBladeState[], updateUnlocked: IBladeState) =>
    bladeState.filter((blade) => blade.id !== updateUnlocked.id)
      .concat([updateUnlocked]).sort((bladeA, bladeB) =>
        bladeA.id < bladeB.id ? -1 : 1
      )
  ],
  [BladeActions.SetBladeSkillTree, (bladeState:IBladeState[], tree:IAffinityChart[]) => {
    let updatedBlades:IBladeState[] = [];

    tree.forEach((newTree) => {
      const foundBlade = updatedBlades.find((blade) => blade.affinityChart.id === newTree.id)
        || bladeState.find((blade) => blade.affinityChart.id === newTree.id);
      if (foundBlade) {
        const branches:IAffinityChartBranchState[] = []
    
        Object.entries(newTree).map((value) => {
          if (value[0] !== 'id' && value[1] !== null) branches.push({
            id: parseInt(value[1]),
            branchName: '',
            nodes: [] as IAffinityChartNodeState[]
          })
        })

        updatedBlades = updatedBlades.filter((blade) => blade.id !== foundBlade.id)
          .concat({
            ...foundBlade,
            affinityChart: {
              id: foundBlade.affinityChart.id,
              branches
            }    
          })
      }
    })

    if (updatedBlades.length === 0) {
      return bladeState;
    }

    return bladeState
      .filter((blade) =>
        !updatedBlades.map((updated) => updated.id).includes(blade.affinityChart.id))
      .concat(updatedBlades).sort((bladeA, bladeB) =>
        bladeA.id < bladeB.id ? -1 : 1
      )
  }],
  [BladeActions.SetBladeSkillBranch,
    (bladeState:IBladeState[], bladeBranches:IAffinityChartBranch[]) => {
      let updatedBlades: IBladeState[] = [];

      bladeBranches.forEach((branch) => {
        let branchFound = false;
        bladeState.some((blade) => {
          if (branchFound) {
            return true;
          }
          const foundBlade = updatedBlades.find((old) => old.id === blade.id) || blade;
          const foundBranch = foundBlade.affinityChart.branches
            .find((oldBranch) => oldBranch.id === branch.id);
          if (foundBranch) {
            const nodes:IAffinityChartNodeState[] = []
          
            Object.entries(branch).map((value) => {
              if (value[0] !== 'id' && value[0] !== 'BranchName' && value[1] !== null) nodes.push({
                id: parseInt(value[1]),
                Name: '',
                SkillLevel: 0,
                Effect: '',
                Available: false,
                Unlocked: false,
                Tier: parseInt(value[0][value[0].length - 1])
              })
            })
            updatedBlades = updatedBlades.filter((old) => old.id !== foundBlade.id)
              .concat({
                ...foundBlade,
                affinityChart: {
                  id: foundBlade.affinityChart.id,
                  branches: foundBlade.affinityChart.branches
                    .filter((oldBranch) => oldBranch.id !== branch.id)
                    .concat([{
                      id: branch.id,
                      branchName: branch.BranchName,
                      nodes
                    }]).sort((branchA, branchB) =>
                      branchA.id < branchB.id ? -1 : 1
                    )
                }      
              })
            branchFound = true;
          }
          return false;
        })
      })

      if (updatedBlades.length === 0) {
        return bladeState;
      }

      return bladeState
        .filter((blade) => !updatedBlades.map((update) => update.id).includes(blade.id))
        .concat(updatedBlades).sort((bladeA, bladeB) =>
          bladeA.id < bladeB.id ? -1 : 1
        )
    }
  ],
  [BladeActions.SetBladeSkillNode, (bladeState:IBladeState[], bladeNodes:IAffinityChartNode[]) => {
    let updatedBlades: IBladeState[] = [];

    bladeNodes.forEach((node) => {
      let nodeFound = false;
      bladeState.some((blade) => {
        if (nodeFound) {
          return true;
        }

        const foundBlade = updatedBlades.find((old) => old.id === blade.id) || blade;
        let foundNode:IAffinityChartNodeState | undefined = undefined;
        const foundBranch = foundBlade.affinityChart.branches
          .find((oldBranch) => {
            oldBranch.nodes.find((oldNode) => {
              if (oldNode.id === node.id) {
                foundNode = {
                  ...node,
                  Tier: oldNode.Tier
                };
                return true;
              }
              return false;
            })
            if (foundNode !== undefined) {
              return true;
            }
            return false;
          })

        if (foundBranch && foundNode !== undefined) {
          updatedBlades = updatedBlades.filter((old) => old.id !== foundBlade.id)
            .concat({
              ...foundBlade,
              affinityChart: {
                id: foundBlade.affinityChart.id,
                branches: foundBlade.affinityChart.branches
                  .filter((oldBranch:IAffinityChartBranchState) => oldBranch.id !== foundBranch.id)
                  .concat([{
                    ...foundBranch,
                    nodes: foundBranch.nodes.filter((oldNode) => oldNode.id !== foundNode?.id)
                      .concat(foundNode).sort((nodeA, nodeB) =>
                        nodeA.id < nodeB.id ? -1 : 1
                      )
                  }]).sort((branchA, branchB) =>
                    branchA.id < branchB.id ? -1 : 1
                  )
              }
            })
        }
      })
    })

    if (updatedBlades.length === 0) {
      return bladeState;
    }

    return bladeState
      .filter((blade) =>!updatedBlades.map((update) => update.id).includes(blade.id))
      .concat(updatedBlades).sort((bladeA, bladeB) =>
        bladeA.id < bladeB.id ? -1 : 1
      )
  }]
)([]);
