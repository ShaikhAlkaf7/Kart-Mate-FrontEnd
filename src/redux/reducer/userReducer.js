import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  loading: true,
};

export const userReducer = createSlice({
  name: "userReducer",
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.loading = false;
      state.user = action.payload;
    },

    removeUser: (state) => {
      state.loading = false;
      state.user = null;
    },
  },
});

export const { addUser, removeUser } = userReducer.actions;
// export default userReducer;
