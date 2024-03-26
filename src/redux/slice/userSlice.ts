import { createSlice } from '@reduxjs/toolkit';
import { apiEndpoints } from './apiSlice';

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
      .addMatcher(apiEndpoints.login.matchFulfilled, (state, { payload }) => {
        Object.keys(payload).forEach((key) => {
          state[key as keyof typeof state] = payload[key as keyof StringUser];
        });
      })
      .addMatcher(apiEndpoints.refresh.matchFulfilled, (state, { payload }) => {
        Object.keys(payload).forEach((key) => {
          state[key as keyof typeof state] = payload[key as keyof StringUser];
        });
      });
  },
});

export const {} = userSlice.actions;

export const userReducer = userSlice.reducer;

export const userPath = userSlice.reducerPath;
