import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { GraphNode } from "../reducers/GraphReducer";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "/",
  }),
  tagTypes: ["notes"],
  endpoints: (builder) => ({
    getNotes: builder.query<GraphNode[], void>({
      query: () => `/Notes/GetAll`,
      providesTags: ["notes"],
      // transformResponse: (response: Todo[]) => {
      //     return response.sort((a, b) => Number(a.id) - Number(b.id))
      // }
    }),
    updateNote: builder.mutation<string, GraphNode>({
      query: (GraphNode) => ({
        url: `/Notes/Update`,
        method: "POST",
        params: {
          noteId: GraphNode.Id,
          // note: GraphNode,
          ...GraphNode,
        },
      }),

      invalidatesTags: ["notes"],
    }),
    addNote: builder.mutation<unknown, GraphNode>({
      query: (GraphNode) => ({
        url: `/Notes/Create`,
        method: "POST",
        // body: todo,
        params: GraphNode,
      }),
      invalidatesTags: ["notes"],
    }),
    recoverNote: builder.mutation<unknown, { id: string }>({
      query: ({ id }: { id: string }) => ({
        url: `/Notes/Recover`,
        method: "POST",
        params: {
          noteId: id,
        },
      }),
      invalidatesTags: ["notes"],
    }),
    // updateTodo: builder.mutation<unknown, Todo>({
    //     query: (todo) => ({
    //         url: `/todos/${todo.id}`,
    //         method: 'PUT',
    //         body: todo,
    //     }),
    //     invalidatesTags: ['Todos'],
    // }),
    deleteNote: builder.mutation<unknown, { id: string }>({
      query: ({ id }: { id: string }) => ({
        url: `/Notes/Delete`,
        method: "POST",
        params: {
          noteId: id,
          permanent: false,
        },
      }),
      invalidatesTags: ["notes"],
    }),
  }),
});

export const {
  useGetNotesQuery,
  useAddNoteMutation,
  useRecoverNoteMutation,
  useDeleteNoteMutation,
  useUpdateNoteMutation,
} = apiSlice;
