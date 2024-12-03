import { baseApi } from "../../api/baseApi";

const taskApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createTask: builder.mutation({
      query: (taskInfo) => ({
        url: "addTask",
        method: "POST",
        body: taskInfo,
      }),
      invalidatesTags: ["task"],
    }),

    tasks: builder.query({
      query: ({ search, status }) => ({
        url: `tasks?search=${search || ""}&status=${status || ""}`,
        method: "GET",
      }),
      providesTags: ["task"],
    }),

    searchedTasks: builder.query({
      query: (search) => ({
        url: `product/searchedProducts?search=${search}`,
        method: "GET",
      }),
      providesTags: ["task"],
    }),
    categoryTasks: builder.query({
      query: (category) => ({
        url: `product/categoryProduct?category=${category}`,
        method: "GET",
      }),
      providesTags: ["task"],
    }),
    singleTask: builder.query({
      query: (id) => ({
        url: `/supplies/${id}`,
        method: "GET",
      }),
    }),
    updateTask: builder.mutation({
      query: ({ id, updates }) => ({
        url: `/tasks/${id}`,
        method: "PUT",
        body: { updates },
      }),
      invalidatesTags: ["task"],
    }),
    deleteTask: builder.mutation({
      query: (id) => ({
        url: `/tasks/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["task"],
    }),
  }),
});

export const {
  useCreateTaskMutation,
  useCategoryTasksQuery,
  useTasksQuery,
  useDeleteTaskMutation,
  useSearchedTasksQuery,
  useSingleTaskQuery,
  useUpdateTaskMutation,
} = taskApi;
