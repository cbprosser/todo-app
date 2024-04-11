import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { AppThemeKey } from '../../themes/themes.types';
import { UserPrefs } from '../../types/models';

const initialState: UserPrefs = {
  graphics: {
    mode: 'light',
    themeId: 'themeReallyRed',
  },
};

const prefSlice = createSlice({
  name: 'pref',
  initialState,
  reducers: {
    setPrefs: (state, { payload }: PayloadAction<UserPrefs>) => {
      Object.keys(state).forEach((key) => {
        state[key as keyof typeof state] =
          payload[key as keyof UserPrefs] ?? state[key as keyof typeof state];
      });
    },
    setTheme: (state, { payload }: PayloadAction<AppThemeKey>) => {
      state.graphics.themeId = payload;
    },
    setMode: (state, { payload }: PayloadAction<'dark' | 'light'>) => {
      state.graphics.mode = payload;
    },
    setGraphics: (
      state,
      { payload }: PayloadAction<typeof initialState.graphics>
    ) => {
      state.graphics = payload;
    },
  },
});

export const { setPrefs, setTheme, setMode, setGraphics } = prefSlice.actions;

export const prefReducer = prefSlice.reducer;

export const prefPath = prefSlice.reducerPath;
