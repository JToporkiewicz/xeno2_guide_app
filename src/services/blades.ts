import client from 'api-client';
import { IUpdateBladeUnlocked } from 'reduxState/interfaces/blades';
export const getAllBlades = async () => {
  const response = await client.callAPI('/blade/fetchAllBlades', 'get')
  if (response.status >= 400) {
    throw new Error('' + response.status)
  }

  const result = response.json();
  return result;
}

export const getBladeById = async (id: number) => {
  const response = await client.callAPI(`/blade/fetchBlade?id=${id}`, 'get')
  if (response.status >= 400) {
    throw new Error('' + response.status)
  }

  const result = response.json();
  return result;
}

export const updateBladesUnlocked = async (payload: IUpdateBladeUnlocked) => {
  const response = await client.callAPI('/blade/updateBladesUnlocked', 'put', payload)

  if (response.status >= 400) {
    throw new Error('' + response.status)
  }

  return response.status;
}