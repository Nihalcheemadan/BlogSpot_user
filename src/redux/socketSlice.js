import { createSlice } from '@reduxjs/toolkit';
import { createSocketAction } from '../helpers/socketMiddleware';

const initialState = {
  messages: [],
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    addMessage(state, action) {
      state.messages.push(action.payload);
    },
  },
});

export const fetchMessages = createSocketAction('fetch_messages', (messages) => {
  return chatSlice.actions.addMessage(messages);
});

export const sendMessage = createSocketAction('send_message', () => {
  return fetchMessages();
});

export default chatSlice.reducer;