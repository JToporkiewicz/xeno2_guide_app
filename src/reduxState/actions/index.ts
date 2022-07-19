import { IFluxAction } from './fluxActions';

export enum Actions {
  InitialLoad = 'INITIAL_LOAD',
}
export type ActionTypes =
  | IFluxAction<Actions.InitialLoad>;

export const initialLoad = ():ActionTypes => ({
  type: Actions.InitialLoad
});