import { useImmerReducer } from "use-immer";
import { GraphAction, graphReducer, GraphState } from "./GraphReducer";
import React, { createContext, useEffect } from "react";
import { useLocalStorage } from "usehooks-ts";
import { graph1 } from "./Test/graph1";

export const GraphContext = createContext<GraphState | null>(null);
export const GraphDispatchContext =
  createContext<React.Dispatch<GraphAction> | null>(null);

export function GraphProvider({ children }: { children: React.ReactNode }) {
  const [locallyStoredGraph, setLocallyStoredGraph] =
    useLocalStorage<GraphState>("graph", graph1);
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
