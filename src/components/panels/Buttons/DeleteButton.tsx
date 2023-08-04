import {AppActionType, Collections} from "../../../reducers/AppStateReducer";
import React from "react";
import {useAppState, useDispatch, useGraph, useGraphDispatch} from "../../../reducers/hooks";
import {Button} from "../../ui/Button";
import {GraphActionType} from "../../../reducers/GraphReducer";


export function DeleteButton()
{
    const state = useAppState();
    const dispatch = useDispatch();
    const graph = useGraph();
    const graphDispatch = useGraphDispatch();
    if(state.activeCollection === Collections.RecentlyDeleted)
    {
        return <></>
    }else
    {
        return (
            <Button
                icon={<span className="material-symbols-outlined">
delete
</span>}
                rootClassName={"ml-auto"}
                onClick={() => {
                    if (state.activeNodeID !== undefined) {
                        graphDispatch({type: GraphActionType.removeNode, id: state.activeNodeID})
                        dispatch({type: AppActionType.setActiveNodeID, id: undefined})
                        console.log(graph.nodes)

                    }
                }}
            ></Button>
        )
    }
}