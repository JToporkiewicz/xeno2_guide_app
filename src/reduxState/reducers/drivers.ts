import createReducer from 'redux-action-reducer';
import { IDriver } from 'interfaces';
import {
  IDriverState,
  IUpdateShow
} from '../interfaces/reduxState';
import { DriverActions } from '../actions/drivers';
import { IDriverArtUpdateLevelUnlocked, IDriverSkillNodeUpdate } from '../interfaces/drivers';

export const driversReducer = createReducer<IDriverState[]>(
  [DriverActions.SetDriverDetails, (driverState:IDriverState[], drivers:IDriver[]) => {
    const driverIds = drivers.map((driver) => driver.id);

    return driverState.filter((oldDriver:IDriverState) => !driverIds.includes(oldDriver.id))
      .concat(drivers.map((driver) => {
        return {
          ...driver,
          show: false
        }
      })).sort((driverA, driverB) =>
        driverA.id < driverB.id ? -1 : 1
      )
  }],
  [DriverActions.UpdateShowDriver, (driverState:IDriverState[], updateShow: IUpdateShow) => {
    const oldDriver = driverState.find((driver) => driver.id === updateShow.id);
    if (!oldDriver) {
      return driverState;
    }

    return driverState.filter((driver) => driver.id !== updateShow.id)
      .concat([{
        ...oldDriver,
        show: updateShow.show
      }]).sort((driverA, driverB) =>
        driverA.id < driverB.id ? -1 : 1
      )
  }],
  [DriverActions.SetDriverSkillNode,
    (driverState:IDriverState[], nodeDetails:IDriverSkillNodeUpdate) => {
      const oldDriver = driverState.find((driver) =>
        driver.skillTree.treeId === nodeDetails.treeId
        || driver.hiddenSkillTree.treeId === nodeDetails.treeId);
      if (!oldDriver) {
        return driverState;
      }

      const nodeList = nodeDetails.nodes.map((n) => n.nodeId)

      return driverState.filter((dr) => dr.id !== oldDriver.id)
        .concat({
          ...oldDriver,
          skillTree: {
            ...oldDriver.skillTree,
            tier1: oldDriver.skillTree.tier1.map((node) => {
              if (nodeList.includes(node.nodeId)) {
                return {
                  ...node,
                  unlocked: nodeDetails.nodes.find((n) => n.nodeId === node.nodeId)?.unlocked
                    || false
                }
              }
              return node
            }).sort((nodeA, nodeB) =>
              nodeA.nodeId < nodeB.nodeId ? -1 : 1
            ),
            tier2: oldDriver.skillTree.tier2.map((node) => {
              if (nodeList.includes(node.nodeId)) {
                return {
                  ...node,
                  unlocked: nodeDetails.nodes.find((n) => n.nodeId === node.nodeId)?.unlocked
                    || false
                }
              }
              return node
            }).sort((nodeA, nodeB) =>
              nodeA.nodeId < nodeB.nodeId ? -1 : 1
            ),
            tier3: oldDriver.skillTree.tier3.map((node) => {
              if (nodeList.includes(node.nodeId)) {
                return {
                  ...node,
                  unlocked: nodeDetails.nodes.find((n) => n.nodeId === node.nodeId)?.unlocked
                    || false
                }
              }
              return node
            }).sort((nodeA, nodeB) =>
              nodeA.nodeId < nodeB.nodeId ? -1 : 1
            )
          },
          hiddenSkillTree: {
            ...oldDriver.skillTree,
            tier1: oldDriver.hiddenSkillTree.tier1.map((node) => {
              if (nodeList.includes(node.nodeId)) {
                return {
                  ...node,
                  unlocked: nodeDetails.nodes.find((n) => n.nodeId === node.nodeId)?.unlocked
                    || false
                }
              }
              return node
            }).sort((nodeA, nodeB) =>
              nodeA.nodeId < nodeB.nodeId ? -1 : 1
            ),
            tier2: oldDriver.hiddenSkillTree.tier2.map((node) => {
              if (nodeList.includes(node.nodeId)) {
                return {
                  ...node,
                  unlocked: nodeDetails.nodes.find((n) => n.nodeId === node.nodeId)?.unlocked
                    || false
                }
              }
              return node
            }).sort((nodeA, nodeB) =>
              nodeA.nodeId < nodeB.nodeId ? -1 : 1
            ),
            tier3: oldDriver.hiddenSkillTree.tier3.map((node) => {
              if (nodeList.includes(node.nodeId)) {
                return {
                  ...node,
                  unlocked: nodeDetails.nodes.find((n) => n.nodeId === node.nodeId)?.unlocked
                    || false
                }
              }
              return node
            }).sort((nodeA, nodeB) =>
              nodeA.nodeId < nodeB.nodeId ? -1 : 1
            )
          }

        })
    }],
  [DriverActions.UpdateDriverArtLevelUnlocked,
    (driverState:IDriverState[], artListPayload:IDriverArtUpdateLevelUnlocked) => {
      const oldDriver = driverState.find((old:IDriverState) => old.id === artListPayload.driverId)
      if (!oldDriver) {
        return driverState;
      }

      const updatedNode = oldDriver.arts.find((list) => list.id === artListPayload.artId);
      if (!updatedNode) {
        return driverState;
      }

      const artListNode = oldDriver.arts.filter((list) => list.id !== artListPayload.artId);

      return driverState.filter((old:IDriverState) => old.id !== oldDriver.id)
        .concat([{
          ...oldDriver,
          arts: artListNode.concat({
            ...updatedNode,
            levelUnlocked: artListPayload.levelUnlocked
          })
            .sort((artA, artB) =>
              artA.id < artB.id ? -1 : 1
            )
        }]).sort((driverA, driverB) =>
          driverA.id < driverB.id ? -1 : 1
        )
    }],
)([]);
