import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./reducer/userReducer";
import { popupReducer } from "./reducer/popupReducer";
import { cartReducer } from "./reducer/cartReducer";

export const store = configureStore({
  reducer: {
    [userReducer.name]: userReducer.reducer,
    [popupReducer.name]: popupReducer.reducer,
    [cartReducer.name]: cartReducer.reducer,
  },
});
