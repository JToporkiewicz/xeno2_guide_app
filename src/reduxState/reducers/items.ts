import { combineReducers } from 'redux';
import createReducer from 'redux-action-reducer';
import { IItem, IItemType } from 'interfaces';
import { ItemActions } from '../actions/items';
import { IItemState } from '../interfaces/reduxState';

const itemReducer = createReducer<IItem[]>(
  [ItemActions.SetItem, (_:IItem[], items:IItem[]) => items]
)([])

const itemTypeReducer = createReducer<IItemType[]>(
  [ItemActions.SetItemType, (_:IItemType[], itemTypes:IItemType[]) => itemTypes]
)([])

export const reducer = combineReducers<IItemState>({
  items: itemReducer,
  itemTypes: itemTypeReducer
})