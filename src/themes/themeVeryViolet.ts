import { ThemeOptions, createTheme } from '@mui/material';
import { lightGreen, purple } from '@mui/material/colors';
import { AppTheme } from './themes.types';

const mainLightOptions: ThemeOptions = {
  palette: {
    mode: 'light',
    primary: {
      main: purple[900],
    },
    secondary: {
      main: lightGreen[600],
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

export const __themeVeryViolet = {
  id: 'themeVeryViolet',
  name: 'Very Violet',
  themes: {
    dark: createTheme(mainDarkOptions),
    light: createTheme(mainLightOptions),
  },
} as const;

export const veryViolet: AppTheme = __themeVeryViolet;
