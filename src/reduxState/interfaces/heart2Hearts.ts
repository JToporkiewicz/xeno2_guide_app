import { IHeart2HeartState } from './reduxState';

export const defaultHeart2HeartState: IHeart2HeartState = {
  id: -1,
  Title: '',
  Area: '',
  Location: '',
  Who: [],
  Outcomes: {},
  Available: false,
  Viewed: false
}

export interface IUpdateH2HStatus {
  id: number,
  Viewed: boolean
}