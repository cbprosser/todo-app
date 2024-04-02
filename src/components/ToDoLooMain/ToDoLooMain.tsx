import {
  Alert,
  Backdrop,
  Box,
  CircularProgress,
  Snackbar,
  SnackbarProps,
  Typography,
} from '@mui/material';
import { useMemo } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import {
  shiftNotification,
  setNotificationVisible,
} from '../../redux/slice/notificationSlice';
import { Forgot } from '../Forgot/Forgot';
import { Landing } from '../Landing/Landing';
import { List } from '../List/List';
import { Lists } from '../Lists/Lists';
import { Login } from '../Login/Login';
import { Register } from '../Register/Register';

export const ToDoLooMain = () => {
  const dispatch = useAppDispatch();

  const { username } = useAppSelector((s) => s.user);
  const { visible: notificationVisible, queue } = useAppSelector(
    (s) => s.notif
  );

  const queueFirst = useMemo(() => queue?.[0] ?? {}, [queue]);

  const isAnyApiLoading = useAppSelector(
    (s) =>
      Object.values(s.api.queries).some((q) => q?.status === 'pending') ||
      Object.values(s.api.mutations).some((m) => m?.status === 'pending')
  );

  const handleClose: SnackbarProps['onClose'] = (_, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    dispatch(setNotificationVisible(false));
  };

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
      <Snackbar
        key={queueFirst.key}
        open={notificationVisible}
        autoHideDuration={queueFirst.duration}
        onClose={handleClose}
        TransitionProps={{ onExited: () => dispatch(shiftNotification()) }}
        sx={(theme) => ({
          [theme.breakpoints.up('sm')]: {
            top: theme.spacing(10),
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            transform: 'translateX(-50%)',
          },
        })}
      >
        <Alert
          title={queueFirst.title}
          variant={queueFirst.variant}
          severity={queueFirst.level}
        >
          {queueFirst.message}
        </Alert>
      </Snackbar>
      <Routes>
        <Route path='/' element={username ? <Lists /> : <Landing />} />
        <Route path='/lists' element={<Lists />} />
        <Route path='/lists/:listId' element={<List />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register/*' element={<Register />} />
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
