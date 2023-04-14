import { configureStore } from "@reduxjs/toolkit";
import { productsReducer } from "./slices/productsSlice";
import { cartReducer } from "./slices/cartSlice";
import { setProducts as setProductReducer } from "./slices/productsSlice";
import { productsApi } from "./apis/productsApi";
import { ordersApi } from "./apis/ordersApi";
import { userReducer } from "./slices/userSlice";
import { orderReducer } from "./slices/orderSlice";
import { messagesApi } from "./apis/messagesApi";

export const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
    user: userReducer,
    order: orderReducer,
    [productsApi.reducerPath]: productsApi.reducer,
    [ordersApi.reducerPath]: ordersApi.reducer,
    [messagesApi.reducerPath]: messagesApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware()
      .concat(ordersApi.middleware)
      .concat(productsApi.middleware)
      .concat(messagesApi.middleware);
  },
});

export * from "./slices/productsSlice";
export * from "./slices/cartSlice";
export * from "./slices/userSlice";
export * from "./slices/orderSlice";
export {
  useGetAllProductsQuery,
  useUpdateProductMutation,
  useCreateProductMutation,
  useDeleteProductMutation,
  useGetCategoriesAndPreviewQuery,
  useGetAllTagsQuery,
  useLazyGetProductsByTagsQuery,
  useGetProductByIdQuery,
  useSetProductOnTheBannerMutation,
  useRemoveProductFromTheBannerMutation,
  useGetProductOfTheWeekQuery,
} from "./apis/productsApi";

export {
  useGetAllOrdersQuery,
  useGetMyOrdersQuery,
  useUpdateOrderStatusMutation,
  useCancelOrderMutation,
} from "./apis/ordersApi";

export {
  useGetAllMessagesQuery,
  useUpdateMessageStatusMutation,
} from "./apis/messagesApi";

export { ordersApi } from "./apis/ordersApi";
