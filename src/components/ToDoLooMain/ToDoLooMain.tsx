import {
  Box,
  Button,
  Container,
  Paper,
  Skeleton,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useMemo } from 'react';

export const ToDoLooMain = () => {
  const theme = useTheme();
  const md = 'md';
  const heroRightBorderRadius = useMemo(
    () => theme.shape.borderRadius * 4,
    [theme]
  );
  const isSmUp = useMediaQuery(theme.breakpoints.up(md));
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
      <Box
        sx={() => ({
          minHeight: '60vh',
          display: 'flex',
          flexWrap: 'nowrap',
        })}
      >
        <Box
          sx={(theme) => ({
            [theme.breakpoints.up(md)]: {
              flexBasis: '50%',
              flexDirection: 'row-reverse',
            },
            [theme.breakpoints.down(md)]: {
              justifyContent: 'center',
              textAlign: 'center',
            },
            flexGrow: 1,
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            px: theme.spacing(1),
          })}
        >
          <Box
            sx={(theme) => ({
              [theme.breakpoints.up(md)]: {
                maxWidth: 300,
              },
              maxWidth: 500,
            })}
          >
            <Typography variant='h4' fontWeight={700}>
              <Box
                component='span'
                color={(theme) => theme.palette.primary.main}
              >
                Lorem ipsum
              </Box>
              <br />
              dolor sit amet adipisicing elit
            </Typography>
            <Box component='p'>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsam id
              at esse labore dolorem, quisquam error, sequi eaque similique
              accusamus repudiandae possimus ut voluptatibus perferendis
              nesciunt tempore repellat cupiditate dolores.
            </Box>
            <Button
              variant='contained'
              sx={(theme) => ({
                [theme.breakpoints.down(md)]: {
                  minWidth: '100%',
                },
              })}
            >
              Get Started
            </Button>
          </Box>
        </Box>
        {isSmUp && (
          <Paper
            variant='outlined'
            square={false}
            sx={() => ({
              flexGrow: 1,
              height: '100%',
              flexBasis: '50%',
              borderRadius: `0 0 0 ${heroRightBorderRadius}px`,
              borderRightWidth: 0,
              borderTopWidth: 0,
              overflow: 'hidden',
            })}
          >
            <Skeleton
              sx={() => ({
                height: '100%',
                width: 600,
                transform: 'scale(1, 1)',
                borderRadius: 0,
              })}
              animation={false}
            />
          </Paper>
        )}
      </Box>
      <Container fixed sx={{ flexGrow: 1 }}>
        <Box
          sx={(theme) => ({
            height: '100%',
            px: theme.spacing(1),
            py: theme.spacing(2),
          })}
        >
          Some pretty amazing content will go here!
        </Box>
      </Container>
    </Box>
  );
};
