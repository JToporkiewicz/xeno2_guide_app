import createReducer from 'redux-action-reducer';
import { IAffinityChart, IAffinityChartBranch, IAffinityChartNode, IBlade } from '../../interfaces';
import { BladeActions } from '../actions/blades';
import { defaultBladeAffinityBranch, defaultBladeAffinityNode } from '../interfaces/blades';
import {
  IAffinityChartBranchState,
  IAffinityChartNodeState,
  IBladeState,
  IUpdateShow
} from '../interfaces/reduxState';

export const bladesReducer = createReducer<IBladeState[]>(
  [BladeActions.SetBlade, (bladeState:IBladeState[], blade:IBlade) => {
    return bladeState.filter((old) => old.id !== blade.id)
      .concat({
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
      }).sort((bladeA, bladeB) =>
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
  [BladeActions.UpdateBladeUnlocked, (bladeState:IBladeState[], updateUnlocked: IBladeState) => {
    const oldBlade = bladeState.find((blade) => blade.id === updateUnlocked.id);
    if (!oldBlade) {
      return bladeState;
    }

    return bladeState.filter((blade) => blade.id !== updateUnlocked.id)
      .concat([{
        ...oldBlade,
        unlocked: updateUnlocked.unlocked
      }]).sort((bladeA, bladeB) =>
        bladeA.id < bladeB.id ? -1 : 1
      )
  }],
  [BladeActions.SetBladeSkillTree, (bladeState:IBladeState[], tree:IAffinityChart) => {
    const foundBlade = bladeState.find((blade) => blade.affinityChart.id === tree.id);
    if (!foundBlade) {
      return bladeState;
    }

    const branches:IAffinityChartBranchState[] = []
    
    Object.entries(tree).map((value) => {
      if (value[0] !== 'id' && value[1] !== null) branches.push({
        id: parseInt(value[1]),
        branchName: '',
        nodes: [] as IAffinityChartNodeState[]
      })
    })
    return bladeState.filter((blade) => blade.affinityChart.id !== tree.id)
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
    (bladeState:IBladeState[], bladeBranch:IAffinityChartBranch) => {
      let oldBranch:any = undefined;
      const foundBlade = bladeState
        .find((blade) => {
          const result = blade.affinityChart.branches
            .find((branch) => branch.id === bladeBranch.id);
          if(result) {
            oldBranch = result;
            return true;
          }
          return false;          
        });
      if (!foundBlade) {
        return bladeState;
      }

      const nodes:IAffinityChartNodeState[] = []
    
      Object.entries(bladeBranch).map((value) => {
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

      return bladeState.filter((blade) => blade.id !== foundBlade.id)
        .concat([{
          ...foundBlade,
          affinityChart: {
            id: foundBlade.affinityChart.id,
            branches: foundBlade.affinityChart.branches
              .filter((branch) => branch.id !== oldBranch.id)
              .concat([{
                id: oldBranch.id,
                branchName: bladeBranch.BranchName,
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
  [BladeActions.SetBladeSkillNode, (bladeState:IBladeState[], bladeNode:IAffinityChartNode) => {
    let foundBlade:any = undefined;
    let foundBranch:IAffinityChartBranchState = defaultBladeAffinityBranch;
    let foundNode:IAffinityChartNodeState = defaultBladeAffinityNode;
    bladeState.map((blade) => {
      if (!foundBlade) {
        blade.affinityChart.branches
          .map((branch) => {
            if (!foundBlade) {
              branch.nodes
                .map((node) => {
                  if (node.id === bladeNode.id) {
                    foundBlade = blade;
                    foundBranch = branch;
                    foundNode = node;
                  }
                })
            }
          })
      }
    });
    if (!foundBlade) {
      return bladeState;
    }

    return bladeState.filter((blade) => blade.id !== foundBlade.id)
      .concat([{
        ...foundBlade,
        affinityChart: {
          id: foundBlade.affinityChart.id,
          branches: foundBlade.affinityChart.branches
            .filter((branch:IAffinityChartBranchState) => branch.id !== foundBranch.id)
            .concat([{
              ...foundBranch,
              nodes: foundBranch.nodes.filter((node) => node.id !== bladeNode.id)
                .concat([{
                  id: bladeNode.id,
                  Name: bladeNode.Name,
                  SkillLevel: bladeNode.SkillLevel,
                  Effect: bladeNode.Effect,
                  Available: bladeNode.Available,
                  Unlocked: bladeNode.Unlocked,
                  Tier: foundNode.Tier
                }]).sort((nodeA, nodeB) =>
                  nodeA.id < nodeB.id ? -1 : 1
                )
            }]).sort((branchA:IAffinityChartBranchState, branchB:IAffinityChartBranchState) =>
              branchA.id < branchB.id ? -1 : 1
            )
        }
      }]).sort((bladeA, bladeB) =>
        bladeA.id < bladeB.id ? -1 : 1
      )
  }]
)([]);
