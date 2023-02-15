import client from 'api-client';
import { IUpdateArtLevel } from 'reduxState/interfaces/drivers';
import { IUpdateUnlocked } from 'reduxState/interfaces/reduxState';

export const getAllDrivers = async () => {
  const response = await client.callAPI('/driver/fetchAllDrivers', 'get');
  if (response.status >= 400) {
    throw new Error('' + response.status);
  }

  const result = response.json();
  return result;
}

export const getDriverById = async (id: number) => {
  const response = await client.callAPI(`/driver/fetchDriver?id=${id}`, 'get');
  if (response.status >= 400) {
    throw new Error('' + response.status);
  }
  
  const result = response.json();
  return result;
}

export const updateSkillNodesUnlocked = async (payload: IUpdateUnlocked) => {
  const response = await client.callAPI('/driver/updateSkillNodesUnlocked', 'put', payload);
  if (response.status >= 400) {
    throw new Error('' + response.status)
  }
    
  return response.status;
}

export const updateArtLevel = async (payload: IUpdateArtLevel[]) => {
  const response = await client.callAPI('/driver/updateArtLevel', 'put', payload);
  if (response.status >= 400) {
    throw new Error('' + response.status)
  }
      
  return response.status;
}