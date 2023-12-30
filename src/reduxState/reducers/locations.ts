import { ILocations, IMajorAreas, IStoryProgress } from 'interfaces';
import createReducer from 'redux-action-reducer';
import { LocationActions } from 'reduxState/actions/locations';
import { IUpdateDevelopmentLevel } from 'reduxState/interfaces/locations';
import { IInnerMajorArea, ILocationState, IMajorLocations } from '../interfaces/reduxState';
import { CoreActions } from 'reduxState/actions/core';

export const locationsReducer = createReducer<IMajorLocations[]>(
  [LocationActions.SetMajorAreas, (state:IMajorLocations[], majorAreas: IMajorAreas[]) => {
    const outerAreas = majorAreas.filter((area) => area.Located === 'Uncharted area');
    const innerAreas = majorAreas.filter((area) => area.Located !== 'Uncharted area');

    const updatedOuter = outerAreas.map((outer) => {
      const updatedInnerAreas = innerAreas.filter((inner) => inner.Located === outer.Name)
        .map((inner) => ({
          id: inner.id,
          Name: inner.Name,
          StoryProgress: inner.StoryProgress,
          Locations: [] as ILocationState[]
        })).sort((areaA, areaB) => Number(areaA.id) < Number(areaB.id) ? -1 : 1)
      return {
        id: outer.id,
        Name: outer.Name,
        DevelopmentLevel: outer.DevelopmentLevel,
        StoryProgress: outer.StoryProgress,
        InnerMajorAreas: updatedInnerAreas.length > 0 ?
          updatedInnerAreas
          : [{
            id: outer.id,
            Name: outer.Name,
            StoryProgress: outer.StoryProgress,
            Locations: [] as ILocationState[]
          }]
      }});

    return state.filter((oldOuter) => !outerAreas.map((outer) => outer.id).includes(oldOuter.id))
      .concat(updatedOuter).sort((areaA, areaB) => Number(areaA.id) < Number(areaB.id) ? -1 : 1);
  }],
  [LocationActions.SetMinorLocations, (state:IMajorLocations[], minorLocations: ILocations[]) => {
    const groupedLocations = minorLocations.reduce((group, minor) =>({
      ...group,
      [minor.MajorArea]: (group[minor.MajorArea] || []).concat({
        id: minor.id,
        Location: minor.Location,
        Type: minor.Type,
        StoryProgress: minor.StoryProgress
      })
    }), {} as {[id:number]: ILocationState[]})

    let updatedInner: IInnerMajorArea[] = [];

    const updatedOuter = state
      .filter((outer) => outer.InnerMajorAreas
        .filter((inner) => {
          const toUpdate = Object.entries(groupedLocations)
            .map((location) => location[0])
            .includes(String(inner.id));

          if (toUpdate) {
            updatedInner = updatedInner.filter((update) => update.id !== inner.id)
              .concat(inner)
          }

          return toUpdate;
        }).length > 0);
        
    return state.filter((area) => !updatedOuter.map((outer) => outer.id).includes(area.id))
      .concat(updatedOuter.map((outer) => ({
        ...outer,
        InnerMajorAreas: outer.InnerMajorAreas
          .filter((inner) => !updatedInner.map((updated) => updated.id).includes(inner.id))
          .concat(updatedInner
            .filter((oldInner) => outer.InnerMajorAreas.map((old) => old.id).includes(oldInner.id))
            .map((inner) => ({
              ...inner,
              Locations: inner.Locations
                .filter((loc) => !groupedLocations[inner.id]
                  .map((updatedLoc) => updatedLoc.id).includes(loc.id))
                .concat(groupedLocations[inner.id])
                .sort((locA, locB) => Number(locA.id) < Number(locB.id) ? -1 : 1)
            })))
          .sort((areaA, areaB) => Number(areaA.id) < Number(areaB.id) ? -1 : 1)
      })))
      .sort((areaA, areaB) => Number(areaA.id) < Number(areaB.id) ? -1 : 1);
  }],
  [LocationActions.UpdateDevelopmentLevel,
    (state:IMajorLocations[], update:IUpdateDevelopmentLevel) => {
      const updateArea = state.find((area) => area.id === update.id);

      if (!updateArea) {
        return state;
      }

      return state.filter((area) => area.id !== updateArea.id)
        .concat({
          ...updateArea,
          DevelopmentLevel: update.level
        })
        .sort((areaA, areaB) => Number(areaA.id) < Number(areaB.id) ? -1 : 1);
    }],
  [CoreActions.SetStoryProgress,
    (state:IMajorLocations[], progress:IStoryProgress) => {
      return state.map((area) => {
        if (area.StoryProgress > progress.Chapter && area.DevelopmentLevel != -1) {
          return {
            ...area,
            DevelopmentLevel: 0
          }
        }
        return area
      })
        .sort((areaA, areaB) => Number(areaA.id) < Number(areaB.id) ? -1 : 1);
    }]
)([]);
