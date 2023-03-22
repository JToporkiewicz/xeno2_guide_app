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
  Monster = 'Monster',
  Other = 'Other'
}

export interface IRequirement {
  area: RequirementArea,
  requirement: string,
  reqId?: number,
  requirementCount?: number,
  available?:boolean,
  completed?:boolean
}
