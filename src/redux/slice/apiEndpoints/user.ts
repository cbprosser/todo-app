import { API } from '../../../constants/constants';
import { SignupBody, StringUser } from '../../../types/models';
import { api } from '../apiSlice';

const userEndpoints = api.injectEndpoints({
  endpoints: (builder) => ({
    signUp: builder.query<StringUser, SignupBody>({
      query: (data) => ({ url: API.ENDPOINTS.SIGNUP, method: 'post', data }),
    }),
  }),
  overrideExisting: false,
});

export const { useLazySignUpQuery } = userEndpoints;
