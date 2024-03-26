import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '../axiosBaseQuery';

type AuthenticationBody = {
  username: string;
  password: string;
};

type StringUser = {
  userId: string;
  username: string;
  email: string;
  joined: string;
};

const apiVersion = 'v1';

export const api = createApi({
  baseQuery: axiosBaseQuery({
    baseUrl: `http://localhost:8080/${apiVersion}`,
  }),
  endpoints: (builder) => {
    return {
      login: builder.mutation<StringUser, AuthenticationBody>({
        query: (data) => ({ url: '/auth/login', method: 'post', data }),
      }),
      refresh: builder.query<StringUser, undefined>({
        query: () => ({ url: '/auth/refresh', method: 'post' }),
      }),
    };
  },
});

export const { useLoginMutation, useRefreshQuery } = api;

export const apiReducer = api.reducer;

export const apiPath = api.reducerPath;

export const apiMiddleware = api.middleware;

export const apiEndpoints = api.endpoints;
