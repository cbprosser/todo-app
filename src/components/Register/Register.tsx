import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  Link,
  TextField,
  TextFieldProps,
  Typography,
} from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import * as uuid from 'uuid';
import {
  useLazyConfirmRegistrationQuery,
  useLazySignUpQuery,
} from '../../redux/slice/apiEndpoints/user';
import { SignupBody } from '../../types/models';

export const Register = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const id = useMemo(() => {
    const split = pathname.split('/');

    if (split.length === 3) {
      const id = split.pop();
      if (id) {
        try {
          uuid.parse(id);
          return id;
        } catch (error) {
          if (!(error instanceof TypeError)) {
            throw error;
          }
        }
      }
    }
    return undefined;
  }, [pathname]);

  const [triggerSignUp] = useLazySignUpQuery();
  const [triggerConfirmRegistration] = useLazyConfirmRegistrationQuery();

  const [state, setState] = useState<SignupBody>({
    email: '',
    username: '',
    password: '',
  });

  const handleChange: TextFieldProps['onChange'] = (event) => {
    const { value, id } = event.target;
    setState((s) => ({ ...s, [id]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const result = await triggerSignUp(state);
    if (!result.error) {
      navigate('/');
    }
  };

  useEffect(() => {
    const triggerConfirmRegistrationEffect = async () => {
      if (id) {
        const result = await triggerConfirmRegistration({ id });
        if (result.isSuccess) {
          navigate('/login');
        }
      }
    };

    triggerConfirmRegistrationEffect();
  }, [id]);

  return (
    <Container component='main' maxWidth='xs'>
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Sign up
        </Typography>
        <Box
          component='form'
          noValidate
          onSubmit={handleSubmit}
          sx={{ mt: 3, minWidth: '100%' }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                value={state.username}
                onChange={handleChange}
                required
                fullWidth
                id='username'
                label='Username'
                name='username'
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                value={state.email}
                onChange={handleChange}
                required
                fullWidth
                id='email'
                label='Email Address'
                name='email'
                autoComplete='email'
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                value={state.password}
                onChange={handleChange}
                required
                fullWidth
                name='password'
                label='Password'
                type='password'
                id='password'
                autoComplete='new-password'
              />
            </Grid>
          </Grid>
          <Button
            type='submit'
            fullWidth
            variant='contained'
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Grid container justifyContent='flex-end'>
            <Grid item>
              <Link component={RouterLink} to='/login' variant='body2'>
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};
