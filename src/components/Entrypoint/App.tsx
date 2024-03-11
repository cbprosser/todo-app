import { CssBaseline } from '@mui/material';
import { ToDoLooAppBar } from '../ToDoLooAppBar/ToDoLooAppBar';
import { ToDoLooFooter } from '../ToDoLooFooter/ToDoLooFooter';
import { ToDoLooMain } from '../ToDoLooMain/ToDoLooMain';

export const App = () => {
  return (
    <>
      <CssBaseline />
      <ToDoLooAppBar />
      <ToDoLooMain />
      <ToDoLooFooter />
    </>
  );
};
