import {useImmerReducer} from "use-immer";
import {GraphAction, graphReducer, GraphState} from "./GraphReducer";
import React,{createContext} from "react";


export const GraphContext = createContext<GraphState | null>(null);
export const GraphDispatchContext = createContext<React.Dispatch<GraphAction> | null>(null);



export function GraphProvider({children}:{children: React.ReactNode})
{

    const [graph, graphDispatch] = useImmerReducer<GraphState, GraphAction>(graphReducer, {
        nodes: [
            {
                id: "test",
                title: "Just a test",
                content: "something",
                tags: ["Test"]
            },
            {
                id: "test",
                title: "",
                content: "",
                tags: []
            }
        ],
        deletedNodes: [],
        labels: ["Test"]
    });

    return <GraphContext.Provider value={graph}>
        <GraphDispatchContext.Provider value={graphDispatch}>
            {children}
        </GraphDispatchContext.Provider>
    </GraphContext.Provider>
}