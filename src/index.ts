import axios from 'axios';
import { createTransactionApi } from './transaction';

interface ApiOptions {
  fireFlyUrl: string;
  personalAccessToken: string;
}

const fireFly = (options: ApiOptions) => {
  const axiosInstance = axios.create({
    baseURL: options.fireFlyUrl,
    headers: {
      Authorization: `Bearer ${options.personalAccessToken}`,
    },
  });

  return createTransactionApi(axiosInstance);
};
