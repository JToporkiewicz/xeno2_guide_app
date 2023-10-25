import client from 'api-client';

export const getAllItems = async () => {
  const response = await client.callAPI('/item/getAllItems', 'get');
  if (response.status >= 400) {
    throw new Error('' + response.status);
  }

  const result = response.json();
  return result;
}

export const getItemTypes = async () => {
  const response = await client.callAPI('/item/getItemTypes', 'get');
  if (response.status >= 400) {
    throw new Error('' + response.status);
  }

  const result = response.json();
  return result;
}