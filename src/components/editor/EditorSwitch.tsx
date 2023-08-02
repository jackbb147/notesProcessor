import React, {useContext} from "react";
import {GraphContext, GraphDispatchContext} from "../GraphContext";
import {AppStateContext, AppStateDispatchContext} from "../AppStateContext";
import {GraphActionType, Node} from "../../reducers/GraphReducer";
import {AppActionType, Collections} from "../../reducers/AppStateReducer";
import {NoteEditor} from "./NoteEditor";
import {ensure} from "../App";

export function EditorSwitch()
{
    const graph = useContext(GraphContext);
    const graphDispatch = useContext(GraphDispatchContext);
    const state = useContext(AppStateContext);
    const dispatch = useContext(AppStateDispatchContext);
    if(state===null || dispatch === null) throw Error("state or dispatch is null. ");
    if(graph===null || graphDispatch === null) throw Error("graph or graphDispatch is null. ");


    var note: Node;
    if (state.activeNodeID === undefined) return <></>;


    switch (state.activeCollection) {
        case Collections.RecentlyDeleted: {
            note = ensure(graph.deletedNodes.find(node => node.id === state.activeNodeID));
            break;
        }
        default: {
            note = ensure(graph.nodes.find(node => node.id === state.activeNodeID))
            break;
        }
    }

    return <NoteEditor
        darkModeOn={state.darkModeOn}
        note={note} //https://stackoverflow.com/a/54738437/21646295
        onBlur={(note: Node) => {

            debugger;
            if(note.content.length !== 0)
            {
                graphDispatch({
                    type: GraphActionType.updateNode,
                    node: note
                })
            }else{

                dispatch({
                    type:AppActionType.setActiveNodeID,
                    id: undefined
                })
                graphDispatch({
                    type: GraphActionType.removeNode,
                    id: note.id
                })


            }

        }}
        onEditAttempt={state.activeCollection === Collections.RecentlyDeleted ? ()=>{
            // alert("hey! locked!")
            dispatch({type: AppActionType.setShowRecoverNodePopup, show: true})
        } : () => {
        }}
        locked={state.activeCollection === Collections.RecentlyDeleted}
    />





}