import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://kiln-task-backend.vercel.app/api/v1",
  }),
  tagTypes: ["task", "wishlist", "cart", "purchase", "users"],
  endpoints: () => ({}),
});
