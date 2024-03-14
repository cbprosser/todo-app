import { ThemeOptions, createTheme } from '@mui/material';
import { green, red } from '@mui/material/colors';
import { AppTheme } from './themes.types';

const mainLightOptions: ThemeOptions = {
  palette: {
    mode: 'light',
    primary: {
      main: red[900],
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

export const __themeReallyRed = {
  id: 'themeReallyRed',
  name: 'Really Red',
  themes: {
    dark: createTheme(mainDarkOptions),
    light: createTheme(mainLightOptions),
  },
} as const;

export const themeReallyRed: AppTheme = __themeReallyRed;