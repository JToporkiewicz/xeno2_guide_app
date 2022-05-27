import { AnyAction } from 'redux';
import { combineEpics, Epic, ofType } from 'redux-observable';
import { from, mergeMap, of, concat } from 'rxjs';
import { callWithLoader$ } from '.';
import {
  ActionTypes,
  BladeActions,
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
        .pipe(mergeMap((blade:IBlade[]) => concat(
          of(setBlade(blade)),
          of(...blade.map((b) => fetchBladeSkillTree(b.AffinityChart)))
        )))
    ))
  )

const fetchBladesByWeaponEffect:Epic<AnyAction, AnyAction> = (action$) =>
  action$.pipe(
    ofType(BladeActions.FetchBladesByWeapon),
    mergeMap((action) => callWithLoader$(
      'Fetching blades',
      from(client.resource('blade').find({Weapon: action.payload}))
        .pipe(mergeMap((blade:IBlade[]) => concat(
          of(setBlade(blade)),
          of(...blade.map((b) => fetchBladeSkillTree(b.AffinityChart)))
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
              actions.push(fetchBladeSkillBranch({
                treeId: action.payload,
                branchId: entry[1]
              }))
            }
          })

          return concat(
            of(setBladeSkillTree({
              treeId: action.payload,
              tree
            })),
            of(...actions)
          )}
        ))
    ))
  )

const fetchBladeSkillBranchEffect:Epic<AnyAction, AnyAction> = (action$) =>
  action$.pipe(
    ofType(BladeActions.FetchBladeSkillBranch),
    mergeMap((action) => callWithLoader$(
      'Fetching blade skill branch - ' + action.payload.branchId,
      from(client.resource('affinityChartBranch').get(action.payload.branchId))
        .pipe(mergeMap((branch:IAffinityChartBranch) => {
          const actions:ActionTypes[] = [];

          Object.entries(branch).map((entry) => {
            if(!['id','BranchName'].includes(entry[0]) && entry[1] !== null) {
              actions.push(fetchBladeSkillNode({
                treeId: action.payload.treeId,
                branchId: action.payload.branchId,
                nodeId: entry[1],
                nodeTier: parseInt(entry[0].slice(-1))
              }))
            }
          })

          return concat(
            of(setBladeSkillBranch({
              treeId: action.payload.treeId,
              branchId: action.payload.branchId,
              branch
            })),
            of(...actions)
          )
        }))
    ))
  )

const fetchBladeSkillNodeEffect:Epic<AnyAction, AnyAction> = (action$) =>
  action$.pipe(
    ofType(BladeActions.FetchBladeSkillNode),
    mergeMap((action) => callWithLoader$(
      'Fetching blade skill node - ' + action.payload.nodeId,
      from(client.resource('affinityChartNode').get(action.payload.nodeId))
        .pipe(mergeMap((node:IAffinityChartNode) => of(setBladeSkillNode({
          treeId: action.payload.treeId,
          branchId: action.payload.branchId,
          nodeId: action.payload.nodeId,
          nodeTier: action.payload.nodeTier,
          node
        }))))
    ))
  )

export const effects = combineEpics(
  fetchBladesByWeaponEffect,
  fetchAllBladesEffect,
  fetchBladeSkillTreeEffect,
  fetchBladeSkillBranchEffect,
  fetchBladeSkillNodeEffect
)