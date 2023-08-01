import {GraphActionType} from "./GraphReducer";
import {v4 as uuid} from "uuid";
import {Button} from "./Button";
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
            title: "hello world!",
            content: "no content",
            tags: []
        }
    })} icon={"../icons/edit_square_FILL0_wght400_GRAD0_opsz48.svg"}></Button>
}