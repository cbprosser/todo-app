import { AlertProps } from '@mui/material';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Simplify } from 'type-fest';

type Notification = {
  key: number | string;
  level: Required<AlertProps['severity']>;
  message: string;
  title?: AlertProps['title'];
  variant?: AlertProps['variant'];
};

type QueueNotification = Simplify<Notification & { duration?: number }>;

type State = {
  queue: QueueNotification[];
  visible: boolean;
};

const initialState: State = {
  queue: [],
  visible: false,
};

const notificationSlice = createSlice({
  name: 'notif',
  initialState,
  reducers: {
    setNotificationVisible: (state, { payload }: PayloadAction<boolean>) => {
      state.visible = payload;
    },
    pushNotification: (
      state,
      { payload }: PayloadAction<QueueNotification>
    ) => {
      state.queue.push(payload);
      state.visible = true;
    },
    shiftNotification: (state) => {
      state.queue.shift();
      if (state.queue.length) {
        state.visible = true;
      }
    },
  },
});

export const { shiftNotification, pushNotification, setNotificationVisible } =
  notificationSlice.actions;

export const notificationReducer = notificationSlice.reducer;

export const notificationPath = notificationSlice.reducerPath;
