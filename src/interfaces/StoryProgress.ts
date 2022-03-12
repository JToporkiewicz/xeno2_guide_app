export interface IStoryProgress {
  id:number,
  OnlyShowAvailable:boolean,
  Chapter:number,
  NewGamePlus:boolean,
  TimeOfDay:Date,
  AreaWeather:string,
  DLCUnlocked:boolean
}

export const defaultStoryProgress = {
  id: 1,
  OnlyShowAvailable: true,
  Chapter: 1,
  NewGamePlus: false,
  TimeOfDay: new Date(),
  AreaWeather: 'Fair',
  DLCUnlocked: false
}