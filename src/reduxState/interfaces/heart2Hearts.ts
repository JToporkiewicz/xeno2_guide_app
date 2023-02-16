import { IHeart2Heart } from 'interfaces'

export const defaultHeart2HeartState: IHeart2Heart = {
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