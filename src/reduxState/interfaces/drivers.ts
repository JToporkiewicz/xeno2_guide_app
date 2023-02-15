import { IDriverSkillNode } from 'interfaces';

export const defaultSkillTree = {
  treeId: 0,
  tier1: [] as IDriverSkillNode[],
  tier2: [] as IDriverSkillNode[],
  tier3: [] as IDriverSkillNode[]
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
  ideaStats: {
    Bravery: 0,
    Truth: 0,
    Compassion: 0,
    Justice: 0,  
  },
  show: false
}

export interface IDriverSkillNodeUpdate {
  treeId: number,
  nodes: { nodeId: number, unlocked: boolean }[]
}

export interface IUpdateArtLevel {
  levelUnlocked: number,
  id: number
}

export interface IDriverArtUpdateLevelUnlocked {
  driverId:number,
  artId:number,
  levelUnlocked:number
}
