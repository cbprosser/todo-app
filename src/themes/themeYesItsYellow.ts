import { ThemeOptions, createTheme } from '@mui/material';
import { blue, yellow } from '@mui/material/colors';
import { AppTheme } from './themes.types';

const mainLightOptions: ThemeOptions = {
  palette: {
    mode: 'light',
    primary: {
      main: yellow[600],
    },
    secondary: {
      main: blue[800],
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

export const __themeYesItsYellow = {
  id: 'themeYesItsYellow',
  name: "Yes, It's Yellow",
  themes: {
    dark: createTheme(mainDarkOptions),
    light: createTheme(mainLightOptions),
  },
} as const;

export const yesItsYellow: AppTheme = __themeYesItsYellow;
