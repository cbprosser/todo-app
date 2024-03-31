import { API } from '../../../constants/constants';
import { StringUser, AuthenticationBody } from '../../../types/models';
import { api } from '../apiSlice';

const authEndpoints = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.query<StringUser, AuthenticationBody>({
      query: (data) => ({ url: API.ENDPOINTS.LOGIN, method: 'post', data }),
    }),
    logout: builder.mutation({
      query: () => ({ url: API.ENDPOINTS.LOGOUT, method: 'post' }),
      invalidatesTags: ['lists', 'list'],
    }),
    refresh: builder.query<StringUser, undefined>({
      query: () => ({ url: API.ENDPOINTS.REFRESH, method: 'post' }),
    }),
  }),
  overrideExisting: false,
});

export const { useLazyLoginQuery, useLazyRefreshQuery, useLogoutMutation } =
  authEndpoints;
