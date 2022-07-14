import { AnyAction } from 'redux'
import { Epic, ofType, combineEpics } from 'redux-observable'
import { mergeMap, from, of, concat, EMPTY } from 'rxjs'
import { callWithLoader$ } from '.'
import {
  ActionTypes,
  DriverActions,
  fetchAllDriverArtLists,
  fetchAllDriverArtNodes,
  fetchAllDriverSkillNodes,
  fetchAllDriverSkillTrees,
  fetchDriverArtList,
  fetchDriverArtNode,
  fetchDriverSkillNodes,
  fetchDriverSkillTree,
  setDriverArtList,
  setDriverArtNode,
  setDriverDetails,
  setDriverSkillNode,
  setDriverSkillTree
} from '../actions/drivers'
import client from '../../api-client';
import {
  IDriver,
  IDriverArtDetails,
  IDriverArts,
  IDriverSkillNode,
  IDriverSkillTree
} from '../../interfaces'

const fetchAllDriversEffect:Epic<AnyAction, AnyAction> = (action$) =>
  action$.pipe(
    ofType(DriverActions.FetchAllDrivers),
    mergeMap(() => callWithLoader$(
      'Fetching drivers',
      from(client.resource('driver').find())
        .pipe(mergeMap((drivers:IDriver[]) => concat(
          of(setDriverDetails(drivers)),
          of(fetchAllDriverArtLists()),
          of(fetchAllDriverSkillTrees()),
        )))
    ))
  )

const fetchDriverDetailsEffect:Epic<AnyAction, AnyAction> = (action$) =>
  action$.pipe(
    ofType(DriverActions.FetchDriverDetails),
    mergeMap((action) => callWithLoader$(
      'Fetching driver',
      from(client.resource('driver').get(action.payload))
        .pipe(mergeMap((driver:IDriver) => concat(
          of(setDriverDetails([driver])),
          of(fetchDriverArtList(driver.id)),
          of(fetchDriverSkillTree(driver.DriverSkillTree)),
          of(fetchDriverSkillTree(driver.HiddenSkillTree))
        )))
    ))
  )

const fetchAllDriverSkillTreesEffect:Epic<AnyAction, AnyAction> = (action$) =>
  action$.pipe(
    ofType(DriverActions.FetchAllDriverSkillTrees),
    mergeMap(() => callWithLoader$(
      'Fetching driver skill trees',
      from(client.resource('driverskilltree').find())
        .pipe(mergeMap((trees:IDriverSkillTree[]) => concat(
          of(setDriverSkillTree(trees)),
          of(fetchAllDriverSkillNodes())
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
          mergeMap((tree:IDriverSkillTree) => {
            const actions:ActionTypes[] = []
            Object.entries(tree).map((entry) => {
              if(entry[0] !== 'id') {
                actions.push(fetchDriverSkillNodes(entry[1]))
              }
            })
            return concat(
              of(setDriverSkillTree([tree])),
              of(...actions)
            )
          }),
        )
    ))
  )

const fetchAllDriverSkillNodesEffect:Epic<AnyAction, AnyAction> = (action$) =>
  action$.pipe(
    ofType(DriverActions.FetchAllDriverSkillNodes),
    mergeMap(() => callWithLoader$(
      'Fetching driver skill nodes',
      from(client.resource('driverskillnode').find())
        .pipe(mergeMap((nodes:IDriverSkillNode[]) => concat(
          of(setDriverSkillNode(nodes))
        )))
    ))
  )

const fetchDriverSkillNodeEffect:Epic<AnyAction, AnyAction> = (action$) =>
  action$.pipe(
    ofType(DriverActions.FetchDriverSkillNodes),
    mergeMap((action) => callWithLoader$(
      'Fetching driver skill node - ' + action.payload,
      from(client.resource('driverskillnode').get(action.payload))
        .pipe(mergeMap((node) => of(setDriverSkillNode([node]))))
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

const fetchAllDriverArtListsEffect:Epic<AnyAction, AnyAction> = (action$) =>
  action$.pipe(
    ofType(DriverActions.FetchAllDriverArtLists),
    mergeMap(() => callWithLoader$(
      'Fetching driver arts',
      from(client.resource('driverArt').find())
        .pipe(mergeMap((artLists:IDriverArts[]) => concat(
          of(setDriverArtList(artLists)),
          of(fetchAllDriverArtNodes())
        )))
    ))
  )

const fetchDriverArtListEffect:Epic<AnyAction, AnyAction> = (action$) =>
  action$.pipe(
    ofType(DriverActions.FetchDriverArtList),
    mergeMap((action) => callWithLoader$(
      'Fetching driver art list - ' + action.payload,
      from(client.resource('driverArt').find({driver: action.payload}))
        .pipe(mergeMap((artList:IDriverArts[]) => concat(
          of(setDriverArtList(artList)),
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

const fetchAllDriverArtNodesEffect:Epic<AnyAction, AnyAction> = (action$) =>
  action$.pipe(
    ofType(DriverActions.FetchAllDriverArtNodes),
    mergeMap(() => callWithLoader$(
      'Fetching driver art nodes',
      from(client.resource('driverArtDetails').find())
        .pipe(mergeMap((nodes:IDriverArtDetails[]) => concat(
          of(setDriverArtNode(nodes))
        )))
    ))
  )

const fetchDriverArtNodeEffect:Epic<AnyAction, AnyAction> = (action$) =>
  action$.pipe(
    ofType(DriverActions.FetchDriverArtNode),
    mergeMap((action) => callWithLoader$(
      'Fetching driver art node - ' + action.payload.artNode,
      from(client.resource('driverArtDetails').get(action.payload.artNode))
        .pipe(mergeMap((node) => of(setDriverArtNode([node]))
        ))
    )
    ),
  )

export const effects = combineEpics(
  fetchAllDriversEffect,
  fetchDriverDetailsEffect,
  fetchAllDriverSkillTreesEffect,
  fetchDriverSkillTreeEffect,
  fetchAllDriverSkillNodesEffect,
  fetchDriverSkillNodeEffect,
  saveDriverSkillNodeEffect,
  fetchAllDriverArtListsEffect,
  fetchDriverArtListEffect,
  saveDriverArtLevelEffect,
  fetchAllDriverArtNodesEffect,
  fetchDriverArtNodeEffect
)