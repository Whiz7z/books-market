import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const messagesApi = createApi({
  reducerPath: "messagesApi",
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
      getAllMessages: builder.query({
        providesTags: (result, error) => {
          return [{ type: "Message Updated" }];
        },
        query: () => {
          return {
            url: "/api/messages",
            method: "GET",
          };
        },
      }),
      updateMessageStatus: builder.mutation({
        invalidatesTags: (result, error) => {
          return [{ type: "Message Updated" }];
        },
        query: (payload) => {
          return {
            url: "/api/messages/",
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

export const { useGetAllMessagesQuery, useUpdateMessageStatusMutation } =
  messagesApi;
export { messagesApi };
