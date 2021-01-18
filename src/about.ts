import { AxiosInstance } from 'axios';
import { AboutWrapper, SystemInfo, UserSingle } from '../types/about';
import { getOrThrow } from './helpers';

const getSystemInformation = (
  axios: AxiosInstance
) => (): Promise<SystemInfo> => getOrThrow(axios, '/api/v1/about');

const getAuthenticatedUser = (
  axios: AxiosInstance
) => (): Promise<UserSingle> => getOrThrow(axios, '/api/v1/about/user');

export const createAboutApi = (axios: AxiosInstance): AboutWrapper => ({
  getAuthenticatedUser: getAuthenticatedUser(axios),
  getSystemInformation: getSystemInformation(axios),
})
