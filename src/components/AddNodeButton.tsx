import {GraphActionType} from "../reducers/GraphReducer";
import {v4 as uuid} from "uuid";
import {Button} from "./ui/Button";
import React, {useContext} from "react";
import {GraphContext, GraphDispatchContext} from "./GraphContext";

export function AddNodeButton()
{

    const graph = useContext(GraphContext);
    const graphDispatch = useContext(GraphDispatchContext);
    if(graph===null || graphDispatch === null) throw Error("graph or graphDispatch is null. ");



    return <Button onClick={() => graphDispatch({
        type: GraphActionType.addNode,
        node: {
            id: uuid(),
            title: "New Note",
            content: "",
            tags: [],
            dateCreated: new Date()
        }
    })} icon={<span className="material-symbols-outlined">
edit_square
</span>}></Button>
}