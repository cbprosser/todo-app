import { configureStore } from '@reduxjs/toolkit';
import { prefReducer } from './slice/prefSlice';
import { apiMiddleware, apiPath, apiReducer } from './slice/apiSlice';

export const store = configureStore({
  reducer: {
    pref: prefReducer,
    [apiPath]: apiReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiMiddleware),
});
