import MenuIcon from '@mui/icons-material/Menu';
import {
  AppBar,
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
} from '@mui/material';
import { useState } from 'react';

const drawerWidth = 240;
const navItems = ['Home', 'Login', 'About', 'Contact'];

export const ToDoLooAppBar = () => {
  const [state, setState] = useState({ isMobileOpen: false });

  const handleDrawerToggle = () =>
    setState((s) => ({ ...s, isMobileOpen: !s.isMobileOpen }));

  const container = window.document.body;

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
            {navItems.map((item) => (
              <Button key={item} color='inherit'>
                {item}
              </Button>
            ))}
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
              {navItems.map((item) => (
                <ListItem key={item} disablePadding>
                  <ListItemButton sx={{ textAlign: 'center' }}>
                    <ListItemText primary={item} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Box>
        </Drawer>
      </nav>
    </Box>
  );
};
