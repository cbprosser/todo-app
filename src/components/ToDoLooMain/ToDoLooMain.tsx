import { Backdrop, Box, CircularProgress, Typography } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import { Forgot } from '../Forgot/Forgot';
import { Landing } from '../Landing/Landing';
import { Login } from '../Login/Login';
import { Register } from '../Register/Register';
import { useAppSelector } from '../../redux/hooks';
import { Lists } from '../Lists/Lists';
import { List } from '../List/List';

export const ToDoLooMain = () => {
  const { username } = useAppSelector((s) => s.user);
  const isAnyApiLoading = useAppSelector(
    (s) =>
      Object.values(s.api.queries).some((q) => q?.status === 'pending') ||
      Object.values(s.api.mutations).some((m) => m?.status === 'pending')
  );
  return (
    <Box
      component='main'
      sx={{
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        height: 'fit-content',
      }}
    >
      <Routes>
        <Route path='/' element={username ? <Lists /> : <Landing />} />
        <Route path='/lists' element={<Lists />} />
        <Route path='/lists/:listId' element={<List />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/forgot' element={<Forgot />} />
      </Routes>
      <Backdrop
        open={isAnyApiLoading}
        transitionDuration={{ enter: 0, exit: 195 }}
        mountOnEnter
        sx={{
          color: '#fff',
          backgroundColor: '#000',
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <Box textAlign='center'>
          <CircularProgress color='inherit' />
          <Typography>Loading, please wait...</Typography>
        </Box>
      </Backdrop>
    </Box>
  );
};
