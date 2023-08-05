

import React, {useContext} from "react";
import {FolderPanelContent} from "./FolderPanelContent";
import {SidePanel} from "../../ui/SidePanel";
import {NotesPanelContent} from "../NotesPanel/NotesPanelContent";
import {AddNodeButton} from "../../AddNodeButton";
import {EditorSwitch} from "../../editor/EditorSwitch";
import {GraphContext, GraphDispatchContext} from "../../../reducers/GraphContext";
import {AppStateContext, AppStateDispatchContext} from "../../../reducers/AppStateContext";

export function Mobile_FolderPanel({children}:{children: React.ReactNode})
{
    const graph = useContext(GraphContext);
    const graphDispatch = useContext(GraphDispatchContext);
    const state = useContext(AppStateContext);
    const dispatch = useContext(AppStateDispatchContext);
    if(state===null || dispatch === null) throw Error("state or dispatch is null. ");
    if(graph===null || graphDispatch === null) throw Error("graph or graphDispatch is null. ");




    return <div className={"dark:bg-dark_secondary  dark:border-dark_secondary w-full h-full "}>
        <SidePanel
            panelChildren={<FolderPanelContent/>}
            sideBarMinimized={state.LabelPanelClosed}
        >
            {children}
        </SidePanel>
    </div>
}