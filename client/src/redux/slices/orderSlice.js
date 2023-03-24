import { createSlice } from "@reduxjs/toolkit";

// items: [
//     { id: "1", name: "", quantity: 0 },
//     { id: "2", name: "", quantity: 0 },
//     { id: "3", name: "", quantity: 0 },
//   ],

export const orderInitialState = {
  loading: false,
  error: true,
  orderInfo: localStorage.getItem("orderInfo") ?? null,
  address: localStorage.getItem("orderAddress") ?? null,
  allUserOrders: null,
};

export const orderSlice = createSlice({
  name: "order",
  initialState: orderInitialState,
  reducers: {
    setOrderLoading: (state) => {
      state.loading = true;
    },
    setOrderError: (state, { payload }) => {
      state.error = payload;
      state.loading = false;
    },
    createOrder: (state, action) => {
      state.orderInfo = action.payload;

      localStorage.setItem("orderInfo", JSON.stringify(action.payload));
    },
    setAddress: (state, action) => {
      state.address = action.payload;
      localStorage.setItem("orderAddress", JSON.stringify(action.payload));
    },
    clearOrderInfo: (state, action) => {
      state.orderInfo = null;
      localStorage.removeItem("orderInfo");
    },
    clearOrderAddress: (state, action) => {
      state.address = null;
      localStorage.removeItem("orderAddress");
    },
  },
});

export const {
  createOrder,
  setOrderError,
  setOrderLoading,
  setAddress,
  clearOrderInfo,
  clearOrderAddress,
} = orderSlice.actions;
export const orderReducer = orderSlice.reducer;
