export interface IStoryProgress {
  id:number,
  OnlyShowAvailable:boolean,
  Chapter:number,
  NewGamePlus:boolean,
  AreaWeather:string,
  DLCUnlocked:boolean,
  MercLevel:number
}

export const defaultStoryProgress = {
  id: 1,
  OnlyShowAvailable: true,
  Chapter: 1,
  NewGamePlus: false,
  AreaWeather: 'Fair',
  DLCUnlocked: false,
  MercLevel: 1
}