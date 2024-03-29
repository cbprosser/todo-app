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
  items?: StringItem[];
};

type StringItem = {
  listItemId: string;
  description: string;
  created: string;
};

const apiVersion = 'v1';

export const api = createApi({
  baseQuery: axiosBaseQuery({
    baseUrl: `http://localhost:8080/${apiVersion}`,
  }),
  tagTypes: ['lists', 'list'],
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
                { type: 'lists', id: 'LISTS' },
              ]
            : [{ type: 'lists', id: 'LISTS' }];
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
        invalidatesTags: [{ type: 'lists', id: 'LISTS' }],
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
        invalidatesTags: [{ type: 'lists', id: 'LISTS' }],
      }),
      deleteList: builder.mutation<
        StringList,
        { listId: string; username: string }
      >({
        query: ({ username, listId }) => ({
          url: API.ENDPOINTS.DELETE_LIST(username, listId),
          method: 'get',
        }),
        invalidatesTags: [{ type: 'lists', id: 'LISTS' }],
      }),
      getList: builder.query<StringList, { listId: string; username: string }>({
        query: ({ listId, username }) => ({
          url: API.ENDPOINTS.LIST(username, listId),
          method: 'get',
        }),
        providesTags: (res) => {
          return res
            ? [
                { type: 'list', id: res.listId } as const,
                { type: 'list', id: 'LIST' },
              ]
            : [{ type: 'list', id: 'LIST' }];
        },
        transformResponse: (res: StringList) => ({
          ...res,
          created: DateTime.fromISO(res.created).toLocaleString(),
          items:
            res.items !== null
              ? res.items?.map((item) => ({
                  ...item,
                  created: DateTime.fromISO(item.created).toLocaleString(),
                }))
              : [],
        }),
      }),
      addItemToList: builder.mutation<
        StringList,
        Partial<Omit<StringItem, 'listItemId' | 'created'>> & {
          username: string;
          listId: string;
        }
      >({
        query: ({ listId, username, ...data }) => ({
          url: API.ENDPOINTS.ADD_ITEM_TO_LIST(username, listId),
          method: 'post',
          data,
        }),
        invalidatesTags: [
          { type: 'list', id: 'LIST' },
          { type: 'lists', id: 'LISTS' },
        ],
      }),
      updateItemInList: builder.mutation<
        StringList,
        Partial<Omit<StringItem, 'created'>> & {
          username: string;
          listId: string;
        }
      >({
        query: ({ listId, username, ...data }) => ({
          url: API.ENDPOINTS.UPDATE_ITEM_IN_LIST(username, listId),
          method: 'post',
          data,
        }),
        invalidatesTags: [{ type: 'list', id: 'LIST' }],
      }),
      deleteItemFromList: builder.mutation<
        StringList,
        { listId: string; username: string; listItemId: string }
      >({
        query: ({ username, listId, listItemId }) => ({
          url: API.ENDPOINTS.DELETE_ITEM_FROM_LIST(
            username,
            listId,
            listItemId
          ),
          method: 'get',
        }),
        invalidatesTags: [
          { type: 'list', id: 'LIST' },
          { type: 'lists', id: 'LISTS' },
        ],
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
  useLazyGetListQuery,
  useAddItemToListMutation,
  useUpdateItemInListMutation,
  useDeleteItemFromListMutation,
} = api;

export const apiReducer = api.reducer;

export const apiPath = api.reducerPath;

export const apiMiddleware = api.middleware;

export const apiEndpoints = api.endpoints;
