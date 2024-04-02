import client from 'api-client';
import { IUpdateUnlocked } from 'reduxState/interfaces/reduxState';

export const getChallengeBattles = async () => {
  const response = await client.callAPI('/challengeBattle/getChallengeBattles', 'get');
  if (response.status >= 400) {
    throw new Error('' + response.status);
  }

  const result = response.json();
  return result;
}

export const updateChallengeBattlesBeaten = async (payload: IUpdateUnlocked) => {
  const response = await client.callAPI('/challengeBattle/updateChallengeBattle', 'put', payload);
  if (response.status >= 400) {
    throw new Error('' + response.status);
  }

  return response.status;
}