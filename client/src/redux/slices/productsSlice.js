import { createSlice } from "@reduxjs/toolkit";

// let initialProducts = [
//   {
//     id: 1,
//     title: "Harry Potter and Prison of Azkaban",
//     category: "Books",
//     description: "The firsd edition",
//     price: 30,
//     stock: 8,
//   },
//   {
//     id: 2,
//     title: "Bible",
//     category: "Books",
//     description: "Synodal translation",
//     price: 25,
//     stock: 15,
//   },
//   {
//     id: 3,
//     title: "Set of pens",
//     category: "Stationery",
//     description: "Set of liners of different width",
//     price: 5,
//     stock: 5,
//   },
//   {
//     id: 4,
//     title: "Desert Eagle",
//     category: "Guns",
//     description: "Deser Eagle 152/254mm",
//     price: 450,
//     stock: 25,
//   },
//   {
//     id: 5,
//     title: "AK-47",
//     category: "Guns",
//     description: "7.62x39mm, 1997 year produced",
//     price: 750,
//     stock: 55,
//   },
//   {
//     id: 6,
//     title: "Ray-Ban sunglasses",
//     category: "Accessories",
//     description: "Black sunglasses",
//     price: 50,
//     stock: 10,
//   },
//   {
//     id: 7,
//     title: "Panama hat",
//     category: "Accessories",
//     description: " White panama hat",
//     price: 20,
//     stock: 5,
//   },
// ];

const productsSlice = createSlice({
  name: "products",
  initialState: {
    categoryChoosen: "all",
    isLoading: false,
    error: null,
  },
  reducers: {
    chooseCategory: (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.categoryChoosen = action.payload;
    },
  },
});

export const { setProducts, chooseCategory } = productsSlice.actions;
export const productsReducer = productsSlice.reducer;
