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
        query: () => {
          return {
            url: "/api/messages",
            method: "GET",
          };
        },
      }),
    };
  },
});

export const { useGetAllMessagesQuery } = messagesApi;
export { messagesApi };
