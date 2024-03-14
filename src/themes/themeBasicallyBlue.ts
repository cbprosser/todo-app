import { ThemeOptions, createTheme } from '@mui/material';
import { blue, orange } from '@mui/material/colors';
import { AppTheme } from './themes.types';

const mainLightOptions: ThemeOptions = {
  palette: {
    mode: 'light',
    primary: {
      main: blue[900],
    },
    secondary: {
      main: orange[900],
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

export const __themeBasicallyBlue = {
  id: 'themeBasicallyBlue',
  name: 'Basically Blue',
  themes: {
    dark: createTheme(mainDarkOptions),
    light: createTheme(mainLightOptions),
  },
} as const;

export const basicallyBlue: AppTheme = __themeBasicallyBlue;
