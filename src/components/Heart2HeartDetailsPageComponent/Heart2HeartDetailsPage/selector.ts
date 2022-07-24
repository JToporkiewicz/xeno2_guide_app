import { getHeart2Heart, getLocations, getSelected } from 'reduxState/selectors';
import { createSelector } from 'reselect';
import { defaultHeart2HeartState } from 'reduxState/interfaces/heart2Hearts';
import { IHeart2Heart } from 'interfaces';

export default createSelector(
  getHeart2Heart,
  getSelected,
  getLocations,
  (heart2Hearts, selected, locations) => {
    const foundH2H: IHeart2Heart = heart2Hearts.find((h2h) =>
      h2h.id === selected.id && selected.area === 'heart2Heart')
      || defaultHeart2HeartState
    let h2hLocation:string = '';
    let area:string = '';
    locations.forEach((outer) => {
      if (!h2hLocation) {
        outer.InnerMajorAreas.forEach((inner) => {
          const foundLocation = inner.Locations
            .find((loc) => loc.id === foundH2H.Location);
          if (foundLocation) {
            h2hLocation = foundLocation.Location;
            area = `(${outer.Name} -> ${inner.Name})`
          }
        })
      }
    })
    return {
      heart2Heart: foundH2H,
      h2hLocation: h2hLocation ? h2hLocation : 'Unknown',
      h2hArea: area
    }
  }
)