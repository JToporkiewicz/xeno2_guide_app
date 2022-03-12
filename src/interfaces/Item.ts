export interface IItem {
  id:number,
  Name:string,
  ItemType:number,
  Source:string,
  Location:number,
  Price:number,
  FavoriteOf:string,
  Effects:string
}

export interface IItemType {
  id:number,
  ItemType:string
}
