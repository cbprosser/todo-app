import {
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  InputProps,
  List as MUIList,
  ListItem,
  ListItemText,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useAppSelector } from '../../redux/hooks';
import {
  useAddItemToListMutation,
  useDeleteItemFromListMutation,
  useLazyGetListQuery,
  useUpdateItemInListMutation,
} from '../../redux/slice/apiSlice';
import { Delete, Edit } from '@mui/icons-material';

enum DIALOG_TYPE {
  ADD,
  UPDATE,
  DELETE,
}

type State = {
  listItemId: string;
  description: string;
  dialogOpen: boolean;
  type?: DIALOG_TYPE;
};

const initialState: State = {
  listItemId: '',
  description: '',
  dialogOpen: false,
};

export const List = () => {
  const theme = useTheme();

  const { pathname } = useLocation();
  const listId = useMemo(() => pathname.split('/').pop(), [pathname]);

  const { username } = useAppSelector((s) => s.user);

  const [triggerGetList, { data, isUninitialized }] = useLazyGetListQuery();
  const [addItemToList] = useAddItemToListMutation();
  const [updateItemInList] = useUpdateItemInListMutation();
  const [deleteItemFromList] = useDeleteItemFromListMutation();

  const [state, setState] = useState(initialState);

  const handleDialogOpen = ({
    open,
    type = undefined,
    listItem = undefined,
  }: {
    open: boolean;
    type?: DIALOG_TYPE;
    listItem?: any;
  }) => {
    const listModifier =
      type === DIALOG_TYPE.UPDATE || type === DIALOG_TYPE.DELETE
        ? listItem
        : type === DIALOG_TYPE.ADD && state.listItemId
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
    if (listId && username && isUninitialized) {
      triggerGetList({ listId, username });
      setState((s) => ({ ...s, listId }));
    }
  }, [listId, username, triggerGetList, isUninitialized]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { dialogOpen, type, ...data } = state;
    if (username && listId) {
      type === DIALOG_TYPE.DELETE
        ? await deleteItemFromList({
            listItemId: data.listItemId,
            username,
            listId,
          })
        : await (
            type === DIALOG_TYPE.UPDATE ? updateItemInList : addItemToList
          )({ ...data, username, listId });
      setState(initialState);
      handleDialogOpen({ open: false });
    }
  };

  return (
    <Container fixed>
      <Box>
        <Typography variant='h5'>
          List {data?.title} ({data?.count})
        </Typography>
        {data?.description && (
          <Typography variant='subtitle2'>{data.description}</Typography>
        )}
        <Button
          onClick={() => handleDialogOpen({ open: true })}
          fullWidth
          color='inherit'
        >
          Add Item to List
        </Button>
      </Box>
      {data && (
        <Box>
          {data.items?.length ? (
            <MUIList dense>
              {data.items.map(({ description, listItemId }) => (
                <ListItem
                  key={listItemId}
                  secondaryAction={
                    <>
                      <IconButton
                        size='small'
                        sx={{ color: 'inherit' }}
                        onClick={() =>
                          handleDialogOpen({
                            open: true,
                            type: DIALOG_TYPE.DELETE,
                            listItem: { listItemId },
                          })
                        }
                        edge='end'
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
                            listItem: { listItemId, description },
                          })
                        }
                        edge='end'
                      >
                        <Edit />
                      </IconButton>
                    </>
                  }
                >
                  <ListItemText>{description}</ListItemText>
                </ListItem>
              ))}
            </MUIList>
          ) : (
            <>List is empty</>
          )}
        </Box>
      )}
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
              Are you sure you want to delete {state.description}?
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
                Delete {state.description}
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
              {state.type === DIALOG_TYPE.UPDATE
                ? 'Update Item in List'
                : 'Add Item to List'}
            </DialogTitle>
            <DialogContent>
              <TextField
                value={state.description}
                onChange={handleChangeStateText}
                autoFocus
                required
                margin='dense'
                id='description'
                name='description'
                label='Item Description'
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
                Submit Item
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Container>
  );
};
