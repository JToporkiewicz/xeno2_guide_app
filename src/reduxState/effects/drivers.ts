import { AnyAction } from 'redux'
import { Epic, ofType, combineEpics } from 'redux-observable'
import { mergeMap, from, of, concat, EMPTY, filter } from 'rxjs'
import { callWithLoader$ } from '.'
import { DriverActions, setDriverDetails } from '../actions/drivers'
import { IDriver } from 'interfaces'
import {
  getAllDrivers,
  getDriverById,
  updateArtLevel,
  updateSkillNodesUnlocked
} from 'services/drivers'

const fetchAllDriversEffect:Epic<AnyAction, AnyAction> = (action$) =>
  action$.pipe(
    ofType(DriverActions.FetchAllDrivers),
    mergeMap(() => callWithLoader$(
      'Fetching drivers',
      from(getAllDrivers())
        .pipe(mergeMap((drivers:IDriver[]) => concat(
          of(setDriverDetails(drivers)),
        )))
    ))
  )

const fetchDriverDetailsEffect:Epic<AnyAction, AnyAction> = (action$) =>
  action$.pipe(
    ofType(DriverActions.FetchDriverDetails),
    mergeMap((action) => callWithLoader$(
      'Fetching driver',
      from(getDriverById(action.payload))
        .pipe(mergeMap((driver:IDriver) => concat(
          of(setDriverDetails([driver])),
        )))
    ))
  )
const saveDriverSkillNodeEffect:Epic<AnyAction, AnyAction> = (action$) =>
  action$.pipe(
    ofType(DriverActions.SaveDriverSkillNode),
    filter((action) => action.payload.unlocked?.length || action.payload.locked?.length),
    mergeMap((action) => callWithLoader$(
      'Updating driver skill node',
      from(updateSkillNodesUnlocked(action.payload))
        .pipe(mergeMap(() => EMPTY))
    ))
  )

const saveDriverArtLevelEffect:Epic<AnyAction, AnyAction> = (action$) =>
  action$.pipe(
    ofType(DriverActions.SaveDriverArtLevel),
    filter((action) => action.payload.length),
    mergeMap((action) => callWithLoader$(
      'Updating art level',
      from(updateArtLevel(action.payload)).pipe(mergeMap(() => EMPTY))
    ))
  )


export const effects = combineEpics(
  fetchAllDriversEffect,
  fetchDriverDetailsEffect,
  saveDriverSkillNodeEffect,
  saveDriverArtLevelEffect,
)