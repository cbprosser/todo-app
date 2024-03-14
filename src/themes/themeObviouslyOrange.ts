import { ThemeOptions, createTheme } from '@mui/material';
import { blue, orange } from '@mui/material/colors';
import { AppTheme } from './themes.types';

const mainLightOptions: ThemeOptions = {
  palette: {
    mode: 'light',
    primary: {
      main: orange[900],
    },
    secondary: {
      main: blue[900],
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

export const __themeObviouslyOrange = {
  id: 'themeObviouslyOrange',
  name: 'Obviously Orange',
  themes: {
    dark: createTheme(mainDarkOptions),
    light: createTheme(mainLightOptions),
  },
} as const;

export const obviouslyOrange: AppTheme = __themeObviouslyOrange;