export enum RequirementArea {
  Blade = 'Blade',
  'Field Skills' = 'Field Skills',
  'Element Type' = 'Element Type',
  'Weapon Type' = 'Weapon Type',
  'Blade Gender' = 'Blade Gender',
  Humanoid = 'Humanoid',
  Stats = 'Stats',
  'Story Progress' = 'Story Progress',
  'New Game Plus' = 'New Game Plus',
  'DLC Unlocked' = 'DLC Unlocked',
  Quest = 'Quest',
  Heart2Heart = 'Heart-to-heart',
  SideQuest = 'Side-quest',
  StartSideQuest = 'Start side-quest',
  MercMission = 'Merc Mission',
  Monster = 'Monster',
  Other = 'Other'
}

export interface IRequirement {
  area: RequirementArea | string,
  requirement: string,
  id?:number,
  reqId?: number,
  requirementCount?: number,
  available?:boolean,
  progress?:number,
  completed?:boolean
}
