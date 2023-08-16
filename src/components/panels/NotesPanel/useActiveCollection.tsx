import { GraphState, Node } from "../../../reducers/GraphReducer";
import { AppState, Collections } from "../../../reducers/AppStateReducer";
import {
  useAppState,
  useDispatch,
  useGraph,
  useGraphDispatch,
} from "../../../hooks/AppStateAndGraphhooks";
import { useCallback, useEffect, useState } from "react";

export function useActiveCollection() {
  const graph = useGraph();
  const graphDispatch = useGraphDispatch();

  const state = useAppState();
  const dispatch = useDispatch();

  const getActiveCollection = useCallback(() => {
    var collection: Node[];
    switch (state.activeCollection) {
      case Collections.All: {
        collection = graph.nodes;
        console.log("collection: ", JSON.stringify(collection));
        break;
      }
      case Collections.RecentlyDeleted: {
        collection = graph.deletedNodes;
        break;
      }
      case Collections.Label: {
        collection = graph.nodes.filter(
          (node) =>
            state.activeLabel && node.labels.includes(state.activeLabel),
        );
        break;
      }
    }

    return collection;
  }, [state, graph]);

  const [activeCollection, setActiveCollection] = useState(
    getActiveCollection(),
  );

  // function getActiveCollection():Node[]
  // {
  //     var collection:Node[];
  //     switch (state.activeCollection) {
  //         case Collections.All: {
  //             collection = graph.nodes
  //             console.log("collection: ", JSON.stringify(collection))
  //             break;
  //         }
  //         case Collections.RecentlyDeleted: {
  //             collection = graph.deletedNodes
  //             break;
  //         }
  //         case Collections.Label: {
  //             collection = graph.nodes.filter(node => state.activeLabel && node.labels.includes(state.activeLabel))
  //             break;
  //         }
  //     }
  //
  //     return collection;
  // }

  useEffect(() => {
    console.log("hey! active collection changed");
    // alert("hey! active collection changed")
    setActiveCollection(getActiveCollection());
  }, [state.activeCollection, graph.nodes, state.activeLabel]);

  return activeCollection;
}
