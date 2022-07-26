import { ILocations } from 'interfaces'
import { IMajorLocations } from 'reduxState/interfaces/reduxState';

interface FindLocation {
  id:number,
  Area:string,
  Location:string,
  [key:string]:any
}

export const findLocationName = (state:FindLocation[], locations:ILocations[]):any => {
  const updatedState = state.map((quest) => {
    const foundLocation = locations.find((loc) => loc.id === Number(quest.Location));
    return {
      ...quest,
      Location: foundLocation ? foundLocation.Location : 'Unknown',
      Area: foundLocation ? String(foundLocation.MajorArea) : 'Unknown'
    }    
  })
  return updatedState;
};

export const findAreaName = (state:FindLocation[], areas:IMajorLocations[]):any => {
  const updatedState = state.map((quest) => {
    if (quest.Area === 'Unknown') {
      return quest;
    }
    let foundArea:string = '';

    areas.forEach((outer) => {
      if (!foundArea) {
        const found = outer.id === Number(quest.Area);

        if (found) {
          foundArea = outer.Name
        }
        else {
          const foundInner = outer.InnerMajorAreas
            .find((inner) => inner.id === Number(quest.Area))
          
          if (foundInner) {
            foundArea = `(${outer.Name} -> ${foundInner.Name})`
          }      
        }
      }
    })

    return {
      ...quest,
      Area: foundArea
    }
  })

  return updatedState;
};