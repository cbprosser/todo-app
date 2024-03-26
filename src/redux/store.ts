import { configureStore } from '@reduxjs/toolkit';
import { apiMiddleware, apiPath, apiReducer } from './slice/apiSlice';
import { prefPath, prefReducer } from './slice/prefSlice';
import { userPath, userReducer } from './slice/userSlice';

export const store = configureStore({
  reducer: {
    [userPath]: userReducer,
    [apiPath]: apiReducer,
    [prefPath]: prefReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiMiddleware),
});
