import { AnyAction } from 'redux';
import { combineEpics, Epic, ofType } from 'redux-observable';
import { mergeMap, from, of } from 'rxjs';
import { callWithLoader$ } from '.';
import { ItemActions, setItem, setItemType } from '../actions/items';
import { getAllItems, getItemTypes } from 'services/items';

const fetchItemEffect:Epic<AnyAction, AnyAction> = (action$) =>
  action$.pipe(
    ofType(ItemActions.FetchItem),
    mergeMap(() => callWithLoader$(
      'Fetching items',
      from(getAllItems())
        .pipe(mergeMap((items) => of(setItem(items))))
    ))
  )

const fetchItemTypeEffect:Epic<AnyAction, AnyAction> = (action$) =>
  action$.pipe(
    ofType(ItemActions.FetchItemType),
    mergeMap(() => callWithLoader$(
      'Fetching item types',
      from(getItemTypes())
        .pipe(mergeMap((itemTypes) => of(setItemType(itemTypes))))
    ))
  )
export const effects = combineEpics(
  fetchItemEffect,
  fetchItemTypeEffect
)