import { AccountCircle } from '@mui/icons-material';
import ViewListIcon from '@mui/icons-material/ViewList';
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
import { useMemo, useState } from 'react';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { useLogoutMutation } from '../../redux/slice/apiEndpoints/auth';
import { api } from '../../redux/slice/apiSlice';

const drawerWidth = 240;
const enhancedNavItems = [
  {
    route: 'register',
    display: 'Sign Up',
    routeBlacklist: ['login', 'register', 'forgot'],
  },
  {
    route: 'login',
    display: 'Log in',
    routeBlacklist: ['login', 'register', 'forgot'],
  },
];

type State = { isMobileOpen: boolean; loginAnchor: null | HTMLElement };

const initialState: State = { isMobileOpen: false, loginAnchor: null };

export const ToDoLooAppBar = () => {
  const { pathname } = useLocation();
  const navItems = useMemo(() => {
    return enhancedNavItems.filter(
      ({ routeBlacklist }) =>
        !routeBlacklist.some((route) => pathname.includes(route))
    );
  }, [pathname]);

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
          <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
            <Box
              component={RouterLink}
              to='/'
              sx={{
                color: 'inherit',
                display: 'flex',
                alignItems: 'center',
                textDecoration: 'inherit',
              }}
            >
              <Box
                sx={(theme) => ({
                  height: theme.spacing(3),
                  width: theme.spacing(3),
                  mr: 1,
                })}
              >
                <ViewListIcon />
              </Box>
              <Typography
                variant='h6'
                sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
              >
                ToDoLoos
              </Typography>
            </Box>
          </Box>
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
            ) : navItems.length ? (
              navItems.map(({ route, display }) => (
                <Button
                  key={route}
                  component={RouterLink}
                  to={`/${route}`.toLowerCase()}
                  color='inherit'
                >
                  {display}
                </Button>
              ))
            ) : (
              <></>
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
      {navItems.length ? (
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
                  navItems.map(({ display, route }) => (
                    <ListItem key={route} disablePadding>
                      <ListItemButton
                        component={RouterLink}
                        to={`/${route}`.toLowerCase()}
                        sx={{ textAlign: 'center' }}
                      >
                        <ListItemText primary={display} />
                      </ListItemButton>
                    </ListItem>
                  ))
                )}
              </List>
            </Box>
          </Drawer>
        </nav>
      ) : (
        <></>
      )}
    </Box>
  );
};
