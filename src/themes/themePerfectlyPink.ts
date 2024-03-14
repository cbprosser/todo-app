import { ThemeOptions, createTheme } from '@mui/material';
import { green, pink } from '@mui/material/colors';
import { AppTheme } from './themes.types';

const mainLightOptions: ThemeOptions = {
  palette: {
    mode: 'light',
    primary: {
      main: pink[900],
    },
    secondary: {
      main: green[900],
    },
  },
};

const mainDarkOptions: ThemeOptions = {
  ...mainLightOptions,
  palette: {
    ...mainLightOptions.palette,
    mode: 'dark',
  },
};

export const __themePerfectlyPink = {
  id: 'themePerfectlyPink',
  name: 'Perfectly Pink',
  themes: {
    dark: createTheme(mainDarkOptions),
    light: createTheme(mainLightOptions),
  },
} as const;

export const perfectlyPink: AppTheme = __themePerfectlyPink;