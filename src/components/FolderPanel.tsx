
import React, {useContext} from "react";
import {FolderPanelContent} from "./FolderPanelContent";
import {SidePanel} from "./ui/SidePanel";
import {NotesPanelContent} from "./NotesPanelContent";
import {AddNodeButton} from "./AddNodeButton";
import {EditorSwitch} from "./EditorSwitch";
import {GraphContext, GraphDispatchContext} from "./GraphContext";
import {AppStateContext, AppStateDispatchContext} from "./AppStateContext";
export function FolderPanel({children}:{children: React.ReactNode})
{
    const graph = useContext(GraphContext);
    const graphDispatch = useContext(GraphDispatchContext);
    const state = useContext(AppStateContext);
    const dispatch = useContext(AppStateDispatchContext);
    if(state===null || dispatch === null) throw Error("state or dispatch is null. ");
    if(graph===null || graphDispatch === null) throw Error("graph or graphDispatch is null. ");


    return <>
        <SidePanel
            panelChildren={<FolderPanelContent/>}
            isClosed={state.LabelPanelClosed}>
            {children}
        </SidePanel>
    </>
}