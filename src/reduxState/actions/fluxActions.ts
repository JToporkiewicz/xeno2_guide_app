import { Action } from 'redux';

export interface IFluxAction<TAction extends string> extends Action {
  type: TAction
}

export interface IFluxPayloadAction<TAction extends string, TPayload> extends IFluxAction<TAction> {
  payload: TPayload
}