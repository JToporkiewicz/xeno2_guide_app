import createReducer from 'redux-action-reducer';
import { IAffinityChartNode, IBlade } from 'interfaces';
import { BladeActions } from '../actions/blades';
import {
  IAffinityChartBranchState,
  IAffinityChartNodeState,
  IBladeState,
  IUpdateShow
} from '../interfaces/reduxState';
import { IUpdateACNReqProgress } from 'reduxState/interfaces/blades';
import { IBladeAvailability } from 'reduxState/interfaces/availabilityState';

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
        prerequisites: blade.Prerequisites,
        show: false
      }))).sort((bladeA, bladeB) =>
        Number(bladeA.id) < Number(bladeB.id) ? -1 : 1
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
        Number(bladeA.id) < Number(bladeB.id) ? -1 : 1
      )
  }],
  [BladeActions.UpdateBladeUnlocked,
    (bladeState:IBladeState[], updateAvailable: IBladeState | IBladeAvailability) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { available, ...updateUnlocked } = updateAvailable as IBladeAvailability;
      
      return bladeState.filter((blade) => blade.id !== updateUnlocked.id)
        .concat({
          ...updateUnlocked,
          affinityChart: updateUnlocked.affinityChart.map((ab, bIndex) => ({
            ...ab,
            nodes: ab.nodes.map((n, i) => {
              if (!updateUnlocked.unlocked) {
                return {
                  ...n,
                  unlocked: false
                }
              } else {
                if (i === 0 && (n.preReqs === undefined || n.preReqs.length === 0)) {
                  return {
                    ...n,
                    unlocked: true
                  }
                }
                else if (bIndex === 0 && i === 1) {
                  return {
                    ...n,
                    available: true
                  }
                }
                return {
                  ...n,
                  unlocked: false
                }
              }
            })
          }))
        }).sort((bladeA, bladeB) =>
          Number(bladeA.id) < Number(bladeB.id) ? -1 : 1
        )
    }],
  [BladeActions.SetBladeSkillNode, (bladeState:IBladeState[], bladeNodes:IAffinityChartNode[]) => {
    let updatedBlades: IBladeState[] = [];

    bladeNodes.forEach((node) => {
      let nodeFound = false;
      let highestNode = node.unlocked ? node.nodeId : node.nodeId - 1;
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
                  nodes: foundBranch.nodes.map((n) => {
                    if (n.nodeId < (foundNode?.nodeId || -1)) {
                      return n;
                    } else if (n.nodeId === foundNode?.nodeId) {
                      return foundNode
                    } else {
                      highestNode = highestNode + 1 === n.nodeId &&
                        (n.preReqs?.filter((oldP) => !oldP.completed)?.length || 0) === 0
                        ? n.nodeId : highestNode
                      return {
                        ...n,
                        unlocked: highestNode === n.nodeId
                      }
                    }
                  }).sort((nodeA, nodeB) =>
                    Number(nodeA.nodeId) < Number(nodeB.nodeId) ? -1 : 1
                  )
                }]).sort((branchA, branchB) =>
                  Number(branchA.branchId) < Number(branchB.branchId) ? -1 : 1
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
  }],
  [BladeActions.UpdateACNReqStatus, (bladeState:IBladeState[], progress: IUpdateACNReqProgress) => {
    const foundBlade = bladeState.find((b) => b.id === progress.bladeId);

    const foundBranch = foundBlade?.affinityChart.find((a) => a.branchId === progress.branchId);

    const foundNode = foundBranch?.nodes.find((n) => n.nodeId === progress.nodeId);

    const foundPre = foundNode?.preReqs?.find((pre) => pre.id === progress.id)

    if (!foundBlade || !foundBranch || !foundNode || !foundPre) {
      return bladeState;
    }

    let lastActiveId = 0

    return bladeState.filter((old) => old.id !== progress.bladeId)
      .concat({
        ...foundBlade,
        affinityChart: foundBlade.affinityChart
          .filter((oldA) => oldA.branchId !== progress.branchId)
          .concat({
            ...foundBranch,
            nodes: foundBranch.nodes.map((n) => {
              if (n.tier < foundNode.tier) {
                if (n.unlocked) {
                  lastActiveId = n.nodeId
                }
                return n;
              } else if (n.tier === foundNode.tier) {
                lastActiveId = lastActiveId + 1 === foundNode.nodeId &&
                  (n.preReqs?.filter((oldP) => oldP.id !== progress.id
                    && !oldP.completed
                    || oldP.id === progress.id
                    && oldP.requirementCount !== progress.progress)?.length|| 0) === 0 ?
                  foundNode.nodeId : lastActiveId
                return {
                  ...n,
                  unlocked: lastActiveId === foundNode.nodeId,
                  preReqs: n.preReqs?.filter((oldP) => oldP.id !== progress.id)
                    .concat({
                      ...foundPre,
                      progress: progress.progress,
                      completed: foundPre.requirementCount === progress.progress
                    })
                }
              } else {
                lastActiveId = lastActiveId + 1 === n.nodeId &&
                  (n.preReqs?.filter((oldP) =>!oldP.completed)?.length || 0) === 0
                  ? n.nodeId : lastActiveId
                return {
                  ...n,
                  unlocked: lastActiveId === n.nodeId
                }
              }
            })
          })
          .sort((branchA, branchB) =>
            branchA.branchId < branchB.branchId ? -1 : 1
          )
      }).sort((bladeA, bladeB) =>
        bladeA.id < bladeB.id ? -1 : 1
      )
  }]
)([]);
