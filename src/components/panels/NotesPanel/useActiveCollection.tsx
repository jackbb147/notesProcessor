import { GraphState, GraphNode } from "../../../reducers/GraphReducer";
import { AppState, Collections } from "../../../reducers/AppStateReducer";
import {
  useAppState,
  useAppDispatch,
  useGraph,
  useGraphDispatch,
} from "../../../hooks/AppStateAndGraphAndUserhooks";
import { useGetNotesQuery } from "../../../api/apiSlice";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { useCallback, useEffect, useState } from "react";

export function useActiveCollection() {
  const appState = useAppState();
  const updateNeeded = useSelector(
    (state: RootState) => state.signalr.updateNeeded,
  );
  const { data, isLoading, isSuccess, isError, error, refetch } =
    useGetNotesQuery();
  if (isError) {
    throw JSON.stringify(error, null, 2);
  }

  useEffect(() => {
    console.log("[useActiveCollection]", JSON.stringify(data, null, 2));
  }, [data]);

  useEffect(() => {
    console.log("[useActiveCollection] refetching");
    refetch();
  }, [updateNeeded]);

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
  if (!data) return [];
  switch (appState.activeCollection) {
    case Collections.All: {
      return data.filter((note) => !note.Deleted);
    }
    case Collections.RecentlyDeleted: {
      return data.filter((note) => note.Deleted);
    }
    case Collections.Label: {
      // TODO
      return [];
      // return data.filter((note) => note.Labels.includes(appState.activeLabel));
    }
  }
  // return data ?? [];
  // return activeCollection;
}
