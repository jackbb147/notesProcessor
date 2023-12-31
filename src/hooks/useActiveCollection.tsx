import { GraphState, GraphNode } from "../reducers/GraphReducer";
import { AppState, Collections } from "../reducers/AppStateReducer";
import {
  useAppState,
  useAppDispatch,
  useGraph,
  useGraphDispatch,
} from "./AppStateAndGraphAndUserhooks";
import {
  useGetNotesQuery,
  useGetLabelsForEveryNoteQuery,
} from "../api/apiSlice";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { useCallback, useEffect, useState } from "react";
import { labelsSchemaType } from "../api/apiSlice";

/**
 * This hook returns the active collection of notes.
 */
export function useActiveCollection() {
  const appState = useAppState();
  const updateNeeded = useSelector(
    (state: RootState) => state.signalr.updateNeeded,
  );

  const { data: labelRecords } = useGetLabelsForEveryNoteQuery();
  const {
    data: notes,
    isLoading,
    isSuccess,
    isError,
    error,
    refetch,
  } = useGetNotesQuery();

  useEffect(() => {
    console.log("[useActiveCollection] refetching");
    refetch();
  }, [updateNeeded]);

  // useEffect(() => {
  //   let l = labelRecords;
  //   debugger;
  // }, [labelRecords]);

  //
  // const graph = useGraph();
  // const graphDispatch = useGraphDispatch();
  //
  // const state = useAppState();
  // const dispatch = useDispatch();
  //
  // const getActiveCollection = useCallback(() => {
  //   var collection: GraphNode[];
  //
  //   switch (state.activeCollection) {
  //     case Collections.All: {
  //       // collection = data.
  //       // collection = graph.nodes;
  //       // console.log("collection: ", JSON.stringify(collection));
  //       break;
  //     }
  //     case Collections.RecentlyDeleted: {
  //       collection = graph.deletedNodes;
  //       break;
  //     }
  //     case Collections.Label: {
  //       collection = graph.nodes.filter(
  //         (node) =>
  //           state.activeLabel && node.labels.includes(state.activeLabel),
  //       );
  //       break;
  //     }
  //   }
  //
  //   /**
  //    * .sort((note1: GraphNode, note2: GraphNode) => {
  //    *                       //
  //    *                       if (!note1.dateLastModified || !note2.dateLastModified)
  //    *                         return 1; // if one of the notes has no date, return a random value for now...
  //    *                       const date1 = new Date(note1.dateLastModified);
  //    *                       const date2 = new Date(note2.dateLastModified);
  //    *                       if (date1 < date2) return 1;
  //    *                       else return -1;
  //    *                     })
  //    */
  //   return collection.slice().sort((a, b) => {
  //     // if (!a.dateLastModified || !b.dateLastModified) return 0;
  //     const dateA = a.dateCreated ?? a.dateLastModified;
  //     const dateB = b.dateCreated ?? b.dateLastModified;
  //     if (!dateA) {
  //       return 1;
  //     }
  //
  //     if (!dateB) {
  //       return -1;
  //     }
  //
  //     return new Date(dateB).getTime() - new Date(dateA).getTime();
  //   });
  // }, [state, graph]);
  //
  // const [activeCollection, setActiveCollection] = useState(
  //   getActiveCollection(),
  // );
  //
  // useEffect(() => {
  //   console.log("hey! active collection changed");
  //   // alert("hey! active collection changed")
  //   setActiveCollection(getActiveCollection());
  // }, [state.activeCollection, graph.nodes, state.activeLabel]);
  if (isError) {
    return [];
    // let e;
    // debugger;
    // throw JSON.stringify(error, null, 2);
  }
  if (!notes) return [];

  switch (appState.activeCollection) {
    case Collections.All: {
      // debugger;
      let res = notes.filter((note) => !note.Deleted);

      if (appState.searchResult !== null) {
        // debugger;
        let result = appState.searchResult;
        //   TODO
        res = res.filter((note) => result.includes(note.Id));
      }

      return res;
    }
    case Collections.RecentlyDeleted: {
      let res = notes.filter((note) => note.Deleted);
      if (appState.searchResult !== null) {
        // debugger;
        let result = appState.searchResult;
        //   TODO
        res = res.filter((note) => result.includes(note.Id));
      }
      return res;
    }
    case Collections.Label: {
      // TODO
      const label = appState.activeLabel;
      if (!label) {
        return [];
      }
      //   TODO
      var noteIDs = [];
      if (!labelRecords) return [];
      const entries: [string, string[]][] = Object.entries(labelRecords); //TODO label records could be null! check for that
      for (let [noteID, labels] of entries) {
        if (labels.includes(label)) {
          noteIDs.push(noteID);
        }
      }

      if (appState.searchResult !== null) {
        // debugger;
        //   TODO
        let searchResult = appState.searchResult;
        noteIDs = noteIDs.filter((id) => searchResult.includes(id));
      }

      // debugger;
      const activeNotes: GraphNode[] = [];
      for (let noteID of noteIDs) {
        const note = notes.find((note) => note.Id === noteID && !note.Deleted);
        if (note) {
          activeNotes.push(note);
        }
      }
      // TODO sort by date
      return activeNotes.sort((note1, note2) => {
        if (!note1.DateLastModified || !note2.DateLastModified) return 0;
        const date1 = new Date(note1.DateLastModified);
        const date2 = new Date(note2.DateLastModified);
        return date2.getTime() - date1.getTime();
      });
    }
  }
}
