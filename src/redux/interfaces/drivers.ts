import { IDriverArtDetails, IDriverArts, IDriverSkillNode } from '../../interfaces';
import { IDriverArtsState } from './reduxState';

export const defaultSkillTree = {
  treeId: 0,
  tier1: [],
  tier2: [],
  tier3: []
}

export const defaultDriverState = {
  id:0,
  name:'',
  chapterUnlocked:0,
  arts:[],
  skillTree:defaultSkillTree,
  hiddenSkillTree:defaultSkillTree,
  favItem1:0,
  favItem2:0,
  favItemType1:0,
  favItemType2:0,
  ideaStats:''
}

export interface IDriverSkillNodeRequest {
  treeId: number,
  branchId: number,
  nodeId: number
}

export interface IDriverSkillNodeResponse {
  treeId: number,
  branchId: number,
  node: IDriverSkillNode
}

export interface IDriverSkillNodeUpdate {
  nodeId: number,
  node: IDriverSkillNode
}

export interface IDriverArtListResponse {
  driverId:number,
  artList: IDriverArts[]
}

export interface IDriverArtOneListUpdate {
  driverId:number,
  artList: IDriverArtsState
}

export interface IDriverArtNodeRequest {
  artId: number,
  artNode: number,
  artNodeLevel: number
}

export interface IDriverArtNodeResponse {
  artId: number,
  artNode: IDriverArtDetails
  artNodeLevel: number,
}

export interface IDriverArtUpdateData {
  artId: number,
  newLevel: number
}