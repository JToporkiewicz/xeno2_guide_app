import { AnyAction } from 'redux'
import { Epic, ofType, combineEpics } from 'redux-observable'
import { mergeMap, from, of, concat, EMPTY } from 'rxjs'
import { callWithLoader$ } from '.'
import {
  DriverActions,
  fetchDriverArtList,
  fetchDriverArtNode,
  fetchDriverSkillNodes,
  fetchDriverSkillTree,
  setDriverArtAllLists,
  setDriverArtNode,
  setDriverDetails,
  setDriverSkillNode
} from '../actions/drivers'
import client from '../../api-client';
import { IDriver, IDriverArts, IDriverSkillTree } from '../../interfaces'

const fetchAllDriversEffect:Epic<AnyAction, AnyAction> = (action$) =>
  action$.pipe(
    ofType(DriverActions.FetchAllDrivers),
    mergeMap(() => callWithLoader$(
      'Fetching drivers',
      from(client.resource('driver').find())
        .pipe(mergeMap((drivers:IDriver[]) => concat(
          of(setDriverDetails(drivers)),
          of(...drivers.map((driver) => fetchDriverArtList(driver.id))),
          of(...drivers.map((driver) => fetchDriverSkillTree(driver.DriverSkillTree))),
          of(...drivers.map((driver) => fetchDriverSkillTree(driver.HiddenSkillTree)))
        )))
    ))
  )

const fetchDriverSkillTreeEffect:Epic<AnyAction, AnyAction> = (action$) =>
  action$.pipe(
    ofType(DriverActions.FetchDriverSkillTree),
    mergeMap((action) => callWithLoader$(
      'Fetching driver skill tree - ' + action.payload,
      from(client.resource('driverskilltree').get(action.payload))
        .pipe(
          mergeMap((tree:IDriverSkillTree) => concat(
            of(fetchDriverSkillNodes({
              treeId: tree.id,
              branchId: 1,
              nodeId: tree.Tier1Branch1
            })),
            of(fetchDriverSkillNodes({
              treeId: tree.id,
              branchId: 1,
              nodeId: tree.Tier1Branch2
            })),
            of(fetchDriverSkillNodes({
              treeId: tree.id,
              branchId: 1,
              nodeId: tree.Tier1Branch3
            })),
            of(fetchDriverSkillNodes({
              treeId: tree.id,
              branchId: 1,
              nodeId: tree.Tier1Branch4
            })),
            of(fetchDriverSkillNodes({
              treeId: tree.id,
              branchId: 1,
              nodeId: tree.Tier1Branch5
            })),
            of(fetchDriverSkillNodes({
              treeId: tree.id,
              branchId: 2,
              nodeId: tree.Tier2Branch1
            })),
            of(fetchDriverSkillNodes({
              treeId: tree.id,
              branchId: 2,
              nodeId: tree.Tier2Branch2
            })),
            of(fetchDriverSkillNodes({
              treeId: tree.id,
              branchId: 2,
              nodeId: tree.Tier2Branch3
            })),
            of(fetchDriverSkillNodes({
              treeId: tree.id,
              branchId: 2,
              nodeId: tree.Tier2Branch4
            })),
            of(fetchDriverSkillNodes({
              treeId: tree.id,
              branchId: 2,
              nodeId: tree.Tier2Branch5
            })),
            of(fetchDriverSkillNodes({
              treeId: tree.id,
              branchId: 3,
              nodeId: tree.Tier3Branch1
            })),
            of(fetchDriverSkillNodes({
              treeId: tree.id,
              branchId: 3,
              nodeId: tree.Tier3Branch2
            })),
            of(fetchDriverSkillNodes({
              treeId: tree.id,
              branchId: 3,
              nodeId: tree.Tier3Branch3
            })),
            of(fetchDriverSkillNodes({
              treeId: tree.id,
              branchId: 3,
              nodeId: tree.Tier3Branch4
            })),
            of(fetchDriverSkillNodes({
              treeId: tree.id,
              branchId: 3,
              nodeId: tree.Tier3Branch5
            })),
          )),
        )
    ))
  )

const fetchDriverSkillNodeEffect:Epic<AnyAction, AnyAction> = (action$) =>
  action$.pipe(
    ofType(DriverActions.FetchDriverSkillNodes),
    mergeMap((action) => callWithLoader$(
      'Fetching driver skill node - ' + action.payload.nodeId,
      from(client.resource('driverskillnode').get(action.payload.nodeId))
        .pipe(mergeMap((node) => of(setDriverSkillNode({
          treeId: action.payload.treeId,
          branchId: action.payload.branchId,
          node
        }))))
    ))
  )

const saveDriverSkillNodeEffect:Epic<AnyAction, AnyAction> = (action$) =>
  action$.pipe(
    ofType(DriverActions.SaveDriverSkillNode),
    mergeMap((action) => callWithLoader$(
      'Updating driver skill node',
      from(client.resource('driverskillnode').update(
        action.payload.nodeId, action.payload.node))
        .pipe(mergeMap(() => EMPTY))
    ))
  )

const fetchDriverArtListEffect:Epic<AnyAction, AnyAction> = (action$) =>
  action$.pipe(
    ofType(DriverActions.FetchDriverArtList),
    mergeMap((action) => callWithLoader$(
      'Fetching driver art list - ' + action.payload,
      from(client.resource('driverArt').find({driver: action.payload}))
        .pipe(mergeMap((artList:IDriverArts[]) => concat(
          of(setDriverArtAllLists({
            driverId: action.payload,
            artList
          })),
          of(...artList.map((art) => fetchDriverArtNode({
            artId: art.id,
            artNode: art.Level1,
            artNodeLevel: 1}))),
          of(...artList.map((art) => fetchDriverArtNode({
            artId: art.id,
            artNode: art.Level2,
            artNodeLevel: 2}))),
          of(...artList.map((art) => fetchDriverArtNode({
            artId: art.id,
            artNode: art.Level3,
            artNodeLevel: 3}))),
          of(...artList.map((art) => fetchDriverArtNode({
            artId: art.id,
            artNode: art.Level4,
            artNodeLevel: 4}))),
          of(...artList.map((art) => fetchDriverArtNode({
            artId: art.id,
            artNode: art.Level5,
            artNodeLevel: 5}))),
          of(...artList.map((art) => fetchDriverArtNode({
            artId: art.id,
            artNode: art.Level5MaxAffinity,
            artNodeLevel: 6}))),
        )))
    ))
  )

const saveDriverArtLevelEffect:Epic<AnyAction, AnyAction> = (action$) =>
  action$.pipe(
    ofType(DriverActions.SaveDriverArtLevel),
    mergeMap((action) => callWithLoader$(
      'Updating art level',
      from(client.resource('driverArt').update(
        action.payload.artId, {LevelUnlocked: action.payload.newLevel}
      )).pipe(mergeMap(() => EMPTY))
    ))
  )

const fetchDriverArtNodeEffect:Epic<AnyAction, AnyAction> = (action$) =>
  action$.pipe(
    ofType(DriverActions.FetchDriverArtNode),
    mergeMap((action) => callWithLoader$(
      'Fetching driver art node - ' + action.payload.artNode,
      from(client.resource('driverArtDetails').get(action.payload.artNode))
        .pipe(mergeMap((node) => of(setDriverArtNode({
          artId: action.payload.artId,
          artNodeLevel: action.payload.artNodeLevel,
          artNode: node
        }))
        ))
    )
    ),
  )

export const effects = combineEpics(
  fetchAllDriversEffect,
  fetchDriverSkillTreeEffect,
  fetchDriverSkillNodeEffect,
  saveDriverSkillNodeEffect,
  fetchDriverArtListEffect,
  saveDriverArtLevelEffect,
  fetchDriverArtNodeEffect
)