import { IMercMission } from 'interfaces';
import createReducer from 'redux-action-reducer';
import { MercMissionsActions } from 'reduxState/actions/mercMissions';
import { IUpdateMMStatus } from 'reduxState/interfaces/mercMission';

export const mercMissionsReducer = createReducer<IMercMission[]>(
  [MercMissionsActions.SetMercMissions,
    (state:IMercMission[], mercMissions: IMercMission[]) => {
      const mmIds = mercMissions.map((mm) => mm.id);

      return state.filter((old) => !mmIds.includes(old.id))
        .concat(mercMissions)
        .sort((mmA, mmB) => mmA.id < mmB.id ? -1 : 1);
    }],
  [MercMissionsActions.UpdateMercMissionStatus,
    (state:IMercMission[], updateMM:IUpdateMMStatus) => {
      const foundMM = state.find((mm) => mm.id === updateMM.id);
      if (!foundMM) {
        return state;
      }
      return state.filter((old) => old.id !== updateMM.id)
        .concat({
          ...foundMM,
          Completed: updateMM.completed
        })
        .sort((mmA, mmB) => mmA.id < mmB.id ? -1 : 1);
    }]
)([]);
