import { useImmerReducer } from "use-immer";
import { GraphAction, graphReducer, GraphState } from "./GraphReducer";
import React, { createContext, useEffect } from "react";
import { useLocalStorage } from "usehooks-ts";

export const GraphContext = createContext<GraphState | null>(null);
export const GraphDispatchContext =
  createContext<React.Dispatch<GraphAction> | null>(null);

export function GraphProvider({ children }: { children: React.ReactNode }) {
  const [locallyStoredGraph, setLocallyStoredGraph] =
    useLocalStorage<GraphState>("graph", {
      links: [
        {
          source: "test",
          target: "test2",
        },
      ],
      nodes: [
        // TODO delete this
        {
          id: "test",
          title: "Just a test",
          content: "something",
          labels: ["Test"],
        },
        {
          id: "test2",
          title: "Not a test. ",
          content: "Not a test! ",
          labels: [],
        },
      ],
      deletedNodes: [],
      labels: [
        // "Test", "not a test"
      ],
      deletedLinks: [],
    });
  const [graph, graphDispatch] = useImmerReducer<GraphState, GraphAction>(
    graphReducer,
    locallyStoredGraph, //TODO probably a good idea to merge this graph(which may not have the latest format ) into a blank GraphState object first, to make sure that it has the latest format
  );

  useEffect(() => {
    console.log("---- updating local storage ---- ");
    setLocallyStoredGraph(graph);
  }, [graph]);

  return (
    <GraphContext.Provider value={graph}>
      <GraphDispatchContext.Provider value={graphDispatch}>
        {children}
      </GraphDispatchContext.Provider>
    </GraphContext.Provider>
  );
}
