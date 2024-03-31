import { DateTime } from 'luxon';
import { API } from '../../../constants/constants';
import { StringList } from '../../../types/models';
import { api } from '../apiSlice';

const listsEndpoints = api.injectEndpoints({
  endpoints: (builder) => ({
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
  }),
  overrideExisting: false,
});

export const {
  useLazyGetListsQuery,
  useAddListMutation,
  useUpdateListMutation,
  useDeleteListMutation,
} = listsEndpoints;
