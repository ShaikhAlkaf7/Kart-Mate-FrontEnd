import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: false,
};

export const popupReducer = createSlice({
  name: "popup",
  initialState,
  reducers: {
    setPopupFalse: (state, action) => {
      state.value = false;
    },
    setPopupTrue: (state, action) => {
      state.value = true;
    },
  },
});

export const { setPopupFalse, setPopupTrue } = popupReducer.actions;
