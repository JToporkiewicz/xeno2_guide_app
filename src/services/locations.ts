import client from 'api-client';
import { IUpdateUnlocked } from 'reduxState/interfaces/reduxState';

export const getAllLocations = async () => {
  const response = await client.callAPI('/location/getAllLocations', 'get');
  if (response.status >= 400) {
    throw new Error('' + response.status);
  }

  const result = response.json();
  return result;
}

export const updateLocationsMapped = async (payload: IUpdateUnlocked) => {
  const response = await client.callAPI('/location/updateMappedLocations', 'put', payload);
  if (response.status >= 400) {
    throw new Error('' + response.status);
  }
  
  return response.status;
}