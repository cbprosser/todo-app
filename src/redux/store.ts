import { configureStore } from '@reduxjs/toolkit';
import { prefReducer } from './slice/prefSlice';

export const store = configureStore({
  reducer: {
    pref: prefReducer
  }
});
