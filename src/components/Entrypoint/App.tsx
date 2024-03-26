import { CssBaseline } from '@mui/material';
import { useRefreshQuery } from '../../redux/slice/apiSlice';
import { ToDoLooAppBar } from '../ToDoLooAppBar/ToDoLooAppBar';
import { ToDoLooFooter } from '../ToDoLooFooter/ToDoLooFooter';
import { ToDoLooMain } from '../ToDoLooMain/ToDoLooMain';

export const App = () => {
  useRefreshQuery(undefined);

  return (
    <>
      <CssBaseline />
      <ToDoLooAppBar />
      <ToDoLooMain />
      <ToDoLooFooter />
    </>
  );
};
