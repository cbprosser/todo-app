import { createSlice } from '@reduxjs/toolkit';
import { authEndpoints } from './apiEndpoints/auth';

type StringUser = {
  userId: string;
  username: string;
  email: string;
  joined: string;
};

const initialState: Partial<StringUser> = {};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(authEndpoints.endpoints.login.matchFulfilled, (state, { payload }) => {
        Object.keys(payload).forEach((key) => {
          state[key as keyof typeof state] = payload[key as keyof StringUser];
        });
      })
      .addMatcher(authEndpoints.endpoints.refresh.matchFulfilled, (state, { payload }) => {
        Object.keys(payload).forEach((key) => {
          state[key as keyof typeof state] = payload[key as keyof StringUser];
        });
      })
      .addMatcher(authEndpoints.endpoints.logout.matchFulfilled, (state) => {
        Object.keys(state).forEach((key) => {
          delete state[key as keyof typeof state];
        });
      });
  },
});

export const {} = userSlice.actions;

export const userReducer = userSlice.reducer;

export const userPath = userSlice.reducerPath;
