import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { GraphLink, GraphNode } from "../reducers/GraphReducer";

enum tags {
  notes = "notes",
  labels = "labels",
  links = "links",
  noteLabels = "noteLabels",
}

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "/",
  }),
  tagTypes: [tags.notes, tags.labels, tags.noteLabels, tags.links],
  endpoints: (builder) => ({
    getLabels: builder.query<string[], void>({
      query: () => `/Labels/GetAllLabels`,
      providesTags: [tags.labels],
    }),

    // get labels for a note
    getNoteLabels: builder.query<string[], { id: string }>({
      query: ({ id }: { id: string }) => ({
        url: "/Notes/GetAllLabelsOfNote",
        method: "GET",
        params: {
          noteId: id,
        },
      }),
      providesTags: [tags.noteLabels],
    }),

    // add a label to a note
    setLabel: builder.mutation<string, { noteId: string; label: string }>({
      query: ({ noteId, label }) => ({
        url: `/Notes/AddLabelToNote`,
        method: "POST",
        params: {
          noteId: noteId,
          labelName: label,
        },
      }),
      invalidatesTags: [tags.noteLabels],
    }),

    // remove a label from a note
    removeLabel: builder.mutation<string, { noteId: string; label: string }>({
      query: ({ noteId, label }) => ({
        url: `/Notes/RemoveLabelFromNote`,
        method: "POST",
        params: {
          noteId: noteId,
          labelName: label,
        },
      }),
      invalidatesTags: [tags.noteLabels],
    }),

    getNotes: builder.query<GraphNode[], void>({
      query: () => `/Notes/GetAll`,
      providesTags: [tags.notes],
      // transformResponse: (response: Todo[]) => {
      //     return response.sort((a, b) => Number(a.id) - Number(b.id))
      // }
    }),

    getNoteById: builder.query<GraphNode, { id: string }>({
      query: ({ id }: { id: string }) => ({
        url: `/Notes/GetById`,
        method: "GET",
        params: {
          noteId: id,
        },
      }),
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

      invalidatesTags: [tags.notes],
    }),
    addNote: builder.mutation<unknown, GraphNode>({
      query: (GraphNode) => ({
        url: `/Notes/Create`,
        method: "POST",
        // body: todo,
        params: {
          ...GraphNode,
          Content:
            GraphNode.Content.trim() === "" ? undefined : GraphNode.Content, // this is a hack.  I don't know why the server is not accepting empty strings
        },
      }),
      invalidatesTags: [tags.notes],
    }),
    recoverNote: builder.mutation<unknown, { id: string }>({
      query: ({ id }: { id: string }) => ({
        url: `/Notes/Recover`,
        method: "POST",
        params: {
          noteId: id,
        },
      }),
      invalidatesTags: [tags.notes],
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
      invalidatesTags: [tags.notes],
    }),

    getLinks: builder.query<GraphLink[], void>({
      query: () => `/Links/GetAll`,
      providesTags: [tags.links],
    }),
  }),
});

export const {
  useGetNotesQuery,
  useAddNoteMutation,
  useRecoverNoteMutation,
  useDeleteNoteMutation,
  useUpdateNoteMutation,
  useGetLabelsQuery,
  useGetNoteLabelsQuery,
  useSetLabelMutation,
  useRemoveLabelMutation,
  useGetLinksQuery,
} = apiSlice;
