import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { GraphLink, GraphNode } from "../reducers/GraphReducer";
import { z } from "zod";

enum tags {
  notes = "notes",
  labels = "labels",
  links = "links",
  noteLabels = "noteLabels",
  loginStatus = "loginStatus",
  username = "username",
}

const labelsSchema = z.record(z.array(z.string()));
export type labelsSchemaType = z.infer<typeof labelsSchema>;
// const labelsSchema = z.record(z.array(z.number()));

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "/",
  }),
  tagTypes: [
    tags.notes,
    tags.labels,
    tags.noteLabels,
    tags.links,
    tags.loginStatus,
    tags.username,
  ],
  endpoints: (builder) => ({
    isLoggedIn: builder.query<boolean, void>({
      query: () => `isLoggedIn`,

      providesTags: [tags.loginStatus],
    }),

    getUsername: builder.query<string, void>({
      query: () => ({
        url: `/GetCurrentUser`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: [tags.username],
    }),

    login: builder.mutation<boolean, { Email: string; Password: string }>({
      query: ({ Email, Password }) => ({
        url: `/Authenticate/Login`,
        method: "POST",
        credentials: "include",
        params: {
          Email: Email,
          Password: Password,
        },
      }),
      invalidatesTags: [tags.loginStatus, tags.username],
    }),
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

    getLabelsForEveryNote: builder.query<any, void>({
      query: () => `/Labels/GetLabelsForAllNotes`,
      transformResponse: (response: any) => {
        try {
          labelsSchema.parse(response);
          return response;
        } catch (e) {
          throw e;
        }
      },
      providesTags: [tags.noteLabels, tags.labels],
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
      invalidatesTags: [tags.noteLabels, tags.labels, tags.notes],
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

    addLink: builder.mutation<unknown, GraphLink>({
      query: (link: GraphLink) => ({
        url: `/Links/Create`,
        method: "POST",
        params: link,
      }),
      invalidatesTags: [tags.links],
    }),

    deleteLink: builder.mutation<
      unknown,
      { sourceId: string; targetId: string }
    >({
      query: ({
        sourceId,
        targetId,
      }: {
        sourceId: string;
        targetId: string;
      }) => ({
        url: `/Links/Delete`,
        method: "POST",
        params: {
          sourceId: sourceId,
          targetId: targetId,
        },
      }),
      invalidatesTags: [tags.links],
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
  useAddLinkMutation,
  useDeleteLinkMutation,
  useGetLabelsForEveryNoteQuery,
  useLoginMutation,
  useIsLoggedInQuery,
  useGetUsernameQuery,
} = apiSlice;
