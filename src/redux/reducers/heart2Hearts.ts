import createReducer from 'redux-action-reducer';
import { IHeart2Heart } from '../../interfaces';
import { Heart2HeartActions } from '../actions/heart2Hearts';

export const heart2HeartReducer = createReducer<IHeart2Heart[]>(
  [Heart2HeartActions.SetHeart2Hearts,
    (_: IHeart2Heart[], heart2Hearts: IHeart2Heart[]) =>
      heart2Hearts],
  [Heart2HeartActions.UpdateHeart2Hearts,
    (state:IHeart2Heart[], heart2Heart: IHeart2Heart) =>
      state.filter((h2h) => h2h.id !== heart2Heart.id)
        .concat([heart2Heart])
        .sort((h2hA, h2hB) => h2hA.id < h2hB.id ? -1 : 1)
  ],
  [Heart2HeartActions.UpdateHeart2HeartStatus,
    (state:IHeart2Heart[], heart2Heart: IHeart2Heart) =>
      state.filter((h2h) => h2h.id !== heart2Heart.id)
        .concat([heart2Heart])
        .sort((h2hA, h2hB) => h2hA.id < h2hB.id ? -1 : 1)
  ]
)([]);
