import createReducer from 'redux-action-reducer';
import { IDriver } from '../../interfaces';
import {
  IDriverArtNode,
  IDriverArtsState,
  IDriverState,
  IUpdateShow
} from '../interfaces/reduxState';
import { DriverActions } from '../actions/drivers';
import {
  IDriverSkillNodeResponse,
  defaultSkillTree,
  IDriverArtListResponse,
  IDriverArtNodeResponse,
  IDriverArtOneListUpdate
} from '../interfaces/drivers';

export const driversReducer = createReducer<IDriverState[]>(
  [DriverActions.SetDriverDetails, (driverState:IDriverState[], drivers:IDriver[]) => {
    const newDriverIds = drivers.map((driver:IDriver) => driver.id)

    const newDrivers = drivers.map((driver:IDriver) => {
      const oldDriver = driverState.find((old) => old.id === driver.id)
      return {
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
      }
    })

    return driverState.filter((oldDriver:IDriverState) => !newDriverIds.includes(oldDriver.id))
      .concat(newDrivers).sort((driverA, driverB) =>
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
    (driverState:IDriverState[], nodeDetails:IDriverSkillNodeResponse) => {
      const oldDriver = driverState.find((driver) =>
        driver.skillTree.treeId === nodeDetails.treeId
        || driver.hiddenSkillTree.treeId === nodeDetails.treeId)
      if (!oldDriver) {
        return driverState;
      }

      let tree = nodeDetails.treeId === oldDriver.skillTree.treeId ?
        oldDriver.skillTree : oldDriver.hiddenSkillTree;

      switch(nodeDetails.branchId) {
      case 1:
        tree = {
          ...tree,
          tier1: tree.tier1.filter((node) => node.id !== nodeDetails.node.id)
            .concat([nodeDetails.node]).sort((nodeA, nodeB) =>
              nodeA.id < nodeB.id ? -1 : 1
            )
        }
        break;
      case 2:
        tree = {
          ...tree,
          tier2: tree.tier2.filter((node) => node.id !== nodeDetails.node.id)
            .concat([nodeDetails.node]).sort((nodeA, nodeB) =>
              nodeA.id < nodeB.id ? -1 : 1
            )
        }
        break;
      case 3:
        tree = {
          ...tree,
          tier3: tree.tier3.filter((node) => node.id !== nodeDetails.node.id)
            .concat([nodeDetails.node]).sort((nodeA, nodeB) =>
              nodeA.id < nodeB.id ? -1 : 1
            )
        }
        break;
      default:
      }
      
      return driverState.filter((old:IDriverState) => old.id !== oldDriver.id)
        .concat([{
          ...oldDriver,
          skillTree: nodeDetails.treeId === oldDriver.skillTree.treeId ?
            tree : oldDriver.skillTree,
          hiddenSkillTree: nodeDetails.treeId === oldDriver.hiddenSkillTree.treeId ?
            tree : oldDriver.hiddenSkillTree,
        }]).sort((driverA, driverB) =>
          driverA.id < driverB.id ? -1 : 1
        )
    }],
  [DriverActions.SetDriverArtAllLists,
    (driverState:IDriverState[], arts:IDriverArtListResponse) => {
      const oldDriver = driverState.find((old:IDriverState) => old.id === arts.driverId)
      if (!oldDriver) {
        return driverState;
      }

      return driverState.filter((old:IDriverState) => old.id !== oldDriver.id)
        .concat([{
          ...oldDriver,
          arts: arts.artList.map((art) => {
            return {
              id: art.id,
              name: art.Name,
              weaponType: art.WeaponType,
              effect: art.Effect,
              target: art.Target,
              type: art.Type,
              levelUnlocked: art.LevelUnlocked,
              nodes: [] as IDriverArtNode[]
            }
          }).sort((artA, artB) =>
            artA.id < artB.id ? -1 : 1
          )
        }]).sort((driverA, driverB) =>
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
  [DriverActions.SetDriverArtNode, (driverState:IDriverState[], artNode:IDriverArtNodeResponse) => {
    const oldDriver = driverState.find((old:IDriverState) => old.arts
      .find((art:IDriverArtsState) => art.id === artNode.artId))
    if(!oldDriver) {
      return driverState;
    }

    const oldArt = oldDriver.arts.find((art:IDriverArtsState) => art.id === artNode.artId)

    if(!oldArt) {
      return driverState;
    }

    return driverState.filter((old:IDriverState) => old.id !== oldDriver.id)
      .concat([{
        ...oldDriver,
        arts: oldDriver.arts.filter((art:IDriverArtsState) => art.id !== oldArt.id)
          .concat([{
            ...oldArt,
            nodes: oldArt.nodes.filter((node:IDriverArtNode) => node.id !== artNode.artNode.id)
              .concat([{
                ...artNode.artNode,
                Level: artNode.artNodeLevel
              }]).sort((artNodeA, artNodeB) =>
                artNodeA.id < artNodeB.id ? -1 : 1
              )
          }]).sort((artA, artB) =>
            artA.id < artB.id ? -1 : 1
          )
      }]).sort((driverA, driverB) =>
        driverA.id < driverB.id ? -1 : 1
      )
  }]
)([]);
