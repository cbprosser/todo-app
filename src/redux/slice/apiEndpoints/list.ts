import { DateTime } from 'luxon';
import { API } from '../../../constants/constants';
import { StringList, StringItem } from '../../../types/models';
import { api } from '../apiSlice';

const listEndpoints = api.injectEndpoints({
  endpoints: (builder) => ({
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
        url: API.ENDPOINTS.DELETE_ITEM_FROM_LIST(username, listId, listItemId),
        method: 'get',
      }),
      invalidatesTags: [
        { type: 'list', id: 'LIST' },
        { type: 'lists', id: 'LISTS' },
      ],
    }),
  }),
  overrideExisting: false,
});

export const {
  useLazyGetListQuery,
  useAddItemToListMutation,
  useUpdateItemInListMutation,
  useDeleteItemFromListMutation,
} = listEndpoints;
