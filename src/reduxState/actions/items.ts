import { IItem, IItemType } from 'interfaces';
import { IFluxAction, IFluxPayloadAction } from './fluxActions';

export enum ItemActions {
  FetchItem = 'FETCH_ITEM',
  SetItem = 'SET_ITEM',
  FetchItemType = 'FETCH_ITEM_TYPE',
  SetItemType = 'SET_ITEM_TYPE'
}

export type ActionTypes =
  | IFluxAction<ItemActions.FetchItem>
  | IFluxPayloadAction<ItemActions.SetItem, IItem[]>
  | IFluxAction<ItemActions.FetchItemType>
  | IFluxPayloadAction<ItemActions.SetItemType, IItemType[]>;

export const fetchItems = ():ActionTypes => ({
  type: ItemActions.FetchItem
});

export const setItem = (payload:IItem[]):ActionTypes => ({
  type: ItemActions.SetItem,
  payload
});

export const fetchItemTypes = ():ActionTypes => ({
  type: ItemActions.FetchItemType
});

export const setItemType = (payload:IItemType[]):ActionTypes => ({
  type: ItemActions.SetItemType,
  payload
});
