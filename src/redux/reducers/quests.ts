import createReducer from 'redux-action-reducer';
import { IQuestState } from '../interfaces/reduxState';

export const questsReducer = createReducer<IQuestState[], IQuestState>()([]);
