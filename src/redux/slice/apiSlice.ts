import { createApi } from '@reduxjs/toolkit/query/react';
import { environment } from '../../environment';
import { axiosBaseQuery } from '../axiosBaseQuery';

const apiVersion = 'v1';

export const api = createApi({
  baseQuery: axiosBaseQuery({
    baseUrl: `${environment.api.getFullHostUrl()}/${apiVersion}`,
  }),
  tagTypes: ['lists', 'list', 'pref'],
  endpoints: () => ({}),
});

export const apiReducer = api.reducer;

export const apiPath = api.reducerPath;

export const apiMiddleware = api.middleware;
