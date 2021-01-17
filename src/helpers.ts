import { AxiosInstance, AxiosResponse } from 'axios';

export const buildQueryParameters = (parameters: Object): string => {
  let queryParameters = '';

  for (const [key, value] of Object.entries(parameters)) {
    const shouldAddAmpersand = queryParameters.length > 0;

    if (value) {
      if (shouldAddAmpersand) {
        queryParameters = queryParameters.concat(`&${key}=${value}`);
      } else {
        queryParameters = queryParameters.concat(`${key}=${value}`);
      }
    }
  }

  return queryParameters;
};

const validateResponse = (response: AxiosResponse<any>) => {
  const { status, data } = response;

  if (status === 422) {
    throw new Error(data.message);
  }

  return data;
};

export const postOrThrow = async (
  axios: AxiosInstance,
  url: string,
  postData: any
) => {
  return validateResponse(await axios.post(url, postData));
};

export const putOrThrow = async (
  axios: AxiosInstance,
  url: string,
  putData: any
) => {
  return validateResponse(await axios.put(url, putData));
};

export const getOrThrow = async (
  axios: AxiosInstance,
  url: string,
  parameters?: Object
) => {
  let queryParameters = '';
  let axiosUrl = url;

  if (parameters) {
    queryParameters = buildQueryParameters(parameters);
  }

  if (queryParameters != '') {
    axiosUrl = axiosUrl.concat(`?${queryParameters}`);
  }

  return validateResponse(await axios.get(axiosUrl));
};
