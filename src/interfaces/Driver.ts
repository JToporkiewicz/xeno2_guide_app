export interface IDriver {
  id:number,
  Name:string,
  ChapterUnlocked:number,
  DriverSkillTree:number,
  HiddenSkillTree:number,
  Heart2Hearts:string,
  FavItem1:number,
  FavItem2:number,
  FavItemType1:number,
  FavItemType2:number,
  IdeaStats:string
}

export const defaultDriver = {
  id:0,
  Name:'',
  ChapterUnlocked:0,
  DriverSkillTree:0,
  HiddenSkillTree:0,
  Heart2Hearts:'',
  FavItem1:0,
  FavItem2:0,
  FavItemType1:0,
  FavItemType2:0,
  IdeaStats:''
}

export interface IDriverArtDetails {
  id:number,
  SP:number,
  Damage:number,
  EffectPotency:string,
  Recharge:string
}

export interface IDriverArts {
  id:number,
  Name:string,
  Driver:number,
  WeaponType:string,
  Effect:string,
  Target:string,
  Type:string,
  LevelUnlocked:number,
  Level1:number,
  Level2:number,
  Level3:number,
  Level4:number,
  Level5:number,
  Level5MaxAffinity:number
}

export interface IDriverSkillNode {
  id:number,
  Name:string,
  Effect:string,
  SP:number,
  Unlocked:boolean
}

export interface IDriverSkillTree {
  id:number,
  Tier1Branch1:number,
  Tier1Branch2:number,
  Tier1Branch3:number,
  Tier1Branch4:number,
  Tier1Branch5:number,
  Tier2Branch1:number,
  Tier2Branch2:number,
  Tier2Branch3:number,
  Tier2Branch4:number,
  Tier2Branch5:number,
  Tier3Branch1:number,
  Tier3Branch2:number,
  Tier3Branch3:number,
  Tier3Branch4:number,
  Tier3Branch5:number
}
