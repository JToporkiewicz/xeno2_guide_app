import { IXenobladeState } from './interfaces/reduxState';

export const getBlades = (state:IXenobladeState) => state.blades;
export const getLoaderState = (state:IXenobladeState) => state.core.loaderState;
export const getStoryProgress = (state:IXenobladeState) => state.core.storyProgress;
export const getSelected = (state:IXenobladeState) => state.core.selected;
export const getDrivers = (state:IXenobladeState) => state.drivers;
export const getHeart2Heart = (state:IXenobladeState) => state.heart2hearts;
export const getItems = (state:IXenobladeState) => state.items.items;
export const getItemTypes = (state:IXenobladeState) => state.items.itemTypes;
export const getQuests = (state:IXenobladeState) => state.quests;
export const getFieldSkills = (state:IXenobladeState) => state.fieldSkills;