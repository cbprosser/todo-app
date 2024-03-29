import { CssBaseline } from '@mui/material';
import { useEffect, useMemo } from 'react';
import { useAppSelector } from '../../redux/hooks';
import { useLazyRefreshQuery } from '../../redux/slice/apiSlice';
import { ToDoLooAppBar } from '../ToDoLooAppBar/ToDoLooAppBar';
import { ToDoLooFooter } from '../ToDoLooFooter/ToDoLooFooter';
import { ToDoLooMain } from '../ToDoLooMain/ToDoLooMain';
import { COOKIES } from '../../constants/constants';

export const App = () => {
  const hasfgptCookie = useMemo(
    () => document.cookie.includes(COOKIES.FGPT),
    []
  );
  const { username } = useAppSelector((s) => s.user);
  const [triggerRefresh] = useLazyRefreshQuery();

  useEffect(() => {
    if (!username && hasfgptCookie) {
      triggerRefresh(undefined);
    }
  }, [hasfgptCookie, username, triggerRefresh]);

  return (
    <>
      <CssBaseline />
      <ToDoLooAppBar />
      <ToDoLooMain />
      <ToDoLooFooter />
    </>
  );
};
