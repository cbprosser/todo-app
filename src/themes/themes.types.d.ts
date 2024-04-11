import { Theme } from '@mui/material';
import { __themes } from './themes';

type __AppThemeKeys = keyof typeof __themes;

type Replace<T extends string> = T extends `__${infer R}` ? R : never;

type AppThemeKey = Replace<__AppThemeKeys>;

type AppThemeGeneric<T, U> = {
  id: U;
  name: T;
  themes: {
    dark: Theme;
    light: Theme;
  };
};

const extractNames = (<T, U>(p: readonly AppThemeGeneric<T, U>[]) => p)(
  Object.values(__themes) as const
);

export type AppThemeName = (typeof extractNames)[number]['name'];

export type AppTheme = AppThemeGeneric<AppThemeName, AppThemeKey>;
