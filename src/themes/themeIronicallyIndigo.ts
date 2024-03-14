import { ThemeOptions, createTheme } from '@mui/material';
import { indigo, orange } from '@mui/material/colors';
import { AppTheme } from './themes.types';

const mainLightOptions: ThemeOptions = {
  palette: {
    mode: 'light',
    primary: {
      main: indigo[600],
    },
    secondary: {
      main: orange[700],
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

export const __themeIronicallyIndigo = {
  id: 'themeIronicallyIndigo',
  name: 'Ironically Indigo',
  themes: {
    dark: createTheme(mainDarkOptions),
    light: createTheme(mainLightOptions),
  },
} as const;

export const ironicallyIndigo: AppTheme = __themeIronicallyIndigo;
