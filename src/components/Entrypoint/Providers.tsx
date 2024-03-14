import { ThemeProvider, useMediaQuery } from '@mui/material';
import { useEffect, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { themesObject } from '../../themes/themes';
import { App } from './App';
import { setMode } from '../../redux/slice/prefSlice';

export const Providers = () => {
  const prefersDark = useMediaQuery('(prefers-color-scheme: dark)');
  const graphics = useAppSelector((s) => s.pref.graphics);
  const { mode, themeId } = graphics;
  const dispatch = useAppDispatch();

  const theme = useMemo(() => themesObject[themeId].themes[mode], [graphics]);

  useEffect(() => {
    if (prefersDark && mode === 'light') {
      console.log("🚀 ~ useEffect ~ 'dark':", 'dark');
      dispatch(setMode('dark'));
    }
  }, [prefersDark]);

  return (
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  );
};
