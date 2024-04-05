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
import isEqual from 'lodash/isEqual';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import {
  useLazyGetUserPrefsQuery,
  useSaveUserPrefsMutation,
} from '../../redux/slice/apiEndpoints/user';
import { setGraphics, setPrefs } from '../../redux/slice/prefSlice';
import { themesArray } from '../../themes/themes';
import { AppThemeId } from '../../themes/themes.types';
import { UserPrefs } from '../../types/models';

const initialState: UserPrefs['graphics'] = {
  themeId: 'themeReallyRed',
  mode: 'dark',
};
export const ToDoLooFooter = () => {
  const { username } = useAppSelector((s) => s.user);

  const dispatch = useAppDispatch();
  const [state, setState] = useState(initialState);

  const handleThemeSelect: SelectProps['onChange'] = (event) => {
    const { value } = event.target;
    setState((s) => ({ ...s, themeId: value as AppThemeId }));
  };

  const handleDarkModeToggle = () =>
    setState((s) => ({ ...s, mode: s.mode === 'dark' ? 'light' : 'dark' }));

  const [triggerGetUserPrefs, { isUninitialized, data: prefs }] =
    useLazyGetUserPrefsQuery();
  const [triggerSaveUserPrefs] = useSaveUserPrefsMutation();

  useEffect(() => {
    if (!username && !isEqual(initialState, state)) {
      setState(initialState);
      dispatch(setGraphics(initialState));
    }
    if (!username) {
      return;
    }
    if (isUninitialized && username) {
      const asyncTriggerGetPrefs = async () => {
        const resp = (await triggerGetUserPrefs({ username })).data;
        if (resp) {
          setState(resp.graphics);
          dispatch(setPrefs(resp));
          return;
        }

        triggerSaveUserPrefs({ username, graphics: state });
      };
      asyncTriggerGetPrefs();
      return;
    }
    if (username && prefs && !isEqual(prefs.graphics, state)) {
      triggerSaveUserPrefs({ username, graphics: state });
    }
  }, [isUninitialized, username, state, prefs]);

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
              checked={state.mode === 'dark'}
              onChange={handleDarkModeToggle}
            />
          </Box>
          <Typography variant='body2'>© 2024 Chris Prosser</Typography>
          <Box sx={{ flexBasis: '10%', float: 'right' }}>
            <Select
              sx={{ float: 'right' }}
              size='small'
              variant='standard'
              value={state.themeId}
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
