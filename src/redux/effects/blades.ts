import { AnyAction } from 'redux';
import { combineEpics, Epic, ofType } from 'redux-observable';
import { from, mergeMap, of, concat } from 'rxjs';
import { callWithLoader$ } from '.';
import {
  ActionTypes,
  BladeActions,
  fetchAllBladeSkillBranches,
  fetchAllBladeSkillNode,
  fetchAllBladeSkillTrees,
  fetchBladeSkillBranch,
  fetchBladeSkillNode,
  fetchBladeSkillTree,
  setBlade,
  setBladeSkillBranch,
  setBladeSkillNode,
  setBladeSkillTree
} from '../actions/blades';
import client from '../../api-client';
import { IAffinityChart, IAffinityChartBranch, IAffinityChartNode, IBlade } from '../../interfaces';

const fetchAllBladesEffect:Epic<AnyAction, AnyAction> = (action$) =>
  action$.pipe(
    ofType(BladeActions.FetchAllBlades),
    mergeMap(() => callWithLoader$(
      'Fetching blades',
      from(client.resource('blade').find())
        .pipe(mergeMap((blades:IBlade[]) => concat(
          of(...blades.map((blade) => setBlade(blade))),
          of(fetchAllBladeSkillTrees())
        )))
    ))
  )

const fetchBladeEffect:Epic<AnyAction, AnyAction> = (action$) =>
  action$.pipe(
    ofType(BladeActions.FetchBlade),
    mergeMap((action) => callWithLoader$(
      'Fetching blade - ' + action.payload,
      from(client.resource('blade').get(action.payload))
        .pipe(mergeMap((blade:IBlade) => concat(
          of(setBlade(blade)),
          of(fetchBladeSkillTree(blade.AffinityChart))
        )))
    ))
  )

const fetchBladesByWeaponEffect:Epic<AnyAction, AnyAction> = (action$) =>
  action$.pipe(
    ofType(BladeActions.FetchBladesByWeapon),
    mergeMap((action) => callWithLoader$(
      'Fetching blades',
      from(client.resource('blade').find({Weapon: action.payload}))
        .pipe(mergeMap((blades:IBlade[]) => concat(
          of(...blades.map((blade) => setBlade(blade))),
          of(...blades.map((blade) => fetchBladeSkillTree(blade.AffinityChart)))
        )))
    ))
  )

const fetchAllBladeSkillTreesEffect:Epic<AnyAction, AnyAction> = (action$) =>
  action$.pipe(
    ofType(BladeActions.FetchAllBladeSkillTrees),
    mergeMap(() => callWithLoader$(
      'Fetching blade skill trees',
      from(client.resource('affinityChart').find())
        .pipe(mergeMap((trees:IAffinityChart[]) => concat(
          of(...trees.map((tree) => setBladeSkillTree(tree))),
          of(fetchAllBladeSkillBranches())
        )))
    ))
  )

const fetchBladeSkillTreeEffect:Epic<AnyAction, AnyAction> = (action$) =>
  action$.pipe(
    ofType(BladeActions.FetchBladeSkillTree),
    mergeMap((action) => callWithLoader$(
      'Fetching blade skill tree - ' + action.payload,
      from(client.resource('affinityChart').get(action.payload))
        .pipe(mergeMap((tree:IAffinityChart) => {
          const actions:ActionTypes[] = [];

          Object.entries(tree).map((entry) => {
            if(entry[0] !== 'id' && entry[1] !== null) {
              actions.push(fetchBladeSkillBranch(entry[1]))
            }
          })

          return concat(
            of(setBladeSkillTree(tree)),
            of(...actions)
          )}
        ))
    ))
  )

const fetchAllBladeSkillBranchEffect:Epic<AnyAction, AnyAction> = (action$) =>
  action$.pipe(
    ofType(BladeActions.FetchAllBladeSkillBranches),
    mergeMap(() => callWithLoader$(
      'Fetching blade skill branches',
      from(client.resource('affinityChartBranch').find())
        .pipe(mergeMap((branches:IAffinityChartBranch[]) => concat(
          of(...branches.map((branch) => setBladeSkillBranch(branch))),
          of(fetchAllBladeSkillNode())
        )))
    ))
  )

const fetchBladeSkillBranchEffect:Epic<AnyAction, AnyAction> = (action$) =>
  action$.pipe(
    ofType(BladeActions.FetchBladeSkillBranch),
    mergeMap((action) => callWithLoader$(
      'Fetching blade skill branch - ' + action.payload,
      from(client.resource('affinityChartBranch').get(action.payload))
        .pipe(mergeMap((branch:IAffinityChartBranch) => {
          const actions:ActionTypes[] = [];

          Object.entries(branch).map((entry) => {
            if(!['id','BranchName'].includes(entry[0]) && entry[1] !== null) {
              actions.push(fetchBladeSkillNode(entry[1]))
            }
          })

          return concat(
            of(setBladeSkillBranch(branch)),
            of(...actions)
          )
        }))
    ))
  )

const fetchAllBladeSkillNodeEffect:Epic<AnyAction, AnyAction> = (action$) =>
  action$.pipe(
    ofType(BladeActions.FetchAllBladeSkillNodes),
    mergeMap(() => callWithLoader$(
      'Fetching blade skill nodes',
      from(client.resource('affinityChartNode').find())
        .pipe(mergeMap((nodes:IAffinityChartNode[]) =>
          of(...nodes.map((node) => setBladeSkillNode(node)))
        ))
    ))
  )

const fetchBladeSkillNodeEffect:Epic<AnyAction, AnyAction> = (action$) =>
  action$.pipe(
    ofType(BladeActions.FetchBladeSkillNode),
    mergeMap((action) => callWithLoader$(
      'Fetching blade skill node - ' + action.payload,
      from(client.resource('affinityChartNode').get(action.payload))
        .pipe(mergeMap((node:IAffinityChartNode) => of(setBladeSkillNode(node))))
    ))
  )

export const effects = combineEpics(
  fetchAllBladesEffect,
  fetchBladesByWeaponEffect,
  fetchBladeEffect,
  fetchAllBladeSkillTreesEffect,
  fetchBladeSkillTreeEffect,
  fetchAllBladeSkillBranchEffect,
  fetchBladeSkillBranchEffect,
  fetchAllBladeSkillNodeEffect,
  fetchBladeSkillNodeEffect
)