import { IDriverSkillNode } from '../../interfaces';

export const defaultSkillTree = {
  treeId: 0,
  tier1: [] as IDriverSkillNode[],
  tier2: [] as IDriverSkillNode[],
  tier3: [] as IDriverSkillNode[]
}

export const defaultSkillNode:IDriverSkillNode = {
  id: 0,
  Name:'',
  Effect:'',
  SP:0,
  Unlocked:false
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

export const defaultDriverArt = {
  id: 0,
  name: '',
  weaponType: '',
  effect: '',
  target: '',
  type: '',
  levelUnlocked: 0,
  nodes: []
}

export const defaultDriverArtNode = {
  id:0,
  SP:-1,
  Damage:0,
  EffectPotency:'',
  Recharge:'',
  Level: 0
}

export interface IDriverSkillNodeUpdate {
  nodeId: number,
  node: IDriverSkillNode
}

export interface IDriverArtUpdateLevelUnlocked {
  driverId:number,
  artId:number,
  levelUnlocked:number
}

export interface IDriverArtNodeRequest {
  artId: number,
  artNode: number,
  artNodeLevel: number
}

export interface IDriverArtUpdateData {
  artId: number,
  newLevel: number
}