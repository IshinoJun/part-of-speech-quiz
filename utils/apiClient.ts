import aspida from '@aspida/fetch';
import api from '../api/$api';

const fetchConfig = {
  headers: {
    'X-MICROCMS-API-KEY': process.env.MICROCMS_API_KEY as string,
  },
  baseURL: process.env.MICROCMS_BASE_URL,
};

export const apiClient = api(aspida(fetch, fetchConfig));
