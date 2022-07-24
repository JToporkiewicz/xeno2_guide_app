import createReducer from 'redux-action-reducer';
import { IHeart2Heart, ILocations } from 'interfaces';
import { Heart2HeartActions } from '../actions/heart2Hearts';
import { IHeart2HeartState, IMajorLocations } from 'reduxState/interfaces/reduxState';
import { IUpdateH2HStatus } from 'reduxState/interfaces/heart2Hearts';
import { LocationActions } from 'reduxState/actions/locations';

export const heart2HeartReducer = createReducer<IHeart2HeartState[]>(
  [Heart2HeartActions.SetHeart2Hearts,
    (h2hState: IHeart2HeartState[], heart2Hearts: IHeart2Heart[]) => {
      const h2hIds = heart2Hearts.map((h2h) => h2h.id);
      return h2hState.filter((old) => !h2hIds.includes(old.id))
        .concat(heart2Hearts.map((h2h) => ({
          id:h2h.id,
          Title:h2h.Title,
          Area: h2hState.find((old) => old.id === h2h.id)?.Area || '',
          Location:h2hState.find((old) => old.id === h2h.id)?.Location || `${h2h.Location}`,
          Who:h2h.Who,
          Outcomes:h2h.Outcomes,
          Available:h2h.Available,
          Viewed:h2h.Viewed
        })));
    }],
  [Heart2HeartActions.UpdateHeart2HeartStatus,
    (state:IHeart2HeartState[], heart2Heart: IUpdateH2HStatus) => {
      const foundH2h = state.find((h2h) => h2h.id === heart2Heart.id)

      if (!foundH2h) {
        return state;
      }
      return state.filter((h2h) => h2h.id !== heart2Heart.id)
        .concat({
          ...foundH2h,
          Viewed: heart2Heart.Viewed
        })
        .sort((h2hA, h2hB) => h2hA.id < h2hB.id ? -1 : 1)
    }],
  [LocationActions.SetMinorLocations,
    (state:IHeart2HeartState[], locations:ILocations[]) => {
      const updatedH2h = state.map((h2h) => {
        const foundLocation = locations.find((loc) => loc.id === Number(h2h.Location));
        return {
          ...h2h,
          Location: foundLocation ? foundLocation.Location : 'Unknown',
          Area: foundLocation ? String(foundLocation.MajorArea) : 'Unknown'
        }    
      })
      return state.filter((h2h) => !updatedH2h.map((updated)=> updated.id).includes(h2h.id))
        .concat(updatedH2h)
        .sort((h2hA, h2hB) => h2hA.id < h2hB.id ? -1 : 1)
    }],
  [LocationActions.SetDependentMajorAreas,
    (state:IHeart2HeartState[], areas:IMajorLocations[]) => {
      const updatedH2h = state.map((h2h) => {
        if (h2h.Area === 'Unknown') {
          return h2h;
        }
        let foundArea:string = '';

        areas.forEach((outer) => {
          if (!foundArea) {
            const found = outer.id === Number(h2h.Area);

            if (found) {
              foundArea = outer.Name
            }
            else {
              const foundInner = outer.InnerMajorAreas
                .find((inner) => inner.id === Number(h2h.Area))
              
              if (foundInner) {
                foundArea = `(${outer.Name} -> ${foundInner.Name})`
              }      
            }
          }
        })

        return {
          ...h2h,
          Area: foundArea
        }
      })
      return state.filter((h2h) => !updatedH2h.map((updated)=> updated.id).includes(h2h.id))
        .concat(updatedH2h)
        .sort((h2hA, h2hB) => h2hA.id < h2hB.id ? -1 : 1)
    }]
)([]);
