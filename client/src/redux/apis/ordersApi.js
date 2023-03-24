import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const ordersApi = createApi({
  reducerPath: "ordersApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000",
    prepareHeaders: (headers, { getState }) => {
      const states = getState();
      if (states.user.userInfo.token) {
        headers.set("authorization", `Bearer ${states.user.userInfo.token}`);
      }
      return headers;
    },
  }),
  endpoints(builder) {
    return {
      getAllOrders: builder.query({
        providesTags: (result, error) => {
          return [{ type: "Order Created" }, { type: "Order Updated" }];
        },
        query: () => {
          return {
            url: "/api/orders",
            method: "GET",
          };
        },
      }),
      getMyOrders: builder.query({
        query: () => {
          return {
            url: "/api/orders/myorders",
            method: "GET",
          };
        },
      }),
      updateOrderStatus: builder.mutation({
        invalidatesTags: (result, error) => {
          return [{ type: "Order Updated" }];
        },
        query: (payload) => {
          return {
            url: "/api/orders/",
            method: "PUT",
            body: {
              payload,
            },
          };
        },
      }),
    };
  },
});

export const {
  useGetAllOrdersQuery,
  useUpdateOrderStatusMutation,
  useGetMyOrdersQuery,
} = ordersApi;
export { ordersApi };
