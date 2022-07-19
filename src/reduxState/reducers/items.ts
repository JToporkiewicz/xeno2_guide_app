import { combineReducers } from 'redux';
import createReducer from 'redux-action-reducer';
import { IItem, IItemType } from 'interfaces';
import { ItemActions } from '../actions/items';
import { IItemState } from '../interfaces/reduxState';

const itemReducer = createReducer<IItem[]>(
  [ItemActions.SetItem, (state:IItem[], item:IItem) => {
    return state.filter((oldItem:IItem) => oldItem.id !== item.id)
      .concat([item]).sort((itemA, itemB) => itemA.id < itemB.id ? -1 : 1)
  }]
)([])

const itemTypeReducer = createReducer<IItemType[]>(
  [ItemActions.SetItemType, (state:IItemType[], itemType:IItemType) => {
    return state.filter((oldItemType:IItemType) => oldItemType.id !== itemType.id)
      .concat([itemType]).sort((itemTypeA, itemTypeB) => itemTypeA.id < itemTypeB.id ? -1 : 1)
  }]
)([])

export const reducer = combineReducers<IItemState>({
  items: itemReducer,
  itemTypes: itemTypeReducer
})