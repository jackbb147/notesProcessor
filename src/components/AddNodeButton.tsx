import {GraphActionType} from "../reducers/GraphReducer";
import {v4 as uuid} from "uuid";
import {Button} from "./ui/Button";
import React, {useContext} from "react";
import {GraphContext, GraphDispatchContext} from "../reducers/GraphContext";
import {AppStateContext, AppStateDispatchContext} from "../reducers/AppStateContext";
import {Collections} from "../reducers/AppStateReducer";

export function AddNodeButton()
{
    const state = useContext(AppStateContext);
    const dispatch = useContext(AppStateDispatchContext);
    if(state===null || dispatch === null) throw Error("state or dispatch is null. ");


    const graph = useContext(GraphContext);
    const graphDispatch = useContext(GraphDispatchContext);
    if(graph===null || graphDispatch === null) throw Error("graph or graphDispatch is null. ");

    function handleClick()
    {
        if(graphDispatch === null || state === null) throw Error("graphDispatch or state is null");
        let tags = []
        if(state.activeCollection === Collections.Label && state.activeLabel)
        {
            tags.push(state.activeLabel);
        }

        graphDispatch({
            type: GraphActionType.addNode,
            node: {
                id: uuid(),
                title: "New Note",
                content: "",
                tags: tags,
                dateCreated: new Date()
            }
        })
    }


    return <Button onClick={handleClick} icon={<span className="material-symbols-outlined">
edit_square
</span>}></Button>
}