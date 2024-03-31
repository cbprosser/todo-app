import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '../axiosBaseQuery';

const apiVersion = 'v1';

export const api = createApi({
  baseQuery: axiosBaseQuery({
    baseUrl: `http://localhost:8080/${apiVersion}`,
  }),
  tagTypes: ['lists', 'list'],
  endpoints: () => ({}),
});

export const apiReducer = api.reducer;

export const apiPath = api.reducerPath;

export const apiMiddleware = api.middleware;

export const apiEndpoints = api.endpoints;
