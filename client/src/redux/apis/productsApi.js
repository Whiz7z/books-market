import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000",
    prepareHeaders: (headers, { getState }) => {
      const states = getState();
      if (states.user.userInfo && states.user.userInfo.token) {
        headers.set("authorization", `Bearer ${states.user.userInfo.token}`);
      }
      return headers;
    },
  }),
  endpoints(builder) {
    return {
      getAllProducts: builder.query({
        providesTags: (result, error) => {
          return [
            { type: "Product Updated" },
            { type: "Product Created" },
            { type: "Product Deleted" },
          ];
        },
        query: (category) => {
          return {
            url: "/api/products",
            params: {
              category: category,
            },
            method: "GET",
          };
        },
      }),
      getCategoriesAndPreview: builder.query({
        query: () => {
          return {
            url: "/api/products/categories",
            method: "GET",
          };
        },
      }),
      updateProduct: builder.mutation({
        invalidatesTags: (result, error) => {
          return [{ type: "Product Updated" }];
        },
        query: (product) => {
          return {
            url: "/api/products/",
            method: "PUT",
            body: {
              product,
            },
          };
        },
      }),
      createProduct: builder.mutation({
        invalidatesTags: (result, error) => {
          return [{ type: "Product Created" }];
        },
        query: (product) => {
          return {
            url: "/api/products/",
            method: "POST",
            body: {
              product,
            },
          };
        },
      }),
      deleteProduct: builder.mutation({
        invalidatesTags: (result, error) => {
          return [{ type: "Product Deleted" }];
        },
        query: (productId) => {
          return {
            url: "/api/products/",
            method: "DELETE",
            body: {
              productId,
            },
          };
        },
      }),
    };
  },
});

export const {
  useGetAllProductsQuery,
  useUpdateProductMutation,
  useCreateProductMutation,
  useDeleteProductMutation,
  useGetCategoriesAndPreviewQuery,
} = productsApi;
export { productsApi };
