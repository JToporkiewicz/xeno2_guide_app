import { IItem, IItemType } from 'interfaces';
import { IFluxPayloadAction } from './fluxActions';

export enum ItemActions {
  FetchItem = 'FETCH_ITEM',
  SetItem = 'SET_ITEM',
  FetchItemType = 'FETCH_ITEM_TYPE',
  SetItemType = 'SET_ITEM_TYPE'
}

export type ActionTypes =
  | IFluxPayloadAction<ItemActions.FetchItem, number>
  | IFluxPayloadAction<ItemActions.SetItem, IItem>
  | IFluxPayloadAction<ItemActions.FetchItemType, number>
  | IFluxPayloadAction<ItemActions.SetItemType, IItemType>;

export const fetchItem = (payload:number):ActionTypes => ({
  type: ItemActions.FetchItem,
  payload
});

export const setItem = (payload:IItem):ActionTypes => ({
  type: ItemActions.SetItem,
  payload
});

export const fetchItemType = (payload:number):ActionTypes => ({
  type: ItemActions.FetchItemType,
  payload
});

export const setItemType = (payload:IItemType):ActionTypes => ({
  type: ItemActions.SetItemType,
  payload
});
