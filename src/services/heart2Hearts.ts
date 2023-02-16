import client from 'api-client';
import { IUpdateUnlocked } from 'reduxState/interfaces/reduxState';

export const getAllHeart2Hearts = async () => {
  const response = await client.callAPI('/heart2Heart/getAllH2H', 'get')
  if (response.status >= 400) {
    throw new Error('' + response.status)
  }

  const result = response.json();
  return result;
}

export const getHeart2HeartById = async (id: number) => {
  const response = await client.callAPI(`/heart2Heart/getH2h?id=${id}`, 'get')
  if (response.status >= 400) {
    throw new Error('' + response.status)
  }
  
  const result = response.json();
  return result;
}

export const updateH2HViewed = async (payload: IUpdateUnlocked) => {
  const response = await client.callAPI('/heart2Heart/updateH2HViewed', 'put', payload)
  if (response.status >= 400) {
    throw new Error('' + response.status)
  }
      
  return response.status;
}