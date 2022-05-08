import createReducer from 'redux-action-reducer';
import { IMonster } from '../../interfaces';

export const monstersReducer = createReducer<IMonster[], IMonster>()([]);
