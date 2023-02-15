export interface IDriverArtDetails {
  sp:number,
  damage:number,
  effectPotency:string,
  recharge:string,
  level: number
}

export interface IDriverArts {
  id:number,
  name:string,
  weaponType:string,
  effect:string[],
  target:string,
  type:string,
  levelUnlocked:number,
  nodes: IDriverArtDetails[]
}

export interface IDriverSkillNode {
  nodeId:number,
  name:string,
  effect:string,
  sp:number,
  unlocked:boolean
}

export interface IDriverSkillTree {
  treeId:number,
  tier1: IDriverSkillNode[],
  tier2: IDriverSkillNode[],
  tier3: IDriverSkillNode[],
}

interface IDriverIdeaStats {
  Bravery: number,
  Truth: number,
  Compassion: number,
  Justice: number,
}

export interface IDriver {
  id:number,
  name:string,
  chapterUnlocked:number,
  skillTree:IDriverSkillTree,
  hiddenSkillTree:IDriverSkillTree,
  favItem1:number,
  favItem2:number,
  favItemType1:number,
  favItemType2:number,
  ideaStats:IDriverIdeaStats,
  arts: IDriverArts[]
}
