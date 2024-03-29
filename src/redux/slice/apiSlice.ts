import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '../axiosBaseQuery';
import { API } from '../../constants/constants';
import { DateTime } from 'luxon';

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

type StringList = {
  listId: string;
  title: string;
  created: string;
  count: number;
  description?: string;
};

const apiVersion = 'v1';

export const api = createApi({
  baseQuery: axiosBaseQuery({
    baseUrl: `http://localhost:8080/${apiVersion}`,
  }),
  tagTypes: ['lists'],
  endpoints: (builder) => {
    return {
      login: builder.query<StringUser, AuthenticationBody>({
        query: (data) => ({ url: API.ENDPOINTS.LOGIN, method: 'post', data }),
      }),
      refresh: builder.query<StringUser, undefined>({
        query: () => ({ url: API.ENDPOINTS.REFRESH, method: 'post' }),
      }),
      getLists: builder.query<StringList[], string>({
        query: (username) => ({
          url: API.ENDPOINTS.LISTS(username),
          method: 'get',
        }),
        providesTags: (res) => {
          return res
            ? [
                ...res.map(
                  ({ listId }) => ({ type: 'lists', id: listId }) as const
                ),
                { type: 'lists', id: 'LIST' },
              ]
            : [{ type: 'lists', id: 'LIST' }];
        },
        transformResponse: (res: StringList[]) =>
          res.map((list) => ({
            ...list,
            created: DateTime.fromISO(list.created).toLocaleString(),
          })),
      }),
      addList: builder.mutation<
        StringList,
        Partial<Omit<StringList, 'listId' | 'created'>> & { username: string }
      >({
        query: ({ username, ...data }) => ({
          url: API.ENDPOINTS.ADD_LIST(username),
          method: 'post',
          data,
        }),
        invalidatesTags: [{ type: 'lists', id: 'LIST' }],
      }),
      updateList: builder.mutation<
        StringList,
        Omit<StringList, 'created'> & { username: string }
      >({
        query: ({ username, ...data }) => ({
          url: API.ENDPOINTS.UPDATE_LIST(username),
          method: 'post',
          data,
        }),
        invalidatesTags: [{ type: 'lists', id: 'LIST' }],
      }),
      deleteList: builder.mutation<
        StringList,
        { listId: string; username: string }
      >({
        query: ({ username, listId }) => ({
          url: API.ENDPOINTS.DELETE_LIST(username, listId),
          method: 'get',
        }),
        invalidatesTags: [{ type: 'lists', id: 'LIST' }],
      }),
    };
  },
});

export const {
  useLazyLoginQuery,
  useLazyRefreshQuery,
  useLazyGetListsQuery,
  useAddListMutation,
  useUpdateListMutation,
  useDeleteListMutation,
} = api;

export const apiReducer = api.reducer;

export const apiPath = api.reducerPath;

export const apiMiddleware = api.middleware;

export const apiEndpoints = api.endpoints;
