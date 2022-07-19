import { AnyAction } from 'redux';
import { combineEpics, Epic, ofType } from 'redux-observable';
import { mergeMap, from, of } from 'rxjs';
import { callWithLoader$ } from '.';
import { ItemActions, setItem, setItemType } from '../actions/items';
import client from 'api-client';

const fetchItemEffect:Epic<AnyAction, AnyAction> = (action$) =>
  action$.pipe(
    ofType(ItemActions.FetchItem),
    mergeMap((action) => callWithLoader$(
      'Fetching item',
      from(client.resource('item').get(action.payload))
        .pipe(mergeMap((item) => of(setItem(item))))
    ))
  )

const fetchItemTypeEffect:Epic<AnyAction, AnyAction> = (action$) =>
  action$.pipe(
    ofType(ItemActions.FetchItemType),
    mergeMap((action) => callWithLoader$(
      'Fetching item type details',
      from(client.resource('itemType').get(action.payload))
        .pipe(mergeMap((item) => of(setItemType(item))))
    ))
  )
export const effects = combineEpics(
  fetchItemEffect,
  fetchItemTypeEffect
)