import { Delete, Edit } from '@mui/icons-material';
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActionAreaProps,
  CardActions,
  CardContent,
  CardHeader,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  InputProps,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../redux/hooks';
import {
  useAddListMutation,
  useDeleteListMutation,
  useLazyGetListsQuery,
  useUpdateListMutation,
} from '../../redux/slice/apiEndpoints/lists';

enum DIALOG_TYPE {
  ADD,
  UPDATE,
  DELETE,
}

type State = {
  listId: string;
  title: string;
  description: string;
  count: number;
  dialogOpen: boolean;
  type?: DIALOG_TYPE;
};

const initialState: State = {
  listId: '',
  title: '',
  description: '',
  count: 0,
  dialogOpen: false,
};

export const Lists = () => {
  const theme = useTheme();

  const navigate = useNavigate();

  const { username } = useAppSelector((s) => s.user);

  const [triggerGetLists, { data }] = useLazyGetListsQuery();
  const [addList] = useAddListMutation();
  const [updateList] = useUpdateListMutation();
  const [deleteList] = useDeleteListMutation();

  const [state, setState] = useState(initialState);

  const handleDialogOpen = ({
    open,
    type = state.type,
    list = undefined,
  }: {
    open: boolean;
    type?: DIALOG_TYPE;
    list?: any;
  }) => {
    const listModifier =
      type === DIALOG_TYPE.UPDATE || type === DIALOG_TYPE.DELETE
        ? list
        : type === DIALOG_TYPE.ADD && state.listId
          ? initialState
          : {};

    if (open) {
      setState((s) => ({
        ...s,
        ...listModifier,
        dialogOpen: open,
        type,
      }));
    }

    if (!open) {
      setState((s) => ({ ...s, dialogOpen: open }));
      setTimeout(() => {
        setState((s) => ({
          ...s,
          ...listModifier,
          type,
        }));
      }, theme.transitions.duration.leavingScreen);
    }
  };

  const handleChangeStateText: InputProps['onChange'] = (e) => {
    const { value, name } = e.target;

    setState((s) => ({ ...s, [name]: value }));
  };

  useEffect(() => {
    if (username) {
      const preferCacheValue = true;
      triggerGetLists(username, preferCacheValue);
    }
  }, [username]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { dialogOpen, type, ...data } = state;
    if (username) {
      type === DIALOG_TYPE.DELETE
        ? await deleteList({ listId: data.listId, username })
        : await (type === DIALOG_TYPE.UPDATE ? updateList : addList)({
            ...data,
            username,
          });
      setState(initialState);
      handleDialogOpen({ open: false });
    }
  };

  const handleNavToList: CardActionAreaProps['onClick'] = (event) => {
    const { id } = event.currentTarget;
    navigate(`/lists/${id}`);
  };

  return (
    <Box sx={{ px: 2, py: 3, height: '100%' }}>
      <Box>
        <Typography
          variant='h5'
          textAlign='center'
        >{`${username}'s Lists (${data?.length || 0})`}</Typography>
      </Box>
      <Grid container spacing={2}>
        <Grid sm={12}>
          <Button
            onClick={() =>
              handleDialogOpen({ open: true, type: DIALOG_TYPE.ADD })
            }
            fullWidth
            color='inherit'
          >
            New List
          </Button>
        </Grid>
        {data?.length ? (
          data?.map(({ count, created, description, listId, title }) => (
            <Grid key={listId} sm={6} md={3} xl={2}>
              <Card>
                <CardActionArea onClick={handleNavToList} id={listId}>
                  <CardHeader title={title} subheader={created} />
                  <CardContent>
                    <Typography
                      variant='body2'
                      sx={{
                        display: '-webkit-box',
                        '-webkit-line-clamp': '2',
                        '-webkit-box-orient': 'vertical',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        height: '2rem',
                        lineHeight: '1rem',
                      }}
                    >
                      {description}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions
                  disableSpacing
                  sx={(theme) => ({
                    backgroundColor: theme.palette.primary.main,
                    color: theme.palette.getContrastText(
                      theme.palette.primary.main
                    ),
                  })}
                >
                  <IconButton
                    size='small'
                    sx={{ color: 'inherit' }}
                    onClick={() =>
                      handleDialogOpen({
                        open: true,
                        type: DIALOG_TYPE.DELETE,
                        list: { listId, title },
                      })
                    }
                  >
                    <Delete />
                  </IconButton>
                  <IconButton
                    size='small'
                    sx={{ color: 'inherit' }}
                    onClick={() =>
                      handleDialogOpen({
                        open: true,
                        type: DIALOG_TYPE.UPDATE,
                        list: { listId, title, description },
                      })
                    }
                  >
                    <Edit />
                  </IconButton>
                  <Chip
                    label={`${count} items`}
                    sx={{
                      ml: 'auto',
                      color: 'inherit',
                      borderColor: 'inherit',
                    }}
                    variant='outlined'
                    size='small'
                  />
                </CardActions>
              </Card>
            </Grid>
          ))
        ) : (
          <Grid sm={12} textAlign='center'>
            No Lists Found
          </Grid>
        )}
      </Grid>
      <Dialog
        open={state.dialogOpen}
        autoFocus
        onClose={() => handleDialogOpen({ open: false })}
        PaperProps={{
          component: 'form',
          onSubmit: handleSubmit,
        }}
      >
        {state.type === DIALOG_TYPE.DELETE ? (
          <>
            <DialogTitle
              sx={(theme) => ({
                backgroundColor: theme.palette.primary.main,
                color: theme.palette.getContrastText(
                  theme.palette.primary.main
                ),
                mb: 2,
              })}
            >
              Confirm Delete
            </DialogTitle>
            <DialogContent>
              Are you sure you want to delete the list {state.title}?
            </DialogContent>
            <Divider />
            <DialogActions>
              <Button
                onClick={() => handleDialogOpen({ open: false })}
                color='error'
              >
                Cancel
              </Button>
              <Button type='submit' color='warning' variant='contained'>
                Delete {state.title}
              </Button>
            </DialogActions>
          </>
        ) : (
          <>
            <DialogTitle
              sx={(theme) => ({
                backgroundColor: theme.palette.primary.main,
                color: theme.palette.getContrastText(
                  theme.palette.primary.main
                ),
                mb: 2,
              })}
            >
              {`${state.type === DIALOG_TYPE.UPDATE ? 'Update' : 'New'} List`}
            </DialogTitle>
            <DialogContent>
              <TextField
                value={state.title}
                onChange={handleChangeStateText}
                autoFocus
                required
                margin='dense'
                id='title'
                name='title'
                label='List Title'
                fullWidth
                variant='standard'
              />
              <TextField
                value={state.description}
                onChange={handleChangeStateText}
                margin='dense'
                id='description'
                name='description'
                label='List Description'
                fullWidth
                variant='standard'
              />
            </DialogContent>
            <Divider />
            <DialogActions>
              <Button
                onClick={() => handleDialogOpen({ open: false })}
                color='error'
              >
                Cancel
              </Button>
              <Button type='submit' color='secondary' variant='contained'>
                Submit List
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  );
};
