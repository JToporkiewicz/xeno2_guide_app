import createReducer from 'redux-action-reducer';
import {
  IDriver,
  IDriverArtDetails,
  IDriverArts,
  IDriverSkillNode,
  IDriverSkillTree
} from 'interfaces';
import {
  IDriverArtsState,
  IDriverState,
  ISkillTreeState,
  IUpdateShow
} from '../interfaces/reduxState';
import { DriverActions } from '../actions/drivers';
import {
  defaultSkillTree,
  IDriverArtUpdateLevelUnlocked,
  defaultSkillNode,
  defaultDriverArtNode
} from '../interfaces/drivers';

export const driversReducer = createReducer<IDriverState[]>(
  [DriverActions.SetDriverDetails, (driverState:IDriverState[], drivers:IDriver[]) => {
    const driverIds = drivers.map((driver) => driver.id);

    return driverState.filter((oldDriver:IDriverState) => !driverIds.includes(oldDriver.id))
      .concat(drivers.map((driver) => {
        const old = driverState.find((d) => d.id === driver.id);
        return {
          id: driver.id,
          name: driver.Name,
          chapterUnlocked: driver.ChapterUnlocked,
          arts: old ? old.arts : [],
          skillTree: old ?
            old.skillTree
            : { ...defaultSkillTree, treeId: driver.DriverSkillTree},
          hiddenSkillTree: old ?
            old.hiddenSkillTree
            : { ...defaultSkillTree, treeId: driver.HiddenSkillTree},
          favItem1: driver.FavItem1,
          favItem2: driver.FavItem2,
          favItemType1: driver.FavItemType1,
          favItemType2: driver.FavItemType2,
          ideaStats: driver.IdeaStats,
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
  [DriverActions.SetDriverSkillTree,
    (driverState:IDriverState[], driverSkillTree: IDriverSkillTree[]) => {
      const dstIds = driverSkillTree.map((dst) => dst.id);

      let newDrivers: IDriverState[] = [];
      driverSkillTree.forEach((dst) => {
        const oldDriver = driverState.find((driver) => driver.skillTree.treeId === dst.id
          || driver.hiddenSkillTree.treeId === dst.id);

        if (oldDriver) {
          const newTree: ISkillTreeState = {
            treeId: dst.id,
            tier1: Object.entries(dst)
              .filter((entry) => entry[0] !== 'id' && entry[0][4] === '1')
              .map((entry) => {
                return {
                  ...defaultSkillNode,
                  id: entry[1]
                }
              }),
            tier2: Object.entries(dst)
              .filter((entry) => entry[0] !== 'id' && entry[0][4] === '2')
              .map((entry) => {
                return {
                  ...defaultSkillNode,
                  id: entry[1]
                }
              }),
            tier3: Object.entries(dst)
              .filter((entry) => entry[0] !== 'id' && entry[0][4] === '3')
              .map((entry) => {
                return {
                  ...defaultSkillNode,
                  id: entry[1]
                }
              })
          };
          const existingNewDriver = newDrivers.find((d) => d.id === oldDriver.id);
          newDrivers = newDrivers.filter((d) => existingNewDriver === undefined
            || d.id !== existingNewDriver.id)
            .concat([{
              ...oldDriver,
              skillTree: oldDriver.skillTree.treeId === dst.id ?
                newTree : existingNewDriver && existingNewDriver.skillTree.tier1.length > 0 ?
                  existingNewDriver.skillTree : oldDriver.skillTree,
              hiddenSkillTree: oldDriver.hiddenSkillTree.treeId === dst.id ?
                newTree: existingNewDriver && existingNewDriver.hiddenSkillTree.tier1.length > 0 ?
                  existingNewDriver.hiddenSkillTree : oldDriver.hiddenSkillTree
            }])
        }
      })

      if (newDrivers.length === 0) {
        return driverState;
      }

      return driverState.filter((driver) => !dstIds.includes(driver.skillTree.treeId)
        && !dstIds.includes(driver.hiddenSkillTree.treeId))
        .concat(newDrivers).sort((driverA, driverB) =>
          driverA.id < driverB.id ? -1 : 1
        )
    }],
  [DriverActions.SetDriverSkillNode,
    (driverState:IDriverState[], nodeDetails:IDriverSkillNode[]) => {
      let oldDrivers:IDriverState[] = [];
      
      nodeDetails.forEach((details) => {
        let nodeFound = false;
        driverState.some((driver) => {
          if (nodeFound) {
            return true;
          }
          const foundDriver = oldDrivers.find((old) => old.id === driver.id) || driver;
          if (foundDriver.skillTree.tier1.find((node) => node.id === details.id)) {
            const newTree = {
              ...foundDriver.skillTree,
              tier1: foundDriver.skillTree.tier1.filter((node) => node.id !== details.id)
                .concat([details]).sort((nodeA, nodeB) =>
                  nodeA.id < nodeB.id ? -1 : 1
                )
            }
            oldDrivers = oldDrivers.filter((old) => foundDriver === undefined
            || old.id !== foundDriver.id)
              .concat({
                ...foundDriver,
                skillTree: newTree
              });
            nodeFound = true;
          }
          else if (foundDriver.skillTree.tier2.find((node) => node.id === details.id)) {
            const newTree = {
              ...foundDriver.skillTree,
              tier2: foundDriver.skillTree.tier2.filter((node) => node.id !== details.id)
                .concat([details]).sort((nodeA, nodeB) =>
                  nodeA.id < nodeB.id ? -1 : 1
                )
            }
            oldDrivers = oldDrivers.filter((old) => foundDriver === undefined
            || old.id !== foundDriver.id)
              .concat({
                ...foundDriver,
                skillTree: newTree
              });
            nodeFound = true;
          }
          else if (foundDriver.skillTree.tier3.find((node) => node.id === details.id)) {
            const newTree = {
              ...foundDriver.skillTree,
              tier3: foundDriver.skillTree.tier3.filter((node) => node.id !== details.id)
                .concat([details]).sort((nodeA, nodeB) =>
                  nodeA.id < nodeB.id ? -1 : 1
                )
            }
            oldDrivers = oldDrivers.filter((old) => foundDriver === undefined
            || old.id !== foundDriver.id)
              .concat({
                ...foundDriver,
                skillTree: newTree
              });
            nodeFound = true;
          }
          else if (foundDriver.hiddenSkillTree.tier1.find((node) => node.id === details.id)) {
            const newTree = {
              ...foundDriver.hiddenSkillTree,
              tier1: foundDriver.hiddenSkillTree.tier1.filter((node) => node.id !== details.id)
                .concat([details]).sort((nodeA, nodeB) =>
                  nodeA.id < nodeB.id ? -1 : 1
                )
            }
            oldDrivers = oldDrivers.filter((old) => foundDriver === undefined
            || old.id !== foundDriver.id)
              .concat({
                ...foundDriver,
                hiddenSkillTree: newTree
              });
            nodeFound = true;
          }
          else if (foundDriver.hiddenSkillTree.tier2.find((node) => node.id === details.id)) {
            const newTree = {
              ...foundDriver.hiddenSkillTree,
              tier2: foundDriver.hiddenSkillTree.tier2.filter((node) => node.id !== details.id)
                .concat([details]).sort((nodeA, nodeB) =>
                  nodeA.id < nodeB.id ? -1 : 1
                )
            }
            oldDrivers = oldDrivers.filter((old) => foundDriver === undefined
            || old.id !== foundDriver.id)
              .concat({
                ...foundDriver,
                hiddenSkillTree: newTree
              });
            nodeFound = true;
          }
          else if (foundDriver.hiddenSkillTree.tier3.find((node) => node.id === details.id)) {
            const newTree = {
              ...foundDriver.hiddenSkillTree,
              tier3: foundDriver.hiddenSkillTree.tier3.filter((node) => node.id !== details.id)
                .concat([details]).sort((nodeA, nodeB) =>
                  nodeA.id < nodeB.id ? -1 : 1
                )
            }
            oldDrivers = oldDrivers.filter((old) => foundDriver === undefined
            || old.id !== foundDriver.id)
              .concat({
                ...foundDriver,
                hiddenSkillTree: newTree
              });
            nodeFound = true;
          }
          return false;
        })
      })

      if (oldDrivers.length === 0) {
        return driverState;
      }

      return driverState.filter((old:IDriverState) => !oldDrivers.map((d) => d.id).includes(old.id))
        .concat(oldDrivers).sort((driverA, driverB) =>
          driverA.id < driverB.id ? -1 : 1
        )
    }],
  [DriverActions.SetDriverArtList, (driverState:IDriverState[], artList:IDriverArts[]) => {
    const driverIds = artList.map((list) => list.Driver)
      .reduce((newList, entry) => newList.includes(entry) ?
        newList : newList.concat(entry), [] as number[])

    let newDrivers:IDriverState[] = [];

    artList.forEach((list) => {
      const updatedDriver = newDrivers.find((driver) => driver.id === list.Driver) ||
        driverState.find((driver) => driver.id === list.Driver)
      if (updatedDriver) {
        newDrivers = newDrivers.filter((driver) => driver.id !== list.Driver)
          .concat({
            ...updatedDriver,
            arts: updatedDriver.arts.filter((arts) => arts.id !== list.id)
              .concat({
                id: list.id,
                name: list.Name,
                weaponType: list.WeaponType,
                effect: list.Effect,
                target: list.Target,
                type: list.Type,
                levelUnlocked: list.LevelUnlocked,
                nodes: [
                  {
                    ...defaultDriverArtNode,
                    id: list.Level1,
                    Level: 1
                  },
                  {
                    ...defaultDriverArtNode,
                    id: list.Level2,
                    Level: 2
                  },
                  {
                    ...defaultDriverArtNode,
                    id: list.Level3,
                    Level: 3
                  },
                  {
                    ...defaultDriverArtNode,
                    id: list.Level4,
                    Level: 4
                  },
                  {
                    ...defaultDriverArtNode,
                    id: list.Level5,
                    Level: 5
                  },
                  {
                    ...defaultDriverArtNode,
                    id: list.Level5MaxAffinity,
                    Level: 6
                  },
                ]    
              }).sort((artA, artB) =>
                artA.id < artB.id ? -1 : 1
              )
          })
      }

    })

    return driverState.filter((driver) => !driverIds.includes(driver.id))
      .concat(newDrivers).sort((driverA, driverB) =>
        driverA.id < driverB.id ? -1 : 1
      )
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
  [DriverActions.SetDriverArtNode, (driverState:IDriverState[], artNode:IDriverArtDetails[]) => {
    let oldDrivers:IDriverState[] = [];
    artNode.map((newNode) => {
      let nodeFound = false;
      driverState.some((driver) => {
        if (nodeFound) {
          return true;
        }
        const foundDriver = oldDrivers.find((old) => old.id === driver.id) || driver;
        if(foundDriver) {
          const newArts = foundDriver.arts.map((art) => ({
            ...art,
            nodes: art.nodes.map((node) => {
              if(node.id === newNode.id) {
                nodeFound = true;
                return {
                  ...newNode,
                  Level: node.Level
                };
              }
              else {
                return node;
              }
            }).sort((artNodeA, artNodeB) =>
              artNodeA.id < artNodeB.id ? -1 : 1
            )})
          ).sort((artA:IDriverArtsState, artB:IDriverArtsState) =>
            artA.id < artB.id ? -1 : 1
          )
          if (nodeFound) {
            oldDrivers = oldDrivers.filter((old) => old.id !== foundDriver.id)
              .concat({
                ...foundDriver,
                arts: newArts
              })
          }
        }
        return false;
      })
    })

    if (oldDrivers.length === 0) {
      return driverState;
    }


    return driverState.filter((old:IDriverState) =>
      !oldDrivers.map((driver) => driver.id).includes(old.id))
      .concat(oldDrivers).sort((driverA, driverB) =>
        driverA.id < driverB.id ? -1 : 1
      )
  }]
)([]);
