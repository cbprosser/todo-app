import { configureStore } from '@reduxjs/toolkit';
import { apiMiddleware, apiPath, apiReducer } from './slice/apiSlice';
import { prefPath, prefReducer } from './slice/prefSlice';
import { userPath, userReducer } from './slice/userSlice';
import {
  notificationPath,
  notificationReducer,
} from './slice/notificationSlice';

export const store = configureStore({
  reducer: {
    [notificationPath]: notificationReducer,
    [userPath]: userReducer,
    [prefPath]: prefReducer,
    [apiPath]: apiReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiMiddleware),
});
