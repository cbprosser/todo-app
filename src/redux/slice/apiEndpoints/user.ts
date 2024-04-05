import { API } from '../../../constants/constants';
import { SignupBody, StringUser, UserPrefs } from '../../../types/models';
import { api } from '../apiSlice';
import { pushNotification, shiftNotification } from '../notificationSlice';
import { setPrefs } from '../prefSlice';

export const userEndpoints = api.injectEndpoints({
  endpoints: (builder) => ({
    signUp: builder.query<StringUser, SignupBody>({
      query: (data) => ({ url: API.ENDPOINTS.SIGNUP, method: 'post', data }),
      onQueryStarted: async (
        { username },
        { dispatch, queryFulfilled, requestId }
      ) => {
        dispatch(
          pushNotification({
            key: `${requestId}-begin`,
            level: 'info',
            message: `Registering User ${username}`,
          })
        );
        try {
          await queryFulfilled;

          dispatch(shiftNotification());
          dispatch(
            pushNotification({
              key: `${requestId}-success`,
              level: 'success',
              message: `User ${username} registered. Please confirm your email before signing in.`,
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
    confirmRegistration: builder.query<void, { id: string }>({
      query: ({ id }) => ({
        url: API.ENDPOINTS.CONFIRM_REGISTRATION(id),
        method: 'get',
      }),
    }),
    getUserPrefs: builder.query<UserPrefs, { username: string }>({
      query: ({ username }) => ({
        url: API.ENDPOINTS.USER_PREFS(username),
        method: 'get',
      }),
      providesTags: ['pref'],
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        const newPrefs = (await queryFulfilled).data;
        dispatch(setPrefs(newPrefs));
      },
    }),
    saveUserPrefs: builder.mutation<void, UserPrefs & { username: string }>({
      query: ({ username, ...data }) => ({
        url: API.ENDPOINTS.USER_PREFS(username),
        method: 'post',
        data,
      }),
      invalidatesTags: ['pref'],
    }),
  }),
  overrideExisting: false,
});

export const {
  useLazySignUpQuery,
  useLazyConfirmRegistrationQuery,
  useLazyGetUserPrefsQuery,
  useSaveUserPrefsMutation,
} = userEndpoints;
