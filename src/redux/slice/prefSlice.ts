import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { AppThemeId } from '../../themes/themes.types';

const initialState: {
  graphics: {
    mode: 'dark' | 'light';
    themeId: AppThemeId;
  };
} = {
  graphics: {
    mode: 'light',
    themeId: 'themeReallyRed',
  },
};

const prefSlice = createSlice({
  name: 'pref',
  initialState,
  reducers: {
    setTheme: (state, { payload }: PayloadAction<AppThemeId>) => {
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

export const { setTheme, setMode, setGraphics } = prefSlice.actions;

export const prefReducer = prefSlice.reducer;

export const prefPath = prefSlice.reducerPath;