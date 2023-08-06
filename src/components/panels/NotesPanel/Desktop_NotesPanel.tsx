import {NotesPanelContent} from "./NotesPanelContent";
import {AddNodeButton} from "../../Buttons/AddNodeButton";
import {EditorSwitch} from "../../EditorView/EditorSwitch";
import {Desktop_SidePanel} from "../../ui/SidePanel/Desktop/Desktop_SidePanel";
import React from "react";
import {Node} from "../../../reducers/GraphReducer";
import {Collections} from "../../../reducers/AppStateReducer";
import {useDispatch, useGraph, useGraphDispatch, useAppState} from "../../../hooks/AppStateAndGraphhooks";

export function Desktop_NotesPanel({children}:{children: React.ReactNode})
{

    const graph = useGraph();
    const graphDispatch = useGraphDispatch();
    const state = useAppState();
    const dispatch = useDispatch();
    function activeCollection() {
        if(graph===null || graphDispatch === null) throw Error("graph or graphDispatch is null. ");
        if(state === null) throw Error("state is null.")
        var collection: Node[];
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
    return <>
        <div className={"dark:bg-dark_primary  dark:border-dark_primary w-full h-full "}>
            <Desktop_SidePanel panelChildren={<NotesPanelContent collection={activeCollection()}/>}>
                {children}
            </Desktop_SidePanel>
        </div>

    </>
}