import { ILocations, IMajorAreas, IMercMission } from 'interfaces';
import createReducer from 'redux-action-reducer';
import { LocationActions } from 'reduxState/actions/locations';
import { MercMissionsActions } from 'reduxState/actions/mercMissions';
import { IMMReqUpdate, IUpdateMMStatus } from 'reduxState/interfaces/mercMission';
import { IMercMissionState, IRequirement } from 'reduxState/interfaces/reduxState';

export const mercMissionsReducer = createReducer<IMercMissionState[]>(
  [MercMissionsActions.SetMercMissions,
    (state:IMercMissionState[], mercMissions: IMercMission[]) => {
      const mmIds = mercMissions.map((mm) => mm.id);
      return state.filter((old) => !mmIds.includes(old.id))
        .concat(mercMissions.map((mm) => {
          const foundMM = state.find((old) => old.id === mm.id);
          return {
            id: mm.id,
            Name:mm.Name,
            MissionNation:foundMM && foundMM.MissionNation !== 'Unknown' ?
              foundMM.MissionNation : `${mm.MissionNation}`,
            Giver:mm.Giver,
            GiverLocation:foundMM && foundMM.GiverLocation !== 'Unknown' ?
              foundMM.GiverLocation : `${mm.GiverLocation}`,
            Duration:mm.Duration,
            Type:mm.Type,
            Missable:mm.Missable !== null ? mm.Missable : false,
            Completed:mm.Completed !== null ? mm.Completed : false,
            Available:mm.Available !== null ? mm.Available : false,
            Requirements: foundMM && foundMM.Requirements ? foundMM.Requirements : []
          }
        }))
        .sort((mmA, mmB) => mmA.id < mmB.id ? -1 : 1);
    }],
  [LocationActions.SetMajorAreas, (state:IMercMissionState[], majorArea: IMajorAreas[]) => {
    return state.map((mm) => {
      const area = Number(mm.MissionNation) ?
        majorArea.find((a) => a.id === Number(mm.MissionNation))?.Name || mm.MissionNation
        : mm.MissionNation
      return {
        ...mm,
        MissionNation: area
      }
    })
  }],
  [LocationActions.SetMinorLocations, (state:IMercMissionState[], locations: ILocations[]) => {
    return state.map((mm) => {
      const location = Number(mm.GiverLocation) ?
        locations.find((loc) => loc.id === Number(mm.GiverLocation))?.Location || mm.GiverLocation
        : mm.GiverLocation
      return {
        ...mm,
        GiverLocation: location
      }
    })
  }],
  [MercMissionsActions.SetMercMissionRequirements,
    (state:IMercMissionState[], requirements: IMMReqUpdate) => {
      return state.map((mm) => {
        const selectedReqs = requirements.requirements.filter((req) => req.MissionId === mm.id);
        const mappedReqs = [] as IRequirement[];
        selectedReqs.forEach((r) => {
          if (r.Blade) {
            const foundBlade = requirements.blades.find((b) => b.id === r.Blade)
            mappedReqs.push({
              area: 'Blade',
              requirement: foundBlade?.name || 'Unknown',
              available: foundBlade?.available || false,
              completed: foundBlade?.unlocked || false
            })
          }
          if (r.FieldSkill) {
            const foundSkill = requirements.fieldSkills.find((b) => b.id === r.FieldSkill)
            mappedReqs.push({
              area: 'Field Skills',
              requirement: foundSkill?.Name || 'Unknown',
              requirementCount: r.FieldSkillLevel,
              completed: foundSkill?.TotalLevel === r.FieldSkillLevel
            })
          }
          if (r.Element) {
            mappedReqs.push({
              area: 'Element Type',
              requirement: r.Element,
              requirementCount: r.ElementLevel
            })
          }
          if (r.WeaponType) {
            mappedReqs.push({
              area: 'Weapon Type',
              requirement: r.WeaponType,
              requirementCount: r.WeaponLevel
            })
          }
          if (r.BladeGender) {
            mappedReqs.push({
              area: 'Blade Gender',
              requirement: r.BladeGender,
              requirementCount: r.BladeGenderLevel
            })
          }
          if (r.Humanoid !== null) {
            mappedReqs.push({
              area: 'Humanoid',
              requirement: r.Humanoid ? 'Humanoid' : 'Animal',
              requirementCount: r.HumanoidLevel
            })
          }
          if (r.Stats) {
            mappedReqs.push({
              area: 'Stats',
              requirement: r.Stats,
              requirementCount: r.StatsLevel
            })
          }
        })
        return {
          ...mm,
          Requirements: mappedReqs
        }
      })
    }],
  [MercMissionsActions.UpdateMercMissionStatus,
    (state:IMercMissionState[], updateMM:IUpdateMMStatus) => {
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
