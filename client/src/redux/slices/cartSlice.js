import { createSlice, current } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: JSON.parse(localStorage.getItem("cartItems")) ?? [],
    totalItemsQuantity: JSON.parse(localStorage.getItem("cartTotalItems")) ?? 0,
    totalCost: JSON.parse(localStorage.getItem("cartTotalCost")) ?? 0,
  },
  reducers: {
    addToCart: (state, action) => {
      if (
        current(state).items.find(
          (item) => item.item._id === action.payload._id
        )
      ) {
        let index = current(state).items.findIndex(
          (el) => el.item._id === action.payload._id
        );

        state.items[index].quantity++;
        state.totalItemsQuantity++;

        let calculatedTotalCost = 0;
        for (let i = 0; i < state.items.length; i++) {
          calculatedTotalCost +=
            state.items[i].item.price * state.items[i].quantity;
        }

        state.totalCost = parseFloat(calculatedTotalCost.toFixed(2));
      } else {
        state.items = [...state.items, { item: action.payload, quantity: 1 }];
        state.totalItemsQuantity++;
        let calculatedTotalCost = 0;
        for (let i = 0; i < state.items.length; i++) {
          calculatedTotalCost +=
            state.items[i].item.price * state.items[i].quantity;
        }

        state.totalCost = parseFloat(calculatedTotalCost.toFixed(2));
        localStorage.setItem("cartItems", JSON.stringify(state.items));
        localStorage.setItem("cartTotalCost", JSON.stringify(state.totalCost));
        localStorage.setItem(
          "cartTotalItems",
          JSON.stringify(state.totalItemsQuantity)
        );
      }
    },
    changeQuantity: (state, action) => {
      let index = current(state).items.findIndex(
        (el) => el.item._id === action.payload.id
      );

      if (!action.payload.quantity) {
        action.payload.quantity = 0;
      }

      if (
        action.payload.operation === "subtract" &&
        state.items[index].quantity === 0
      ) {
        state.items[index].quantity = 0;
        let calculatedTotalCost = 0;
        let calculatedTotalItemsQuantity = 0;
        for (let i = 0; i < state.items.length; i++) {
          calculatedTotalCost +=
            state.items[i].item.price * state.items[i].quantity;
          calculatedTotalItemsQuantity += state.items[i].quantity;
        }
        state.totalItemsQuantity = calculatedTotalItemsQuantity;
        state.totalCost = parseFloat(calculatedTotalCost.toFixed(2));

        localStorage.setItem("cartTotalCost", JSON.stringify(state.totalCost));
        localStorage.setItem(
          "cartTotalItems",
          JSON.stringify(state.totalItemsQuantity)
        );
        localStorage.setItem("cartItems", JSON.stringify(state.items));
      } else if (action.payload.operation == null) {
        state.items[index].quantity =
          action.payload.quantity < 0
            ? action.payload.quantity * -1
            : action.payload.quantity;
        let calculatedTotalCost = 0;
        let calculatedTotalItemsQuantity = 0;
        for (let i = 0; i < state.items.length; i++) {
          calculatedTotalCost +=
            state.items[i].item.price * state.items[i].quantity;
          calculatedTotalItemsQuantity += state.items[i].quantity;
        }
        state.totalItemsQuantity = calculatedTotalItemsQuantity;
        state.totalCost = parseFloat(calculatedTotalCost.toFixed(2));

        localStorage.setItem("cartTotalCost", JSON.stringify(state.totalCost));
        localStorage.setItem(
          "cartTotalItems",
          JSON.stringify(state.totalItemsQuantity)
        );
        localStorage.setItem("cartItems", JSON.stringify(state.items));
      } else if (
        !action.payload.quantity &&
        action.payload.operation === "add"
      ) {
        state.items[index].quantity++;
        let calculatedTotalCost = 0;
        let calculatedTotalItemsQuantity = 0;
        for (let i = 0; i < state.items.length; i++) {
          calculatedTotalCost +=
            state.items[i].item.price * state.items[i].quantity;
          calculatedTotalItemsQuantity += state.items[i].quantity;
        }
        state.totalItemsQuantity = calculatedTotalItemsQuantity;
        state.totalCost = parseFloat(calculatedTotalCost.toFixed(2));

        localStorage.setItem("cartTotalCost", JSON.stringify(state.totalCost));
        localStorage.setItem(
          "cartTotalItems",
          JSON.stringify(state.totalItemsQuantity)
        );
        localStorage.setItem("cartItems", JSON.stringify(state.items));
      } else if (
        !action.payload.quantity &&
        action.payload.operation === "subtract"
      ) {
        state.items[index].quantity--;
        let calculatedTotalCost = 0;
        let calculatedTotalItemsQuantity = 0;
        for (let i = 0; i < state.items.length; i++) {
          calculatedTotalCost +=
            state.items[i].item.price * state.items[i].quantity;
          calculatedTotalItemsQuantity += state.items[i].quantity;
        }
        state.totalItemsQuantity = calculatedTotalItemsQuantity;
        state.totalCost = parseFloat(calculatedTotalCost.toFixed(2));

        localStorage.setItem("cartTotalCost", JSON.stringify(state.totalCost));
        localStorage.setItem(
          "cartTotalItems",
          JSON.stringify(state.totalItemsQuantity)
        );
        localStorage.setItem("cartItems", JSON.stringify(state.items));
      } else {
      }
    },
    removeItem: (state, action) => {
      let index = current(state).items.findIndex(
        (el) => el.item._id === action.payload
      );
      state.totalItemsQuantity -= state.items[index].quantity;
      state.totalCost -=
        state.items[index].quantity *
        parseFloat(state.items[index].item.price.toFixed(2));
      state.items.splice(index, 1);

      localStorage.setItem("cartTotalCost", JSON.stringify(state.totalCost));
      localStorage.setItem(
        "cartTotalItems",
        JSON.stringify(state.totalItemsQuantity)
      );
      localStorage.setItem("cartItems", JSON.stringify(state.items));
    },
    removeAllItems: (state, action) => {
      state.items = [];
      state.totalItemsQuantity = 0;
      state.totalCost = 0;

      localStorage.setItem("cartTotalCost", JSON.stringify(state.totalCost));
      localStorage.setItem(
        "cartTotalItems",
        JSON.stringify(state.totalItemsQuantity)
      );
      localStorage.setItem("cartItems", JSON.stringify(state.items));
    },
  },
});

export const { addToCart, changeQuantity, removeItem, removeAllItems } =
  cartSlice.actions;
export const cartReducer = cartSlice.reducer;
