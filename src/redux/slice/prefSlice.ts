import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState: {
  graphics: {
    mode?: string;
    theme?: string;
  };
} = {
  graphics: {
    mode: undefined,
    theme: undefined
  }
};

const prefSlice = createSlice({
  name: 'pref',
  initialState,
  reducers: {
    setTheme: (state, { payload }: PayloadAction<string>) => {
      state.graphics.theme = payload;
    },
    setMode: (state, { payload }: PayloadAction<string>) => {
      state.graphics.mode = payload;
    }
  }
});

export const { setTheme, setMode } = prefSlice.actions;

export const prefReducer = prefSlice.reducer;
