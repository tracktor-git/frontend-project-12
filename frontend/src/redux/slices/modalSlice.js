/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';

const initialState = { isOpened: false, type: null, data: null };

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal(state, action) {
      state.isOpened = true;
      state.type = action.payload.type;
      state.data = action.payload.data;
    },
    closeModal(state) {
      state.isOpened = false;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
