import { combineReducers, configureStore } from '@reduxjs/toolkit';

import channelsSlice from './slices/channelsSlice';
import messagesSlice from './slices/messagesSlice';
import modalSlice from './slices/modalSlice';

const reducer = combineReducers({
  channelsSlice,
  messagesSlice,
  modalSlice,
});

const store = configureStore({
  reducer,
});

export default store;
