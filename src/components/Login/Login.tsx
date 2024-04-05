import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  Grid,
  Link,
  TextField,
  TextFieldProps,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../../redux/slice/apiEndpoints/auth';

export const Login = () => {
  const [triggerLogin, { isLoading, isSuccess }] = useLoginMutation();

  const navigate = useNavigate();

  const [auth, setAuth] = useState<Parameters<typeof triggerLogin>['0']>({
    username: '',
    password: '',
  });

  const handleChange: TextFieldProps['onChange'] = (event) => {
    const { value, id } = event.target;
    setAuth((s) => ({ ...s, [id]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await triggerLogin(auth);
    } catch (error) {}
  };

  useEffect(() => {
    isSuccess && navigate('/');
  }, [isSuccess]);

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
          Sign in
        </Typography>
        <Box
          component='form'
          onSubmit={handleSubmit}
          noValidate
          sx={{ mt: 1, minWidth: '100%' }}
        >
          <TextField
            onChange={handleChange}
            value={auth.username}
            margin='normal'
            required
            fullWidth
            id='username'
            label='Username'
            name='username'
            autoComplete='username'
            autoFocus
          />
          <TextField
            onChange={handleChange}
            value={auth.password}
            margin='normal'
            required
            fullWidth
            name='password'
            label='Password'
            type='password'
            id='password'
            autoComplete='current-password'
          />
          <FormControlLabel
            control={<Checkbox value='remember' color='primary' />}
            label='Remember me'
          />
          <Button
            type='submit'
            fullWidth
            variant='contained'
            disabled={isLoading}
            sx={{ mt: 3, mb: 2 }}
          >
            {isLoading ? 'Loading...' : 'Sign In'}
          </Button>
          <Grid container columns={{ xs: 4 }}>
            <Grid item xs>
              <Link component={RouterLink} to='/forgot' variant='body2'>
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link component={RouterLink} to='/register' variant='body2'>
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};
