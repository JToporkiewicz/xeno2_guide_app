export interface IFieldSkills {
  id:number,
  Name:string,
  CommonBladeContribution:number,
  Type:string
}

export interface IFieldSkillsTotal extends IFieldSkills {
  TotalLevel: number
}