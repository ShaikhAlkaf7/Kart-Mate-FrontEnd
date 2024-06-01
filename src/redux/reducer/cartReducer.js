import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItem: [],
  subTotal: 0,
  tax: 0,
  shippingCharges: 0,
  discount: 0,
  total: 0,
  shippingInfo: {
    address: "",
    city: "",
    state: "",
    country: "",
    pincode: "",
    phone: "",
  },
};

export const cartReducer = createSlice({
  name: "cartReducer",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const index = state.cartItem.findIndex(
        (i) => i._id === action.payload._id
      );
      if (index !== -1) state.cartItem[index] = action.payload;
      else state.cartItem.push(action.payload);
    },
    removeCartItem: (state, action) => {
      state.cartItem = state.cartItem.filter((i) => i._id !== action.payload);
    },

    calculatePrice: (state) => {
      let subTotal = state.cartItem.reduce(
        (total, item) => total + item.price * item?.quantity,
        0
      );
      for (let i = 0; i < state.cartItem.length; i++) {
        const item = state.cartItem[i];
        subTotal = item.price * item.quantity;
      }

      state.subTotal = subTotal;
      state.shippingCharges = state.subTotal > 1000 ? 0 : 200;
      state.tax = Math.round(state.subTotal * 0.18);
      state.total =
        state.subTotal + state.tax + state.shippingCharges - state.discount;
    },

    discountApply: (state, action) => {
      state.discount = action.payload;
    },

    shippingInfo: (state, action) => {
      state.shippingInfo.address = action.payload.address;
      state.shippingInfo.city = action.payload.city;
      state.shippingInfo.country = action.payload.country;
      state.shippingInfo.pincode = action.payload.pincode;
      state.shippingInfo.state = action.payload.state;
      state.shippingInfo.phone = action.payload.phone;
    },
    resetCart: () => initialState,
  },
});

export const {
  addToCart,
  removeCartItem,
  calculatePrice,
  discountApply,
  shippingInfo,
  resetCart,
} = cartReducer.actions;
