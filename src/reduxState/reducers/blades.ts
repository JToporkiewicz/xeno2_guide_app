import createReducer from 'redux-action-reducer';
import { IAffinityChartNode, IBlade } from 'interfaces';
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
        affinityChart: blade.AffinityChart,
        favItem1: blade.FavItem1,
        favItem2: blade.FavItem2,
        favItemType1: blade.FavItemType1,
        favItemType2: blade.FavItemType2,
        unlocked: blade.Unlocked,
        available: blade.Available,
        prerequisites: blade.Prerequisites,
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
        const foundBranch = foundBlade.affinityChart
          .find((oldBranch) => {
            oldBranch.nodes.find((oldNode) => {
              if (oldNode.nodeId === node.nodeId) {
                foundNode = node;
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
              affinityChart: foundBlade.affinityChart
                .filter((oldBranch:IAffinityChartBranchState) =>
                  oldBranch.branchId !== foundBranch.branchId)
                .concat([{
                  ...foundBranch,
                  nodes: foundBranch.nodes.filter((oldNode) => oldNode.nodeId !== foundNode?.nodeId)
                    .concat(foundNode).sort((nodeA, nodeB) =>
                      nodeA.nodeId < nodeB.nodeId ? -1 : 1
                    )
                }]).sort((branchA, branchB) =>
                  branchA.branchId < branchB.branchId ? -1 : 1
                )
            }
            )
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
