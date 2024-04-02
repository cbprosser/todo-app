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
    {
      data: any;
      status: number;
    }
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
    } catch (err) {
      let errorData: any = 'Unknown Error';
      let status = 500;
      if (err instanceof AxiosError) {
        status = err.response?.status ?? status;
        errorData = err.response?.data ?? errorData;
        console.log("🚀 ~ err.response?.data:", err.response?.data)

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
            return { data: result?.data };
          } catch (error) {}
        }
      }
      return {
        error: {
          data: errorData,
          status,
        },
      };
    }
    return { data: result?.data };
  };
