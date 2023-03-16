import client from 'api-client';
import {
  ISaveQuestStepStatus,
  ISaveQuestSubStepStatus,
  IUpdateQuestStatus
} from 'reduxState/interfaces/quest';

export const getAllQuests = async () => {
  const response = await client.callAPI('/quest/getAllQuests', 'get')
  if (response.status >= 400) {
    throw new Error('' + response.status)
  }

  const result = response.json();
  return result;
}

export const getQuestById = async (id: number) => {
  const response = await client.callAPI(`/quest/getQuest?id=${id}`, 'get')
  if (response.status >= 400) {
    throw new Error('' + response.status)
  }

  const result = response.json();
  return result;
}

export const saveQuestsStatus = async (quests: IUpdateQuestStatus[]) => {
  const response = await client.callAPI('/quest/saveQuestsStatus', 'put', quests)
  if (response.status >= 400) {
    throw new Error('' + response.status)
  }

  return response.status;
}

export const saveQuestStepStatus = async (payload: ISaveQuestStepStatus) => {
  const response = await client.callAPI('/quest/saveQuestStep', 'put', payload)
  if (response.status >= 400) {
    throw new Error('' + response.status)
  }

  return response.status;
}

export const saveQuestSubStepStatus = async (payload: ISaveQuestSubStepStatus) => {
  const response = await client.callAPI('/quest/saveQuestSubStep', 'put', payload)
  if (response.status >= 400) {
    throw new Error('' + response.status)
  }

  return response.status;
}