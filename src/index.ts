import axios from 'axios';
import { ApiOptions, FireFlyApi } from '../types/main';
import { createAboutApi } from './about';
import { createTransactionApi } from './transaction';

export const fireFly = (options: ApiOptions): FireFlyApi => {
  const axiosInstance = axios.create({
    baseURL: options.fireFlyUrl,
    headers: {
      Authorization: `Bearer ${options.personalAccessToken}`,
    },
  });

  return {
    ...createTransactionApi(axiosInstance),
    ...createAboutApi(axiosInstance),
  };
};
