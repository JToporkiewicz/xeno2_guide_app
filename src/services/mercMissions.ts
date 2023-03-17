import client from 'api-client';
import { IUpdateUnlocked } from 'reduxState/interfaces/reduxState';

export const getAllMercMissions = async () => {
  const response = await client.callAPI('/mercMission/getAllMercMissions', 'get')
  if (response.status >= 400) {
    throw new Error('' + response.status)
  }

  const result = response.json();
  return result;
}

export const getMercMissionById = async (id: number) => {
  const response = await client.callAPI(`/mercMission/getMercMission?id=${id}`, 'get')
  if (response.status >= 400) {
    throw new Error('' + response.status)
  }
  
  const result = response.json();
  return result;
}

export const updateMercMissionsStatus = async (payload: IUpdateUnlocked) => {
  const response = await client.callAPI('/mercMission/updateMMStatus', 'put', payload)
  if (response.status >= 400) {
    throw new Error('' + response.status)
  }
      
  return response.status;
}