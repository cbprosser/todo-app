import { API } from '../../../constants/constants';
import {
  AuthenticationBody,
  ForgotBody,
  RecoverBody,
  StringUser,
} from '../../../types/models';
import { api } from '../apiSlice';
import { pushNotification, shiftNotification } from '../notificationSlice';

export const authEndpoints = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<StringUser, AuthenticationBody>({
      query: (data) => ({ url: API.ENDPOINTS.LOGIN, method: 'post', data }),
      invalidatesTags: ['pref'],
      onQueryStarted: async (_, { dispatch, queryFulfilled, requestId }) => {
        dispatch(
          pushNotification({
            key: `${requestId}-begin`,
            level: 'info',
            message: 'Sending request to log in.',
          })
        );
        try {
          await queryFulfilled;

          dispatch(shiftNotification());
          dispatch(
            pushNotification({
              key: `${requestId}-success`,
              level: 'success',
              message:
                'Successfully logged in.',
            })
          );
        } catch (thrownError) {
          if (
            typeof thrownError === 'object' &&
            thrownError !== null &&
            Object.hasOwn(thrownError, 'error')
          ) {
            const { error } = thrownError as {
              error: { data: any; status: number };
            };
            let message = error.data ?? undefined;
            if (typeof error.data === 'object' && error.data !== null) {
              message = error.data.message;
            }
            dispatch(shiftNotification());
            dispatch(
              pushNotification({
                key: `${requestId}-error`,
                level: 'error',
                variant: 'filled',
                title: 'Failure',
                message: message,
              })
            );
          }
        }
      },
    }),
    logout: builder.mutation({
      query: () => ({ url: API.ENDPOINTS.LOGOUT, method: 'post' }),
      onQueryStarted: () => {
        api.util.resetApiState();
      },
    }),
    refresh: builder.mutation<StringUser, undefined>({
      query: () => ({ url: API.ENDPOINTS.REFRESH, method: 'post' }),
      invalidatesTags: ['pref'],
    }),
    forgot: builder.query<void, ForgotBody>({
      query: (data) => ({ url: API.ENDPOINTS.FORGOT, method: 'post', data }),
      onQueryStarted: async (_, { dispatch, queryFulfilled, requestId }) => {
        dispatch(
          pushNotification({
            key: `${requestId}-begin`,
            level: 'info',
            message: 'Sending request to change password.',
          })
        );
        try {
          await queryFulfilled;

          dispatch(shiftNotification());
          dispatch(
            pushNotification({
              key: `${requestId}-success`,
              level: 'success',
              message:
                'Request sent. If an account is associated with that email address, it will receive an email shortly containing a recovery link.',
            })
          );
        } catch (thrownError) {
          if (
            typeof thrownError === 'object' &&
            thrownError !== null &&
            Object.hasOwn(thrownError, 'error')
          ) {
            const { error } = thrownError as {
              error: { data: any; status: number };
            };
            let message = error.data ?? undefined;
            if (typeof error.data === 'object' && error.data !== null) {
              message = error.data.message;
            }
            dispatch(shiftNotification());
            dispatch(
              pushNotification({
                key: `${requestId}-error`,
                level: 'error',
                variant: 'filled',
                title: 'Failure',
                message: message,
              })
            );
          }
        }
      },
    }),
    recover: builder.query<void, RecoverBody & { id: string }>({
      query: ({ id, ...data }) => ({
        url: API.ENDPOINTS.RECOVER(id),
        method: 'post',
        data,
      }),
      onQueryStarted: async (_, { dispatch, queryFulfilled, requestId }) => {
        dispatch(
          pushNotification({
            key: `${requestId}-begin`,
            level: 'info',
            message: 'Sending request to change password, please wait.',
          })
        );
        try {
          await queryFulfilled;

          dispatch(shiftNotification());
          dispatch(
            pushNotification({
              key: `${requestId}-success`,
              level: 'success',
              message: 'Password changed successfully, you may now log in.',
              duration: 5000,
            })
          );
        } catch (thrownError) {
          if (
            typeof thrownError === 'object' &&
            thrownError !== null &&
            Object.hasOwn(thrownError, 'error')
          ) {
            const { error } = thrownError as {
              error: { data: any; status: number };
            };
            let message = error.data ?? undefined;
            if (typeof error.data === 'object' && error.data !== null) {
              message = error.data.message;
            }
            dispatch(shiftNotification());
            dispatch(
              pushNotification({
                key: `${requestId}-error`,
                level: 'error',
                variant: 'filled',
                title: 'Failure',
                message: message,
              })
            );
          }
        }
      },
    }),
  }),
  overrideExisting: false,
});

export const {
  useLoginMutation,
  useRefreshMutation,
  useLogoutMutation,
  useLazyForgotQuery,
  useLazyRecoverQuery,
} = authEndpoints;
