import { ThemeProvider, useMediaQuery } from '@mui/material';
import { Provider } from 'react-redux';
import { store } from '../../redux/store';
import { themes } from '../../themes/themes';
import { App } from './App';

export const Providers = () => {
  const dark = useMediaQuery('(prefers-color-scheme: dark)');

  const theme = themes[dark ? 'mainDark' : 'mainLight'];

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </Provider>
  );
};
