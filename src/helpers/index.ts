export const sortFunction = (valueA:any, valueB:any, isAscending:boolean) => {
  if(valueA !== undefined && valueB !== undefined) {
    return valueA < valueB && !isAscending
      || valueA > valueB && isAscending ? 1
      : valueA > valueB && !isAscending
      || valueA < valueB && isAscending ? -1 : 0
  }
  return 0
}