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

const labelsWithTimeStampsSchema = z.array(
  z.object({
    labelName: z.string(),
    timeStamp: z.string().nullable(),
  }),
);

export type labelsWithTimeStampsSchemaType = z.infer<
  typeof labelsWithTimeStampsSchema
>;

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
    register: builder.mutation<
      boolean,
      { Email: string; UserName: string; Password: string }
    >({
      query: ({ Email, UserName, Password }) => ({
        url: `/create`,
        method: "POST",
        params: {
          Email: Email,
          Name: UserName,
          Password: Password,
        },
      }),
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
      // invalidatesTags: [tags.loginStatus, tags.username],
    }),

    logout: builder.mutation<boolean, void>({
      query: () => ({
        url: `/Authenticate/Logout`,
        method: "POST",
        credentials: "include",
      }),
      invalidatesTags: [tags.loginStatus, tags.username],
    }),

    getLabels: builder.query<string[], void>({
      query: () => `/Labels/GetAllLabels`,
      providesTags: [tags.labels],
    }),

    getLabelsWithTimeStamps: builder.query<
      labelsWithTimeStampsSchemaType,
      void
    >({
      query: () => `/Labels/GetAllLabelsWithTimeStamps`,
      transformResponse: (response: any) => {
        try {
          labelsWithTimeStampsSchema.parse(response);
          return response;
        } catch (e) {
          throw e;
        }
      },
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
    removeLabelFromNote: builder.mutation<
      string,
      { noteId: string; label: string }
    >({
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

    removeLabel: builder.mutation<string, { label: string }>({
      query: ({ label }) => ({
        url: `/Labels/DeleteLabel`,
        method: "POST",
        params: {
          labelName: label,
        },
      }),
      invalidatesTags: [tags.noteLabels, tags.labels],
    }),
    addLabel: builder.mutation<string, { label: string }>({
      query: ({ label }) => ({
        url: `/Labels/CreateLabel`,
        method: "POST",
        params: {
          labelName: label,
        },
      }),
      invalidatesTags: [tags.noteLabels, tags.labels],
    }),

    getNotes: builder.query<GraphNode[], void>({
      query: () => `/Notes/GetAll`,
      providesTags: [tags.notes],
      transformResponse: (response: GraphNode[]) => {
        // debugger;
        return response.sort((note1, note2) => {
          if (!note1.DateLastModified || !note2.DateLastModified) return 0;
          const date1 = new Date(note1.DateLastModified);
          const date2 = new Date(note2.DateLastModified);
          return date2.getTime() - date1.getTime();
        });
        // return response.sort((a, b) => Number(a.id) - Number(b.id));
      },
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
          // ...GraphNode,
        },
        body: GraphNode,
      }),

      invalidatesTags: [tags.notes],
    }),
    addNote: builder.mutation<unknown, GraphNode>({
      query: (GraphNode) => ({
        url: `/Notes/Create`,
        method: "POST",
        // body: todo,
        // TODO use [FromBody] in the controller ...
        body: {
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

    /**
     * This is a dangerous mutation that will delete all data belonging to the user from the database
     */
    clearData: builder.mutation<unknown, void>({
      query: () => ({
        url: `/clearData`,
        method: "POST",
      }),
      invalidatesTags: [tags.notes, tags.labels, tags.links, tags.noteLabels],
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
  useGetLabelsWithTimeStampsQuery,
  useGetNoteLabelsQuery,
  useSetLabelMutation,
  useRemoveLabelFromNoteMutation,
  useRemoveLabelMutation,
  useAddLabelMutation,
  useGetLinksQuery,
  useAddLinkMutation,
  useDeleteLinkMutation,
  useGetLabelsForEveryNoteQuery,
  useRegisterMutation,
  useLoginMutation,
  useLogoutMutation,
  useIsLoggedInQuery,
  useGetUsernameQuery,
  useClearDataMutation,
} = apiSlice;
