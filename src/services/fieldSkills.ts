import client from 'api-client';
import { IUpdateFieldSkillLevel } from 'reduxState/interfaces/fieldSkills';

export const getFieldSkills = async () => {
  const response = await client.callAPI('/fieldSkill/getFieldSkills', 'get');
  if (response.status >= 400) {
    throw new Error('' + response.status);
  }
  
  const result = response.json();
  return result;
}

export const updateSkills = async (payload: IUpdateFieldSkillLevel[]) => {
  const response = await client.callAPI('/fieldSkill/updateCommonBladeContribution',
    'put', payload);
  if (response.status >= 400) {
    throw new Error('' + response.status)
  }
      
  return response.status;
}