import MenuIcon from '@mui/icons-material/Menu';
import {
  AppBar,
  Box,
  Button,
  Container,
  CssBaseline,
  IconButton,
  Toolbar,
  Typography,
  lighten,
} from '@mui/material';

export const App = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: 1,
        minHeight: '100vh',
      }}
    >
      <CssBaseline />
      <header>
        <AppBar position='static' enableColorOnDark>
          <Toolbar>
            <IconButton
              size='large'
              edge='start'
              color='inherit'
              aria-label='menu'
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
              ToDoLoos
            </Typography>
            <Button color='inherit'>Login</Button>
          </Toolbar>
        </AppBar>
      </header>
      <main
        style={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          height: 'fit-content',
        }}
      >
        <Box
          sx={(theme) => ({
            bgcolor: lighten(theme.palette.background.paper, 0.1),
            minHeight: '60vh',
            display: 'flex',
          })}
        >
          <Box
            sx={(theme) => ({
              bgcolor: lighten(theme.palette.background.paper, 0.2),
              flexGrow: 1,
              height: '100%',
            })}
          >
            hero left
          </Box>
          <Box
            sx={(theme) => ({
              bgcolor: lighten(theme.palette.background.paper, 0.5),
              flexGrow: 1,
              height: '100%',
            })}
          >
            hero right
          </Box>
        </Box>
        <Container fixed sx={{ flexGrow: 1 }}>
          <Box
            sx={(theme) => ({
              bgcolor: lighten(theme.palette.background.paper, 0.15),
              height: '100%',
              px: theme.spacing(1),
              py: theme.spacing(2),
            })}
          >
            Some pretty amazing content will go here!
            {/* <Box sx={{ height: '300vh' }} /> */}
          </Box>
        </Container>
      </main>
      <footer>
        <Box
          sx={(theme) => ({
            bgcolor: lighten(theme.palette.background.paper, 0.05),
            px: theme.spacing(1),
            py: theme.spacing(2),
          })}
        >
          footer
        </Box>
      </footer>
    </div>
  );
};
