import { IHeart2HeartAvailability } from './availabilityState'

export const defaultHeart2HeartState: IHeart2HeartAvailability = {
  id: -1,
  Title: '',
  Area: '',
  Location: '',
  Who: [],
  Outcomes: {},
  Viewed: false,
  Available: false
}

export interface IUpdateH2HStatus {
  id: number,
  Viewed: boolean
}