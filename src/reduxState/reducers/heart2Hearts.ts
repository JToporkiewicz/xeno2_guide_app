import createReducer from 'redux-action-reducer';
import { IHeart2Heart } from 'interfaces';
import { Heart2HeartActions } from '../actions/heart2Hearts';
import { IUpdateH2HStatus } from 'reduxState/interfaces/heart2Hearts';

export const heart2HeartReducer = createReducer<IHeart2Heart[]>(
  [Heart2HeartActions.SetHeart2Hearts,
    (state: IHeart2Heart[], heart2Hearts: IHeart2Heart[]) => {
      const h2hIds = heart2Hearts.map((h) => h.id);

      return state.filter((old) => !h2hIds.includes(old.id))
        .concat(heart2Hearts)
        .sort((h2hA, h2hB) => h2hA.id < h2hB.id ? -1 : 1)
    }],
  [Heart2HeartActions.UpdateHeart2HeartStatus,
    (state:IHeart2Heart[], heart2Heart: IUpdateH2HStatus) => {
      const foundH2h = state.find((h2h) => h2h.id === heart2Heart.id)

      if (!foundH2h) {
        return state;
      }
      return state.filter((h2h) => h2h.id !== heart2Heart.id)
        .concat({
          ...foundH2h,
          Viewed: heart2Heart.Viewed
        })
        .sort((h2hA, h2hB) => h2hA.id < h2hB.id ? -1 : 1)
    }]
)([]);
