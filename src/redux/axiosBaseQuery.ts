import type { BaseQueryFn } from '@reduxjs/toolkit/query';
import axios, {
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse,
  Method,
} from 'axios';
import { API } from '../constants/constants';

export const axiosBaseQuery =
  (
    { baseUrl }: { baseUrl: string } = { baseUrl: '' }
  ): BaseQueryFn<
    {
      url: string;
      method?: Method;
      data?: AxiosRequestConfig['data'];
      params?: AxiosRequestConfig['params'];
      headers?: AxiosRequestConfig['headers'];
    },
    unknown,
    unknown
  > =>
  async ({ url, method, data, params, headers }) => {
    let result: AxiosResponse<any, any> | undefined;
    try {
      result = await axios({
        url: baseUrl + url,
        method,
        data,
        params,
        headers,
        withCredentials: true,
      });
      console.log('🚀 ~ result:', result);
    } catch (err) {
      let message = 'Unknown Error';
      let status = 500;
      if (err instanceof AxiosError) {
        status = err.response?.status ?? status;
        data = err.response?.data ?? message;

        if (status === 401) {
          try {
            await axios({
              url: baseUrl + API.ENDPOINTS.REFRESH,
              method: 'post',
              headers,
              withCredentials: true,
            });

            result = await axios({
              url: baseUrl + url,
              method,
              data,
              params,
              headers,
              withCredentials: true,
            });
          } catch (error) {}
          return { data: result?.data };
        }
      }
      if (err instanceof Error) {
        message = err.message;
      }
      return {
        error: {
          status,
          data: message,
        },
      };
    }
    return { data: result?.data };
  };
