import { IMercMission } from 'interfaces';
import { defaultMercMission } from 'reduxState/interfaces/mercMission';
import { getMercMissions, getSelected } from 'reduxState/selectors';
import { createSelector } from 'reselect';

export default createSelector(
  getMercMissions,
  getSelected,
  (mercMissions, selected) => {
    const foundMM: IMercMission = mercMissions.find((mm) =>
      mm.id === selected.id && selected.area === 'mercMission'
    ) || defaultMercMission
    return {
      mercMission: foundMM
    }
  }
)