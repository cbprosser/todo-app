import {
  Box,
  MenuItem,
  Select,
  SelectProps,
  Switch,
  Typography,
  darken,
  lighten,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useAppDispatch } from '../../redux/hooks';
import { setGraphics } from '../../redux/slice/prefSlice';
import { themesArray } from '../../themes/themes';
import { AppThemeId } from '../../themes/themes.types';

export const ToDoLooFooter = () => {
  const dispatch = useAppDispatch();
  const [state, setState] = useState<{ theme: AppThemeId; darkMode: boolean }>({
    theme: 'themeReallyRed',
    darkMode: true,
  });

  const handleThemeSelect: SelectProps['onChange'] = (event) => {
    const { value } = event.target;
    setState((s) => ({ ...s, theme: value as AppThemeId }));
  };

  const handleDarkModeToggle = () =>
    setState((s) => ({ ...s, darkMode: !s.darkMode }));

  useEffect(() => {
    dispatch(
      setGraphics({
        mode: state.darkMode ? 'dark' : 'light',
        themeId: state.theme,
      })
    );
  }, [state]);

  return (
    <Box
      component='footer'
      sx={(theme) => {
        const contrastFunc = theme.palette.mode === 'dark' ? lighten : darken;
        const backgroundColor = contrastFunc(
          theme.palette.background.paper,
          0.3
        );
        return {
          backgroundColor,
          color: theme.palette.getContrastText(backgroundColor),
        };
      }}
    >
      <Box
        sx={(theme) => ({
          px: theme.spacing(1),
          py: theme.spacing(2),
        })}
      >
        <Box sx={() => ({ display: 'flex', justifyContent: 'space-between' })}>
          <Box flexBasis='10%'>
            <Switch
              size='small'
              checked={state.darkMode}
              onChange={handleDarkModeToggle}
            />
          </Box>
          <Typography variant='body2'>© 2024 Chris Prosser</Typography>
          <Box sx={{ flexBasis: '10%', float: 'right' }}>
            <Select
              sx={{ float: 'right' }}
              size='small'
              variant='standard'
              value={state.theme}
              onChange={handleThemeSelect}
            >
              {themesArray.map((theme) => (
                <MenuItem key={theme.id} value={theme.id}>
                  {theme.name}
                </MenuItem>
              ))}
            </Select>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
