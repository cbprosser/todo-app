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
  createDate: String;
};

const apiVersion = 'v1';

const api = createApi({
  baseQuery: axiosBaseQuery({
    baseUrl: `http://localhost:8080/${apiVersion}`,
  }),
  endpoints(build) {
    return {
      login: build.mutation<StringUser, AuthenticationBody>({
        query: (data) => ({ url: '/auth/login', method: 'post', data }),
      }),
    };
  },
});

export const { useLoginMutation } = api;

export const apiReducer = api.reducer;

export const apiPath = api.reducerPath;

export const apiMiddleware = api.middleware;
