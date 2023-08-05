import {GraphState, Node} from "../../../reducers/GraphReducer";
import {AppState, Collections} from "../../../reducers/AppStateReducer";
import {useAppState, useDispatch, useGraph, useGraphDispatch} from "../../../reducers/hooks";
import {useEffect, useState} from "react";

function getActiveCollection(state:AppState, graph:GraphState):Node[]
{

    var collection:Node[];
    switch (state.activeCollection) {
        case Collections.All: {
            collection = graph.nodes
            console.log("collection: ", JSON.stringify(collection))
            break;
        }
        case Collections.RecentlyDeleted: {
            collection = graph.deletedNodes
            break;
        }
        case Collections.Label: {
            collection = graph.nodes.filter(node => state.activeLabel && node.labels.includes(state.activeLabel))
            break;
        }
    }

    return collection;
}


export function useActiveCollection() {

    const graph = useGraph()
    const graphDispatch = useGraphDispatch()

    const state = useAppState()
    const dispatch = useDispatch()

    const [activeCollection, setActiveCollection] = useState(getActiveCollection(state, graph))

    useEffect(()=>{
        setActiveCollection(getActiveCollection(state, graph));
    }, [state.activeCollection])

    return activeCollection;
}