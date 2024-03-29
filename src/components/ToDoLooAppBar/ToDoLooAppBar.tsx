import MenuIcon from '@mui/icons-material/Menu';
import {
  AppBar,
  Box,
  Button,
  ButtonProps,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { AccountCircle } from '@mui/icons-material';
import { api, useLogoutMutation } from '../../redux/slice/apiSlice';

const drawerWidth = 240;
const navItems = ['Login'];

type State = { isMobileOpen: boolean; loginAnchor: null | HTMLElement };

const initialState: State = { isMobileOpen: false, loginAnchor: null };

export const ToDoLooAppBar = () => {
  const { username } = useAppSelector((s) => s.user);

  const [state, setState] = useState(initialState);

  const [logout] = useLogoutMutation();

  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const handleDrawerToggle = () =>
    setState((s) => ({ ...s, isMobileOpen: !s.isMobileOpen }));

  const handleLoginMenuOpen: ButtonProps['onClick'] = (event) =>
    setState((s) => ({ ...s, loginAnchor: event.currentTarget }));

  const hanleLoginMenuClose = () =>
    setState((s) => ({ ...s, loginAnchor: null }));

  const container = window.document.body;

  const handleLogout = async () => {
    await logout(undefined);
    dispatch(api.util.resetApiState());
    setState(initialState);
    navigate('/');
  };

  return (
    <Box component='header'>
      <AppBar position='static' enableColorOnDark>
        <Toolbar
          sx={{
            justifyContent: { xs: 'end' },
          }}
        >
          <Typography
            variant='h6'
            component='div'
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            ToDoLoos
          </Typography>
          <Box
            sx={{
              display: { xs: 'none', sm: 'block' },
            }}
          >
            {username ? (
              <Box>
                <IconButton onClick={handleLoginMenuOpen} color='inherit'>
                  <AccountCircle />
                </IconButton>
                <Menu
                  anchorEl={state.loginAnchor}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(state.loginAnchor)}
                  onClose={hanleLoginMenuClose}
                >
                  <MenuItem>Profile</MenuItem>
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
              </Box>
            ) : (
              navItems.map((item) => (
                <Button
                  key={item}
                  component={RouterLink}
                  to={`/${item}`.toLowerCase()}
                  color='inherit'
                >
                  {item}
                </Button>
              ))
            )}
          </Box>
          <IconButton
            size='large'
            edge='start'
            color='inherit'
            aria-label='menu'
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          anchor='right'
          container={container}
          variant='temporary'
          open={state.isMobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
        >
          <Box
            onClick={handleDrawerToggle}
            sx={{ textAlign: 'center', height: '100%' }}
          >
            <Typography variant='h6' sx={{ my: 2 }}>
              ToDoLoos
            </Typography>
            <Divider />
            <List>
              {username ? (
                <ListItem sx={{ textAlign: 'center' }}>
                  <ListItemText primary={username} />
                </ListItem>
              ) : (
                navItems.map((item) => (
                  <ListItem key={item} disablePadding>
                    <ListItemButton
                      component={RouterLink}
                      to={`/${item}`.toLowerCase()}
                      sx={{ textAlign: 'center' }}
                    >
                      <ListItemText primary={item} />
                    </ListItemButton>
                  </ListItem>
                ))
              )}
            </List>
          </Box>
        </Drawer>
      </nav>
    </Box>
  );
};
