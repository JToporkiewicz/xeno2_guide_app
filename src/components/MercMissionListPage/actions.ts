import { saveStoryProgress } from 'reduxState/actions/core';
import { saveDevelopmentLevel } from 'reduxState/actions/locations';
import {
  updateMercMissionStatus,
  saveMercMissionStatus,
  fetchAllMercMissions
} from 'reduxState/actions/mercMissions';

export default {
  updateMercMissionStatus,
  saveMercMissionStatus,
  fetchAllMercMissions,
  saveStoryProgress,
  saveDevelopmentLevel
};
