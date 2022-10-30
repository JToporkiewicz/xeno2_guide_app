import { defaultMercMission } from 'reduxState/interfaces/mercMission';
import { IMercMissionState } from 'reduxState/interfaces/reduxState';
import { getMercMissions, getSelected } from 'reduxState/selectors';
import { createSelector } from 'reselect';

export default createSelector(
  getMercMissions,
  getSelected,
  (mercMissions, selected) => {
    const foundMM: IMercMissionState = mercMissions.find((mm) =>
      mm.id === selected.id && selected.area === 'mercMission'
    ) || defaultMercMission
    return {
      mercMission: foundMM
    }
  }
)