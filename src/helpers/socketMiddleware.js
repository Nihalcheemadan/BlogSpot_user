import io from 'socket.io-client';
import { createAsyncThunk } from '@reduxjs/toolkit';

const socket = io();

export const socketMiddleware = () => (next) => (action) => {
  if (typeof action === 'function') {
    return next(action);
  }

  const { type, payload } = action;

  if (type.startsWith('socket/')) {
    const eventName = type.replace('socket/', '');
    socket.emit(eventName, payload);
  } else {
    next(action);
  }
};

export const createSocketAction = (eventName, thunkActionCreator) => {
  return createAsyncThunk(`socket/${eventName}`, async (payload, thunkAPI) => {
    const response = await new Promise((resolve) => {
      socket.emit(eventName, payload, (data) => {
        resolve(data);
      });
    });

    return thunkAPI.dispatch(thunkActionCreator(response));
  });
};
