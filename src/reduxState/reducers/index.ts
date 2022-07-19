import { combineReducers, Reducer } from 'redux';
import { IXenobladeState } from '../interfaces/reduxState';
import { bladesReducer } from './blades';
import { coreReducer } from './core';
import { driversReducer } from './drivers';
import { fieldSkillsReducer } from './fieldSkills';
import { heart2HeartReducer } from './heart2Hearts';
import { locationsReducer } from './locations';
import { mercMissionsReducer } from './mercMissions';
import { monstersReducer } from './monsters';
import { questsReducer } from './quests';
import { reducer as itemReducer } from './items';

export const reducers:Reducer<IXenobladeState> = combineReducers<IXenobladeState>({
  core: coreReducer,
  locations: locationsReducer,
  drivers: driversReducer,
  blades: bladesReducer,
  fieldSkills: fieldSkillsReducer,
  heart2hearts: heart2HeartReducer,
  quests: questsReducer,
  mercMissions: mercMissionsReducer,
  monsters: monstersReducer,
  items: itemReducer
});