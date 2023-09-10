import { useImmerReducer } from "use-immer";
import {
  GraphAction,
  GraphActionType,
  graphReducer,
  GraphState,
} from "./GraphReducer";
import React, { createContext, useEffect } from "react";
import { useLocalStorage } from "usehooks-ts";
import { graph1 } from "./Test/graph1";
import * as localforage from "localforage";
import { Version } from "../Version";

export const GraphContext = createContext<GraphState | null>(null);
export const GraphDispatchContext =
  createContext<React.Dispatch<GraphAction> | null>(null);

export function GraphProvider({ children }: { children: React.ReactNode }) {
  // const [locallyStoredGraph, setLocallyStoredGraph] =
  //   useLocalStorage<GraphState>("graph", graph1);
  const [graph, graphDispatch] = useImmerReducer<GraphState, GraphAction>(
    graphReducer,
    {
      deletedLinks: [],
      deletedNodes: [],
      labels: [],
      links: [],
      nodes: [],
      version: Version.GraphState,
    },
  );

  useEffect(() => {
    const res = localforage.config({
      driver: [
        localforage.INDEXEDDB,
        localforage.WEBSQL,
        localforage.LOCALSTORAGE,
      ],
      name: "Binder",
      version: Number(Version.GraphState),
    });
    localforage.getItem("graph").then((graph) => {
      if (graph) {
        var parseResult = GraphState.safeParse(graph);
        if (parseResult.success) {
          console.log(
            " [GraphProvider]  successfully parsed graph from local forage ",
          );
          const localGraph = parseResult.data;
          graphDispatch({
            type: GraphActionType.set,
            state: localGraph,
          });
        } else {
          console.log(
            " [GraphProvider]  error parsing graph from local storage: ",
            parseResult.error,
          );
        }
      }
    });
  }, []);

  useEffect(() => {
    // console.log("---- updating local storage ---- ");
    // setLocallyStoredGraph(graph);

    console.log("---- updating local forage ---- ");
    localforage.setItem("graph", graph);
  }, [graph]);

  return (
    <GraphContext.Provider value={graph}>
      <GraphDispatchContext.Provider value={graphDispatch}>
        {children}
      </GraphDispatchContext.Provider>
    </GraphContext.Provider>
  );
}
