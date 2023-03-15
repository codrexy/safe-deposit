import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpened: true,
  saved_pin: null,
  entered_pin: "",
  copy_pin: "",
  screen_active: false,
  status: "Ready",
  serial_number: 4815162342
};

export const safeSlice = createSlice({
  name: "safe",
  initialState,
  reducers: {
    updateIsOpened: (state, action) => {
      state.isOpened = action.payload;
    },
    updateSavedPin: (state, action) => {
      state.saved_pin = action.payload;
    },
    updateEnteredPin: (state, action) => {
      state.entered_pin = action.payload;
    },
    updateScreenActive: (state, action) => {
      state.screen_active = action.payload;
    },
    updateStatus: (state, action) => {
      state.status = action.payload;
    },
    updateCopyPin: (state, action) => {
      state.copy_pin = action.payload;
    },
  },
});

export const {
  updateIsOpened,
  updateEnteredPin,
  updateSavedPin,
  updateScreenActive,
  updateStatus,
  updateCopyPin,
} = safeSlice.actions;

export default safeSlice.reducer;
