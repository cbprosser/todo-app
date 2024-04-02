import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  TextField,
  TextFieldProps,
  Typography,
} from '@mui/material';
import { useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import * as uuid from 'uuid';
import { ForgotBody, RecoverBody } from '../../types/models';
import {
  useLazyForgotQuery,
  useLazyRecoverQuery,
} from '../../redux/slice/apiEndpoints/auth';

export const Forgot = () => {
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

  const [triggerForgot] = useLazyForgotQuery();
  const [triggerRecover] = useLazyRecoverQuery();

  const [state, setState] = useState<ForgotBody & RecoverBody>({
    email: '',
    password: '',
  });

  const handleChange: TextFieldProps['onChange'] = (event) => {
    const { value, id } = event.target;
    setState((s) => ({ ...s, [id]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (id === undefined) {
      await triggerForgot({ email: state.email });
    } else {
      const result = await triggerRecover({ id, password: state.password });
      if (!result.error) {
        navigate('/login');
      }
    }
  };

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
          Forgot Account
        </Typography>
        <Box
          component='form'
          noValidate
          onSubmit={handleSubmit}
          sx={{ mt: 3, minWidth: '100%' }}
        >
          <Grid container spacing={2}>
            {id !== undefined ? (
              <>
                <Grid item xs={12}>
                  <TextField
                    onChange={handleChange}
                    value={state.password}
                    required
                    fullWidth
                    id='password'
                    label='New Password'
                    name='password'
                    autoComplete='password'
                  />
                </Grid>
              </>
            ) : (
              <>
                <Grid item xs={12}>
                  <TextField
                    onChange={handleChange}
                    value={state.email}
                    required
                    fullWidth
                    id='email'
                    label='Email Address'
                    name='email'
                    autoComplete='email'
                  />
                </Grid>
              </>
            )}
          </Grid>
          <Button
            type='submit'
            fullWidth
            variant='contained'
            sx={{ mt: 3, mb: 2 }}
          >
            Submit {id ? 'Change' : 'Request'}
          </Button>
        </Box>
      </Box>
    </Container>
  );
};
