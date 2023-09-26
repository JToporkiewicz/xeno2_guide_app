import { IMercMission } from 'interfaces';
import { defaultMercMission } from 'reduxState/interfaces/mercMission';
import { getMercMissions, getSelected, getStoryProgress } from 'reduxState/selectors';
import { createSelector } from 'reselect';

export default createSelector(
  getMercMissions,
  getSelected,
  getStoryProgress,
  (mercMissions, selected, storyProgress) => {
    const foundMM: IMercMission = mercMissions.find((mm) =>
      mm.id === selected.id && selected.area === 'mercMission'
    ) || defaultMercMission
    return {
      mercMission: foundMM,
      storyProgress
    }
  }
)