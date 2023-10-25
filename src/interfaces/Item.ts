export interface IItem {
  id:number,
  Name:string,
  ItemTypeID:number,
  ItemType:string,
  Source:string,
  Location:string,
  Area:string,
  Price:number,
  FavoriteOf:string | null,
  Effects?: string[] | undefined,
  Trust?: number | undefined,
  Duration?: string | undefined
}

export interface IItemType {
  id:number,
  ItemType:string
}
