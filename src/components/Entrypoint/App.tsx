import { CssBaseline } from '@mui/material';
import { useEffect, useMemo } from 'react';
import { useAppSelector } from '../../redux/hooks';
import { ToDoLooAppBar } from '../ToDoLooAppBar/ToDoLooAppBar';
import { ToDoLooFooter } from '../ToDoLooFooter/ToDoLooFooter';
import { ToDoLooMain } from '../ToDoLooMain/ToDoLooMain';
import { COOKIES } from '../../constants/constants';
import { useLazyRefreshQuery } from '../../redux/slice/apiEndpoints/auth';

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
