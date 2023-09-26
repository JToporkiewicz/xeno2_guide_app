import { setStoryProgress, saveStoryProgress } from 'reduxState/actions/core';
import { updateDevelopmentLevel, saveDevelopmentLevel } from 'reduxState/actions/locations';
import {
  updateMercMissionStatus,
  saveMercMissionStatus,
  fetchMercMission
} from 'reduxState/actions/mercMissions';

export default {
  updateMercMissionStatus,
  saveMercMissionStatus,
  fetchMercMission,
  setStoryProgress,
  saveStoryProgress,
  updateDevelopmentLevel,
  saveDevelopmentLevel
};
