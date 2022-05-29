import createReducer from 'redux-action-reducer';
import {
  IDriver,
  IDriverArtDetails,
  IDriverArts,
  IDriverSkillNode,
  IDriverSkillTree
} from '../../interfaces';
import {
  IDriverArtNode,
  IDriverArtsState,
  IDriverState,
  ISkillTreeState,
  IUpdateShow
} from '../interfaces/reduxState';
import { DriverActions } from '../actions/drivers';
import {
  defaultSkillTree,
  IDriverArtOneListUpdate,
  defaultSkillNode,
  defaultDriverArt,
  defaultDriverArtNode
} from '../interfaces/drivers';

export const driversReducer = createReducer<IDriverState[]>(
  [DriverActions.SetDriverDetails, (driverState:IDriverState[], driver:IDriver) => {
    const oldDriver = driverState.find((oldDriver:IDriverState) => oldDriver.id === driver.id);

    return driverState.filter((oldDriver:IDriverState) => oldDriver.id !== driver.id)
      .concat({
        id: driver.id,
        name: driver.Name,
        chapterUnlocked: driver.ChapterUnlocked,
        arts: oldDriver ? oldDriver.arts : [],
        skillTree: oldDriver ?
          oldDriver.skillTree
          : { ...defaultSkillTree, treeId: driver.DriverSkillTree},
        hiddenSkillTree: oldDriver ?
          oldDriver.hiddenSkillTree
          : { ...defaultSkillTree, treeId: driver.HiddenSkillTree},
        favItem1: driver.FavItem1,
        favItem2: driver.FavItem2,
        favItemType1: driver.FavItemType1,
        favItemType2: driver.FavItemType2,
        ideaStats: driver.IdeaStats,
        show: false
      }).sort((driverA, driverB) =>
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
    (driverState:IDriverState[], driverSkillTree: IDriverSkillTree) => {
      const oldDriver = driverState.find((driver) =>
        driver.skillTree.treeId === driverSkillTree.id
        || driver.hiddenSkillTree.treeId === driverSkillTree.id)
      if (!oldDriver) {
        return driverState;
      }

      const newTree: ISkillTreeState = {
        treeId: driverSkillTree.id,
        tier1: Object.entries(driverSkillTree)
          .filter((entry) => entry[0] !== 'id' && entry[0][4] === '1')
          .map((entry) => {
            return {
              ...defaultSkillNode,
              id: entry[1]
            }
          }),
        tier2: Object.entries(driverSkillTree)
          .filter((entry) => entry[0] !== 'id' && entry[0][4] === '2')
          .map((entry) => {
            return {
              ...defaultSkillNode,
              id: entry[1]
            }
          }),
        tier3: Object.entries(driverSkillTree)
          .filter((entry) => entry[0] !== 'id' && entry[0][4] === '3')
          .map((entry) => {
            return {
              ...defaultSkillNode,
              id: entry[1]
            }
          })
      }

      return driverState.filter((driver) => driver.skillTree.treeId !== driverSkillTree.id
        && driver.hiddenSkillTree.treeId !== driverSkillTree.id)
        .concat({
          ...oldDriver,
          skillTree: oldDriver.skillTree.treeId === driverSkillTree.id ?
            newTree : oldDriver.skillTree,
          hiddenSkillTree: oldDriver.hiddenSkillTree.treeId === driverSkillTree.id ?
            newTree: oldDriver.hiddenSkillTree
        }).sort((driverA, driverB) =>
          driverA.id < driverB.id ? -1 : 1
        )
    }],
  [DriverActions.SetDriverSkillNode,
    (driverState:IDriverState[], nodeDetails:IDriverSkillNode) => {
      let oldDriver:any = undefined;
      let tree = defaultSkillTree;
      
      driverState.map((driver) => {
        if (driver.skillTree.tier1.find((node) => node.id === nodeDetails.id)) {
          oldDriver = driver;
          tree = {
            ...driver.skillTree,
            tier1: driver.skillTree.tier1.filter((node) => node.id !== nodeDetails.id)
              .concat([nodeDetails]).sort((nodeA, nodeB) =>
                nodeA.id < nodeB.id ? -1 : 1
              )
          }
        }
        if (driver.skillTree.tier2.find((node) => node.id === nodeDetails.id)) {
          oldDriver = driver;
          tree = {
            ...driver.skillTree,
            tier2: driver.skillTree.tier2.filter((node) => node.id !== nodeDetails.id)
              .concat([nodeDetails]).sort((nodeA, nodeB) =>
                nodeA.id < nodeB.id ? -1 : 1
              )
          }
        }
        if (driver.skillTree.tier3.find((node) => node.id === nodeDetails.id)) {
          oldDriver = driver;
          tree = {
            ...driver.skillTree,
            tier3: driver.skillTree.tier3.filter((node) => node.id !== nodeDetails.id)
              .concat([nodeDetails]).sort((nodeA, nodeB) =>
                nodeA.id < nodeB.id ? -1 : 1
              )
          }
        }
        if (driver.hiddenSkillTree.tier1.find((node) => node.id === nodeDetails.id)) {
          oldDriver = driver;
          tree = {
            ...driver.hiddenSkillTree,
            tier1: driver.hiddenSkillTree.tier1.filter((node) => node.id !== nodeDetails.id)
              .concat([nodeDetails]).sort((nodeA, nodeB) =>
                nodeA.id < nodeB.id ? -1 : 1
              )
          }
        }
        if (driver.hiddenSkillTree.tier2.find((node) => node.id === nodeDetails.id)) {
          oldDriver = driver;
          tree = {
            ...driver.hiddenSkillTree,
            tier2: driver.hiddenSkillTree.tier2.filter((node) => node.id !== nodeDetails.id)
              .concat([nodeDetails]).sort((nodeA, nodeB) =>
                nodeA.id < nodeB.id ? -1 : 1
              )
          }
        }
        if (driver.hiddenSkillTree.tier3.find((node) => node.id === nodeDetails.id)) {
          oldDriver = driver;
          tree = {
            ...driver.hiddenSkillTree,
            tier3: driver.hiddenSkillTree.tier3.filter((node) => node.id !== nodeDetails.id)
              .concat([nodeDetails]).sort((nodeA, nodeB) =>
                nodeA.id < nodeB.id ? -1 : 1
              )
          }
        }
      })

      if (!oldDriver) {
        return driverState;
      }

      return driverState.filter((old:IDriverState) => old.id !== oldDriver.id)
        .concat([{
          ...oldDriver,
          skillTree: tree.treeId === oldDriver.skillTree.treeId ?
            tree : oldDriver.skillTree,
          hiddenSkillTree: tree.treeId === oldDriver.hiddenSkillTree.treeId ?
            tree : oldDriver.hiddenSkillTree,
        }]).sort((driverA, driverB) =>
          driverA.id < driverB.id ? -1 : 1
        )
    }],
  [DriverActions.SetDriverArtList, (driverState:IDriverState[], artList:IDriverArts) => {
    const oldDriver = driverState.find((driver) => driver.id === artList.Driver)

    if(!oldDriver) {
      return driverState;
    }

    return driverState.filter((driver) => driver.id !== oldDriver.id)
      .concat({
        ...oldDriver,
        arts: oldDriver.arts.filter((list) => list.id !== artList.id)
          .concat({
            id: artList.id,
            name: artList.Name,
            weaponType: artList.WeaponType,
            effect: artList.Effect,
            target: artList.Target,
            type: artList.Type,
            levelUnlocked: artList.LevelUnlocked,
            nodes: [
              {
                ...defaultDriverArtNode,
                id: artList.Level1,
                Level: 1
              },
              {
                ...defaultDriverArtNode,
                id: artList.Level2,
                Level: 2
              },
              {
                ...defaultDriverArtNode,
                id: artList.Level3,
                Level: 3
              },
              {
                ...defaultDriverArtNode,
                id: artList.Level4,
                Level: 4
              },
              {
                ...defaultDriverArtNode,
                id: artList.Level5,
                Level: 5
              },
              {
                ...defaultDriverArtNode,
                id: artList.Level5MaxAffinity,
                Level: 6
              },
            ]
          }).sort((artA, artB) =>
            artA.id < artB.id ? -1 : 1
          )
      }).sort((driverA, driverB) =>
        driverA.id < driverB.id ? -1 : 1
      )
  }],
  [DriverActions.SetDriverArtOneList,
    (driverState:IDriverState[], artListPayload:IDriverArtOneListUpdate) => {
      const oldDriver = driverState.find((old:IDriverState) => old.id === artListPayload.driverId)
      if (!oldDriver) {
        return driverState;
      }

      const artListNode = oldDriver.arts.filter((list) => list.id !== artListPayload.artList.id);

      return driverState.filter((old:IDriverState) => old.id !== oldDriver.id)
        .concat([{
          ...oldDriver,
          arts: artListNode.concat(artListPayload.artList)
            .sort((artA, artB) =>
              artA.id < artB.id ? -1 : 1
            )
        }]).sort((driverA, driverB) =>
          driverA.id < driverB.id ? -1 : 1
        )
    }],
  [DriverActions.SetDriverArtNode, (driverState:IDriverState[], artNode:IDriverArtDetails) => {
    let oldDriver:any = undefined;
    let list:IDriverArtsState = defaultDriverArt;
    let oldNode:IDriverArtNode = defaultDriverArtNode;
    driverState.map((driver) => {
      if(!oldDriver) driver.arts.map((art) => {
        if(!oldDriver) {
          art.nodes.map((node) => {
            if(node.id === artNode.id) {
              oldDriver = driver;
              list = art;
              oldNode = node;
            }
          })
        }
      })
    })
    if(!oldDriver) {
      return driverState;
    }


    return driverState.filter((old:IDriverState) => old.id !== oldDriver.id)
      .concat([{
        ...oldDriver,
        arts: oldDriver.arts.filter((art:IDriverArtsState) => art.id !== list.id)
          .concat([{
            ...list,
            nodes: list.nodes.filter((node:IDriverArtNode) => node.id !== artNode.id)
              .concat([{
                ...artNode,
                Level: oldNode.Level
              }]).sort((artNodeA, artNodeB) =>
                artNodeA.id < artNodeB.id ? -1 : 1
              )
          }]).sort((artA:IDriverArtsState, artB:IDriverArtsState) =>
            artA.id < artB.id ? -1 : 1
          )
      }]).sort((driverA, driverB) =>
        driverA.id < driverB.id ? -1 : 1
      )
  }]
)([]);
