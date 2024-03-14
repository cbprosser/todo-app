import { ThemeOptions, createTheme } from '@mui/material';
import { green, purple } from '@mui/material/colors';
import { AppTheme } from './themes.types';


const mainLightOptions: ThemeOptions = {
  palette: {
    mode: 'light',
    primary: {
      main: green[900],
    },
    secondary: {
      main: purple[800],
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

export const __themeGenerallyGreen = {
  id: 'themeGenerallyGreen',
  name: 'Generally Green',
  themes: {
    dark: createTheme(mainDarkOptions),
    light: createTheme(mainLightOptions),
  },
} as const;

export const generallyGreen: AppTheme = __themeGenerallyGreen;