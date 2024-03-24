import { Box } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import { Forgot } from '../Forgot/Forgot';
import { Landing } from '../Landing/Landing';
import { Login } from '../Login/Login';
import { Register } from '../Register/Register';

export const ToDoLooMain = () => {
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
        <Route path='/' element={<Landing />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/forgot' element={<Forgot />} />
      </Routes>
    </Box>
  );
};
