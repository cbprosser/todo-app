import { ThemeOptions, createTheme } from '@mui/material';
import { green, red } from '@mui/material/colors';

const mainLightOptions: ThemeOptions = {
  palette: {
    mode: 'light',
    primary: {
      main: red[900]
    },
    secondary: {
      main: green[900]
    }
  }
};

const mainDarkOptions: ThemeOptions = {
  ...mainLightOptions,
  palette: {
    ...mainLightOptions.palette,
    mode: 'dark'
  }
};

export const mainLight = createTheme(mainLightOptions);
export const mainDark = createTheme(mainDarkOptions);
