import client from 'api-client';
import { IUpdateUnlocked } from 'reduxState/interfaces/reduxState';

export const getAllMonsters = async () => {
  const response = await client.callAPI('/monster/getAllMonsters', 'get')
  if (response.status >= 400) {
    throw new Error('' + response.status)
  }

  const result = response.json();
  return result;
}

export const getMonsterById = async (id: number) => {
  const response = await client.callAPI(`/monster/getMonsterById?id=${id}`, 'get')
  if (response.status >= 400) {
    throw new Error('' + response.status)
  }
  
  const result = response.json();
  return result;
}

export const updateMonsterStatus = async (payload: IUpdateUnlocked) => {
  const response = await client.callAPI('/monster/updateMonsterStatus', 'put', payload)
  if (response.status >= 400) {
    throw new Error('' + response.status)
  }
      
  return response.status;
}