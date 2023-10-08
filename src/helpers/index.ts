export const sortFunction = (valueA:any, valueB:any, isAscending:boolean) => {
  if(valueA !== undefined && valueB !== undefined) {
    return valueA < valueB && !isAscending
      || valueA > valueB && isAscending ? 1
      : valueA > valueB && !isAscending
      || valueA < valueB && isAscending ? -1 : 0
  }
  return 0
}

export const separateMajorArea = (area: string) => area.split(' -> ')[0].replace('(', '')

export const separateMinorArea = (area: string) => area.split(' -> ')[1].replace(')', '')